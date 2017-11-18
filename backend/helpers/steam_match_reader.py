import requests


class SteamMatchReader:
    def __init__(self):
        self.key = open('files/k.txt', 'r').read().splitlines()[0]
        self.history = []

    def get_history(self, arr, team_id1, team_id2):
        if len(arr) > 8:
            arr = arr[0:8]
        for i in arr:
            self.fetch_match(i, team_id1, team_id2)

    def fetch_match(self, match_id, team_id1, team_id2):
        r = requests.get('https://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/v1/?key='
                         + str(self.key) +
                         '&match_id='
                         + str(match_id))
        return self.parse_match(r.json()['result'], team_id1, team_id2)

    def parse_match(self, dic, team_id1, team_id2):
        local = {'match_id': dic['match_id']}
        if team_id1 == dic['radiant_team_id']:
            if dic['radiant_win'] is True:
                local['winner_team_id'] = team_id1
            else:
                local['winner_team_id'] = team_id2
        elif team_id1 == dic['dire_team_id']:
            if dic['radiant_win'] is True:
                local['winner_team_id'] = team_id2
            else:
                local['winner_team_id'] = team_id1
        local['match_data'] = dic
        self.history.append(local)

