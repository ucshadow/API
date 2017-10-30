from flask import Response
import json

from gosu_scrapper import Gosu


def send_json(name):
    with open('./files/' + name + '.json', 'r') as j:
        return json.load(j)


responses = {
    'all teams': Response(status=200, headers={'Content-Type': 'application/json'},
                          response=json.dumps(send_json('teams'))),
    'incoming matches': Response(status=200, headers={}, response=json.dumps(Gosu().fetch())),
}


class Action(object):
    def __init__(self, action, name):
        self.action = action
        self.response = responses[name]

    def __call__(self):
        self.action()
        return self.response
