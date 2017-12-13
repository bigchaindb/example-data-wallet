import os
import types
import math
from inspect import signature
import multiprocessing as mp
from multiprocessing import queues


POISON_PILL = 'POISON_PILL'


class PoisonPillException(Exception):
    pass


def Pipe(maxsize=0):
    return queues.Queue(maxsize, ctx=mp.get_context())


def pass_through(val):
    return val


class Node:

    def __init__(self, target=None, inqueue=None, outqueue=None,
                 name=None, timeout=None, number_of_processes=None,
                 fraction_of_cores=None):

        self.target = target if target else pass_through
        self.timeout = timeout
        self.accept_timeout = 'timeout' in signature(self.target).parameters
        self.name = name if name else target.__name__
        self.inqueue = inqueue
        self.outqueue = outqueue

        if (number_of_processes and number_of_processes <= 0) or\
           (fraction_of_cores and fraction_of_cores <= 0):
            raise ValueError('Cannot assign zero or less cores')

        if number_of_processes is not None and fraction_of_cores is not None:
            raise ValueError('number_of_processes and fraction_of_cores '
                             'are exclusive parameters and cannot be '
                             'used together')

        if fraction_of_cores:
            # math.ceil makes sure we have at least one process running
            self.number_of_processes = math.ceil(mp.cpu_count() *
                                                 fraction_of_cores)
        elif number_of_processes:
            self.number_of_processes = number_of_processes
        else:
            self.number_of_processes = 1

        self.processes = [mp.Process(target=self.safe_run_forever)
                          for i in range(self.number_of_processes)]

    def log(self, *args):
        print('[{}] {}> '.format(os.getpid(), self.name), *args)

    def start(self):
        for process in self.processes:
            process.start()

    def safe_run_forever(self):
        try:
            self.run_forever()
        except KeyboardInterrupt:
            pass

    def run_forever(self):
        while True:
            try:
                self.run()
            except PoisonPillException:
                return

    def run(self):
        args = ()
        poisoned = False
        timeout = False

        if self.inqueue:
            try:
                args = self.inqueue.get(timeout=self.timeout)
                if args == POISON_PILL:
                    poisoned = True
                    raise queues.Empty()
            except queues.Empty:
                timeout = True

        # self.log('recv', args)

        if not isinstance(args, tuple):
            args = (args, )

        if timeout:
            if self.accept_timeout:
                # FIXME: the number of arguments depends on the
                #        function signature.
                args = (None, )
                result = self.target(*args, timeout=timeout)
            else:
                result = None
        else:
            result = self.target(*args)

        # self.log('send', result)

        if result is not None and self.outqueue:
            if isinstance(result, types.GeneratorType):
                for item in result:
                    self.outqueue.put(item)
            else:
                self.outqueue.put(result)

        if poisoned:
            raise PoisonPillException()

    def join(self):
        for process in self.processes:
            process.join()

    def terminate(self):
        for process in self.processes:
            process.terminate()

    def poison_pill(self):
        if self.inqueue:
            for i in range(self.number_of_processes):
                self.inqueue.put(POISON_PILL)

    def is_alive(self):
        return any(process.is_alive() for process in self.processes)


class Pipeline:

    def __init__(self, items):
        self.items = items
        self.setup()

    def setup(self, indata=None, outdata=None):
        items_copy = self.items[:]
        if indata:
            items_copy.insert(0, indata)
        if outdata:
            items_copy.append(outdata)

        self.nodes = [item for item in items_copy if isinstance(item, Node)]
        self.connect(items_copy, False)

    def connect(self, rest, pipe=None):

        if not rest:
            return pipe

        head, *tail = rest

        if isinstance(head, queues.Queue):
            if pipe:
                raise ValueError('Cannot have two or more pipes next'
                                 ' to each other.')
            return self.connect(tail, pipe=head)

        elif isinstance(head, Node):
            if pipe is None:
                pipe = Pipe()
            if pipe is not False:
                head.inqueue = pipe
            head.outqueue = self.connect(tail)
            return head.inqueue

    def step(self):
        for node in self.nodes:
            node.run()

    def start(self):
        for node in self.nodes:
            node.start()

    def join(self):
        for node in self.nodes:
            node.join()

    def terminate(self):
        for node in self.nodes:
            node.terminate()

    def poison_pill(self):
        for node in self.nodes:
            node.poison_pill()
            node.join()

    def is_alive(self):
        return any(node.is_alive() for node in self.nodes)

