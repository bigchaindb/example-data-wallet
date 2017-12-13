'''Base module to handle the collection and the output of statistical data.'''

import logging
import time
import multiprocessing as mp
import queue
from collections import Counter


log = logging.getLogger(__name__)
current_milli_time = lambda: int(round(time.time() * 1000))


def is_number(val):
    '''Function to check if the value is a number.'''
    try:
        float(val)
        return True
    except ValueError:
        return False


class Logstats(object):
    '''This class briges the data in input (provided by the `stats` param)
    to a generic output (`log`, by default).
    '''

    def __init__(self, msg=None, emit_func=None, logger=log, level='INFO',
                 timeout=1, queue=None):
        '''Initialize the instance.

        If `emit_func` is defined, `logger` and `level` are ignored.

        Keyword arguments:
        stats -- a dict-like object storing values to output
        msg -- a string to use to format `stats` (by default it outputs a
            list of comma separated values)
        emit_func -- a function to emit the formatted output
            (default: logging.log)
        logger -- the logger to use to log the formatted output (default:
            a `log` instance
        level -- the log level (default: INFO)
        '''
        self.stats = Counter()
        self.msg = msg
        self.logger = logger
        self.level = level
        self.old_stats = {}
        self.emit_func = emit_func
        self.last = current_milli_time()
        self.timeout = timeout
        self.queue = queue
        self.main_queue = None

        if not log.isEnabledFor(logging.getLevelName(level)):
            log.warning('Logger is not enabled to log at level {}.'.format(level))

    def __getitem__(self, key):
        return self.stats[key]

    def __setitem__(self, key, val):
        self.stats[key] = val

    def update(self, *args, **kwargs):
        self.stats.update(*args, **kwargs)

    def _get_speed(self, new, old, delta):
        return int(round(float((new - old)) / (delta / 1e3)))
    
    def _consume_queue(self):
        if self.main_queue:
            while True:
                try:
                    self.stats.update(self.main_queue.get_nowait())
                except queue.Empty:
                    return

    def get_stats(self, delta):
        self._consume_queue()
        stats = self.stats

        if hasattr(self.stats, '__call__'):
            stats = self.stats(delta)
        else:
            stats = stats.copy()

        speed = dict(('{}.speed'.format(k),
                      self._get_speed(stats[k],
                                      self.old_stats.get(k, 0),
                                      delta))
                     for k in stats if is_number(stats[k]))

        self.old_stats = stats
        stats.update(speed)
        return stats

    def get_child(self):
        if not self.main_queue:
            self.main_queue = mp.Queue()

        return Logstats(queue=self.main_queue)

    def format_msg(self, stats):
        if self.msg:
            msg = self.msg.format(**stats)
        else:
            msg = ', '.join('{}: {}'.format(k, stats[k])
                            for k in sorted(stats))
        return msg

    def emit(self, msg):
        if self.emit_func:
            self.emit_func(msg)
        else:
            self.logger.log(getattr(logging, self.level), msg)

    def __call__(self):
        if self.queue:
            self.queue.put(self.stats)
            self.stats = Counter()
        else:
            delta = current_milli_time() - self.last
            stats = self.get_stats(delta)

            if stats:
                self.emit(self.format_msg(stats))

            self.last = current_milli_time()
