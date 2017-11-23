import requests
import time
from threading import Thread
import json

from helpers.FileUpdater import FileUpdater
from helpers.gosu_scrapper import Gosu
from helpers.image_downloader import BingLogoSearch
from helpers.team_name_special_rules import rules


class Worker:
    def __init__(self):
        self.gosu = Gosu()
        self.upcoming_matches = self.gosu.fetch()
        self.file_updater = FileUpdater(self.upcoming_matches)
        self.upcoming_matches_with_details = []
        self.team_info = []
        self.team_last_matches = []
        self.active_players = []
        self.active_player_info = []
        self.most_played_hero = []
        self.mmr_per_player = []
        self.last_matches_between = []

        self.loop()

    def loop(self):
        self.populate_team_info()
        # Thread(target=self.update_gosu).start()

    def populate_team_info(self):
        for match in self.upcoming_matches:
            left = match['left']
            right = match['right']
            left_team = self.update_team_info(left)
            right_team = self.update_team_info(right)
            self.upcoming_matches_with_details.append(
                {'left': left_team, 'right': right_team, 'status': match['status']})
        Thread(target=self.populate_team_last_matches).start()

    def populate_team_last_matches(self):
        print('\n--- last matches for each team --- \n')
        for i, team in enumerate(self.team_info):
            print('{} matches remaining...'.format(len(self.team_info) - i))
            self.update_last_matches(team['team_id'])
            time.sleep(0.3)
        Thread(target=self.populate_active_players).start()
        self.update_last_matches_between()

    def populate_active_players(self):
        print('\n---  active players for each team --- \n')
        for i, team in enumerate(self.team_info):
            print('{}                                     teams remaining...'.format(len(self.team_info) - i))
            self.update_active_players(team['team_id'])
            time.sleep(0.3)
        Thread(target=self.populate_most_played_heroes).start()

    def populate_most_played_heroes(self):
        print('\n---  most played hero for each player --- \n')
        for i, team in enumerate(self.active_players):
            print('{}                                     teams remaining...'.format(len(self.active_players) - i))
            for j, player in enumerate(team['active']):
                print('{} players remaining...'.format(len(team['active']) - j))
                self.update_most_played_hero(player['account_id'])
                time.sleep(0.3)
        print()
        print('--- Server ready ---')

    def update_team_info(self, team):
        print('trying to search team {} '.format(team))
        if team is not 'TBD':
            team_info = get_team(team)
            if team_info is None:
                team_info = {'wins': 0, 'last_match_time': 0, 'tag': 'Unknown Team',
                             'logo_url': 'https://i.imgur.com/5gO7P9B.png',
                             'name': 'Unknown', 'losses': 0, 'team_id': 0, 'rating': 0}
            print('new team added')
            print(team_info)
            self.team_info.append(team_info)
            return team_info

    def update_last_matches(self, team_id):
        r = requests.get('https://api.opendota.com/api/teams/'
                         + str(team_id) + '/matches')
        to_json = r.json()
        # print(to_json)
        self.team_last_matches.append({'team_id': team_id, 'last': to_json})

    def update_active_players(self, team_id):
        r = requests.get('https://api.opendota.com/api/teams/'
                         + str(team_id) + '/players')
        to_json = r.json()
        # print(to_json)
        only_active = []
        for i, player in enumerate(to_json):
            if player['is_current_team_member'] is True:
                print('{} players remaining...'.format(len(to_json) - i))
                only_active.append(player)
                self.update_active_player_info(team_id, player['account_id'])

        count = 0
        while 5 - len(only_active) > 0:  # try to fill team with stand-ins
            current_player = to_json[count]
            if current_player not in only_active:
                only_active.append(current_player)
                self.update_active_player_info(team_id, current_player['account_id'])
                count += 1
                if count > len(to_json):
                    break

        self.active_players.append({'team_id': team_id, 'active': only_active})

    def update_active_player_info(self, team_id, account_id):
        print('getting account id for team {} account id {}'.format(team_id, account_id))
        r = requests.get('https://api.opendota.com/api/players/'
                         + str(account_id))
        to_json = r.json()
        # print(to_json)
        self.active_player_info.append({'team_id': team_id, 'player': to_json})
        self.mmr_per_player.append({'team_id': team_id, 'account_id': account_id,
                                    'mmr_estimate': to_json['mmr_estimate'],
                                    'solo_competitive_rank': to_json['solo_competitive_rank']})
        time.sleep(0.3)

    def update_most_played_hero(self, account_id):
        # https://api.opendota.com/api/players/177085220/heroes
        try:
            r = requests.get('https://api.opendota.com/api/players/'
                             + str(account_id) + '/heroes')
            to_json = r.json()
        except:
            to_json = {[{
                'hero_id': "74",
                'last_played': 1510741039,
                'games': 423,
                'win': 235,
                'with_games': 320,
                'with_win': 159,
                'against_games': 714,
                'against_win': 378
            }, ]}
        # print(to_json)
        self.most_played_hero.append({'account_id': account_id, 'heroes': to_json})

    def update_last_matches_between(self):
        print('\n---  last matches between --- \n')
        for match in self.upcoming_matches:
            left_id = get_team(match['left'])['team_id']
            right_id = get_team(match['right'])['team_id']
            team1 = self.__get_matches_by_team_id(left_id)
            team2 = self.__get_matches_by_team_id(right_id)
            data = {'team1': team1['team_id'], 'team2': team2['team_id'], 'matches': []}
            for i in team1['last']:
                for j in team2['last']:
                    if i['match_id'] == j['match_id']:
                        if i['radiant'] is True:
                            if i['radiant_win'] is True:
                                data['matches'].append({'match_info': i, 'won': left_id})
                            else:
                                data['matches'].append({'match_info': i, 'won': right_id})
                        if i['radiant'] is False:
                            if i['radiant_win'] is True:
                                data['matches'].append({'match_info': i, 'won': right_id})
                            else:
                                data['matches'].append({'match_info': i, 'won': right_id})
            # print(data)
            self.last_matches_between.append(data)

    def __get_matches_by_team_id(self, team_id):
        for team in self.team_last_matches:
            # print('comparing {} with {}'.format(team['team_id'], team_id))
            if team['team_id'] == int(team_id):
                return team

    ###########
    #
    # getters
    #
    ###########

    def get_team_by_id(self, team_id):
        # print('id for get team by id ', team_id)
        # print(self.team_info)
        for team in self.team_info:
            if team['team_id'] == int(team_id):
                return team

    def get_team_last_match_by_id(self, team_id):
        # print('query is', team_id)
        # print(self.team_last_matches)
        for team in self.team_last_matches:
            if team['team_id'] == int(team_id):
                return team

    def get_active_players_by_team_id(self, team_id):
        players = []
        res = []
        for player in self.active_players:
            if player['team_id'] == int(team_id):
                players.append(player)
        for active_player in players[0]['active']:
            res.append({'player': active_player, 'player_profile':
                self.get_player_by_id(active_player['account_id'])})
        return res

    def get_player_by_id(self, player_id):
        for player in self.active_player_info:
            if player['player']['profile']['account_id'] == int(player_id):
                return player

    def get_player_heroes_by_id(self, player_id):
        for player in self.most_played_hero:
            print(player)
            if player['account_id'] == int(player_id):
                return player

    def get_last_matches_between(self, team1_id, team2_id):
        for match in self.last_matches_between:
            print(match)
            if match['team1'] == int(team1_id) and match['team2'] == int(team2_id):
                return match

    def update_gosu(self):
        self.upcoming_matches = self.gosu.fetch()
        time.sleep(60 + 30)
        # toDo: refresh all arrays


def add_logo(obj):
    if obj['logo_url'] is None:
        logo_url = BingLogoSearch().get_image(obj['name'])
        obj['logo_url'] = logo_url
        return obj
    return obj


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
    for i in j:  # maybe it has a dot instead of space in the name
        if '.' in i['name']:
            n = i['name'].replace('.', ' ')
            if n.lower() == name.lower():
                return add_logo(i)
    for i in j:  # maybe it has a space instead of a dot in the name
        if ' ' in i['name']:
            n = i['name'].replace(' ', '.')
            if n.lower() == name.lower():
                return add_logo(i)
    for i in j:  # search for TAG
        if i['tag'].lower() == name.lower():
            if i['wins'] != 'null':
                return add_logo(i)
    for i in j:  # search if name in team name
        if name.lower() in i['name'].lower():
            return add_logo(i)
            # return {
            #            "losses": 0,
            #            "wins": 0,
            #            "team_id": '',
            #            "name": "Unknown Team",
            #            "rating": 0,
            #            "tag": "",
            #            "logo_url": "https://i.imgur.com/5gO7P9B.png",
            #            "last_match_time": 0
            #        },


def get_json(filename):
    with open('files/' + filename + '.json', 'r') as f:
        return json.load(f)


if __name__ == '__main__':
    w = Worker()
    # print(w.team_info)
    # print(w.team_last_matches)
