from flask import Flask, jsonify
from flask import request
import json


class Router(object):
    app = Flask('server')

    def __init__(self):
        self.endpoints = [
            {'name': 'teams', 'response': self.get_json('teams')},
            {'name': 'pro_players', 'response': self.get_json('pro_players')}
        ]

    def run(self):
        self.app.run()

    def add_rules(self):
        self.app.add_url_rule('/API/', 'api', self.res)

    def res(self):
        if len(request.args) > 1:
            return self.handle_multiple_params(request.args)
        path = request.args.get('query')
        for i in self.endpoints:
            if i['name'] == path:
                return jsonify(self.get_json(path))
        return self.send_error('query', path)

    def send_error(self, name, query):
        return jsonify({'error': 'your query matches no endpoints',
                        'query': query, 'name': name})

    def get_json(self, filename):
        with open('files/' + filename + '.json', 'r') as f:
            return json.load(f)

    def handle_multiple_params(self, p):
        q = p.get('query')
        if not q:
            return self.send_error('query', q)
        if q == 'player':
            if not p.get('name'):
                return self.send_error('player', q)
            return self.get_player(p.get('name'))

    def get_player(self, name):
        j = self.get_json('pro_players')
        for i in j:
            if i['name'] == name:
                return jsonify(i)
        return self.send_error('player', name)


if __name__ == '__main__':
    router = Router()
    router.add_rules()
    router.run()