import time
from threading import Thread
import logging

log = logging.getLogger(__name__)


def start(stats):
    def _run():
        while True:
            time.sleep(stats.timeout)
            stats()

    t = Thread(target=_run)
    t.daemon = True
    t.start()
    return t
