import requests
import time
from threading import Thread
import json

from helpers.gosu_scrapper import Gosu
from helpers.methods import add_logo
from helpers.steam_match_reader import SteamMatchReader
from helpers.team_name_special_rules import rules


def get_team(name):
    if name[-1] == '.':
        name = name[0:-1]  # remove the dot at the end (some teams have them)
    for rule in rules:
        if rule['name'] == name:
            return get_team(rule['value'])
    j = get_json('teams')
    for i in j:
        if i['name'].lower() == name.lower() and i['tag'] != '':  # Unknown teams
            return add_logo(i)
    for i in j:  # maybe it has a Team in the name
        if i['name'].lower() == 'Team ' + name.lower():
            return add_logo(i)
    for i in j:  # search for TAG
        if i['tag'].lower() == name.lower():
            if i['wins'] != 'null':
                return add_logo(i)
    for i in j:  # search if name in team name
        if name.lower() in i['name'].lower():
            return add_logo(i)
    return None


def get_json(filename):
    with open('files/' + filename + '.json', 'r') as f:
        return json.load(f)


class Worker:
    """
    The purpose of the Worker is to cache large data files to reduce the number of requests done to the API
    sites. It will also update those cache files.
    """

    def __init__(self):
        self.gosu = Gosu()
        self.update_meta = [
            {'name': 'teams', 'url': 'https://api.opendota.com/api/teams', 'interval': 1 * 60 * 24},
            {'name': 'pro_players', 'url': 'https://api.opendota.com/api/proPlayers', 'interval': 1 * 60 * 24},
            {'name': 'upcoming', 'url': 'gosu', 'interval': 1 * 60 * 10},
        ]
        self.upcoming_teams = []
        self.team_history = []

        Thread(target=self.update_ticker).start()
        # self.update_ticker()
        print('worker started...')

    def check_cached(self, file_name, n):
        """
        checks if the json data from the given file is more than "n" minutes old
        the actual json file and the date file are different, but have the same name
        to speed up the reading of the date.
        :param file_name: the name of the file
        :param n: the number of days
        :return: True if the data is older than the given days, False in any other case
        """
        try:
            with open('files/' + file_name + '.txt', 'r') as f:
                f_ = f.readlines()
                if len(f_) == 0:  # no data in the file
                    return False
                return float(f_[0]) + (n * 60) < time.time()
        except FileNotFoundError:
            with open('files/' + file_name + '.txt', 'w') as new_file:
                new_file.write(str(time.time()))
            with open('files/' + file_name + '.json', 'w') as new_json:
                new_json.write('')
            print('created new files for {}'.format(file_name))
            return True

    def update_data_check(self):
        """
        for each data that will be cached, check if the data is up to date
        :return:
        """
        for meta in self.update_meta:
            if self.check_cached(meta['name'], meta['interval']):
                print('updating {}'.format(meta['name']))
                self.update_data(meta['url'], meta['name'])

    def update_data(self, url, file_name):
        """
        retrieves and writes the new json data from the corresponding API
        also updates the date file with the date of the last update
        :param url: the API url for the respective data
        :param file_name: the file name where the data will be stored, also
        the file name of the date file
        :return:
        """
        if file_name == 'upcoming':
            r = self.gosu.fetch()
            Thread(target=self.update_upcoming_matches_teams, args=(r,)).start()
        else:
            r = requests.get(url)
            r = r.json()
        with open('files/' + file_name + '.json', 'w') as f:
            json.dump(r, f, indent=4)
            with open('files/' + file_name + '.txt', 'w') as f_:  # update date
                f_.write(str(time.time()))

    def update_upcoming_matches_teams(self, arr):
        print('upcoming matches changed, updating...')
        for i, e in enumerate(arr):
            print(e)
            print('updating', e['left'], 'vs', e['right'])
            if e['right'] != 'TBD':
                id_ = get_team(e['right'])['team_id']
                r = requests.get('https://api.opendota.com/api/teams/'
                                 + str(id_) + '/matches')
                self.upcoming_teams.append({'id': id_, 'data': r.json()})
            if e['left'] != 'TBD':
                id_ = get_team(e['left'])['team_id']
                r = requests.get('https://api.opendota.com/api/teams/'
                                 + str(id_) + '/matches')
                self.upcoming_teams.append({'id': id_, 'data': r.json()})
            time.sleep(0.3)

    def meta_contains(self, obj):
        for i in self.update_meta:
            if i['name'] == obj['name']:
                return True
        return False

    def get_team_by_id(id_):
        w = worker.upcoming_teams
        for i in w:
            if i['id'] == id_:
                return i

    def get_history(self, id1, id2):
        steamer = SteamMatchReader()
        t1 = get_team_by_id(id1)
        t2 = get_team_by_id(id2)
        if t1 is None or t2 is None:
            return None
        history = []
        for i in t1['data']:
            for j in t2['data']:
                if i['match_id'] == j['match_id']:
                    history.append(i['match_id'])
        steamer.get_history(history, id1, id2)

    def update_ticker(self):
        """
        checks for updates every day
        :return:
        """
        while True:
            Thread(target=self.update_data_check).start()
            time.sleep(60)


# print(time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(time.time() + 86000)))
# print(time.time())
# a = Worker()
