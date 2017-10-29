import requests
import time
from threading import Thread
import json


class Worker:
    """
    The purpose of the Worker is to cache large data files to reduce the number of requests done to the API
    sites. It will also update those cache files.
    """

    def __init__(self):
        self.open = 'https://api.opendota.com/api/'
        self.steam = {'l': 'https://api.steampowered.com/IDOTA2Match_570/',
                      'r': '/v1/?key=3221B7028177669B2617814FECA4A67B'}
        self.update_meta = [
            {'name': 'teams', 'url': 'https://api.opendota.com/api/teams', 'interval': 1}
        ]

        self.update_ticker()
        print('worker started...')

    def check_cached(self, file_name, n):
        """
        checks if the json data from the given file is more than "n" days old
        the actual json file and the date file are different, but have the same name
        to speed up the reading of the date.
        :param file_name: the name of the file
        :param n: the number of days
        :return: True if the data is older than the given days, False in any other case
        """
        with open('files/' + file_name + '.txt', 'r') as f:
            f_ = f.readlines()
            if len(f_) == 0:  # no data in the file
                return False
            return float(f_[0]) + (n * 86000) < time.time()

    def update_data_check(self):
        for meta in self.update_meta:
            if self.check_cached(meta['name'], meta['interval']):
                print('updating {}'.format(meta['name']))
                self.update_data(meta['url'], meta['name'])

    def update_data(self, url, file_name):
        r = requests.get(url)
        with open('files/' + file_name + '.json', 'w') as f:
            json.dump(r.json(), f, indent=4)
            with open('files/' + file_name + '.txt', 'w') as f_:  # update date
                f_.write(time.time())

    def update_ticker(self):
        """
        checks for updates every day
        :return:
        """
        while True:
            Thread(target=self.update_data_check).start()
            time.sleep(60 * 60 * 24)


# print(time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(time.time() + 86000)))
# print(time.time())
# a = Worker()
