import json

from flask import Flask, jsonify, render_template, send_file
from requests.compat import basestring
from datetime import timedelta
from flask import make_response, request, current_app
from functools import update_wrapper

from helpers.gosu_scrapper import Gosu
from helpers.team_name_special_rules import rules
from worker import Worker

app = Flask(__name__, static_url_path='/static')


def cross_domain(origin=None, methods=None, headers=None,
                 max_age=21600, attach_to_all=True,
                 automatic_options=True):
    if methods is not None:
        methods = ', '.join(sorted(x.upper() for x in methods))
    if headers is not None and not isinstance(headers, basestring):
        headers = ', '.join(x.upper() for x in headers)
    if not isinstance(origin, basestring):
        origin = ', '.join(origin)
    if isinstance(max_age, timedelta):
        max_age = max_age.total_seconds()

    def get_methods():
        if methods is not None:
            return methods

        options_resp = current_app.make_default_options_response()
        return options_resp.headers['allow']

    def decorator(f):
        def wrapped_function(*args, **kwargs):
            if automatic_options and request.method == 'OPTIONS':
                resp = current_app.make_default_options_response()
            else:
                resp = make_response(f(*args, **kwargs))
            if not attach_to_all and request.method != 'OPTIONS':
                return resp

            h = resp.headers

            h['Access-Control-Allow-Origin'] = origin
            h['Access-Control-Allow-Methods'] = get_methods()
            h['Access-Control-Max-Age'] = str(max_age)
            if headers is not None:
                h['Access-Control-Allow-Headers'] = headers
            return resp

        f.provide_automatic_options = False
        return update_wrapper(wrapped_function, f)

    return decorator


def get_json(filename):
    with open('files/' + filename + '.json', 'r') as f:
        return json.load(f)


def send_error(name, query):
    return jsonify({'error': 'your query matches no endpoints',
                    'query': query, 'name': name})


def get_player(name):
    j = get_json('pro_players')
    for i in j:
        if i['name'] == name:
            return jsonify(i)
    return send_error('player', name)


def get_team(name):
    if name[-1] == '.':
        name = name[0:-1]  # remove the dot at the end (some teams have them)
    for rule in rules:
        if rule['name'] == name:
            return get_team(rule['value'])
    j = get_json('teams')
    for i in j:
        if i['name'].lower() == name.lower() and i['tag'] != '':  # Unknown teams
            return jsonify(i)
    for i in j:  # maybe it has a Team in the name
        if i['name'].lower() == 'Team ' + name.lower():
            return jsonify(i)
    for i in j:  # finally search for TAG
        if i['tag'].lower() == name.lower():
            if i['wins'] != 'null':
                return jsonify(i)
    return send_error('team', name)


def handle_multiple_params(p):
    q = p.get('query')
    if not q:
        return send_error('query', q)
    if q == 'player':
        if not p.get('name'):
            return send_error('player', q)
        return get_player(p.get('name'))
    if q == 'team':
        if not p.get('name'):
            return send_error('team', q)
        return get_team(p.get('name'))


@app.route('/API/teams/')
@cross_domain(origin='*')
def get_teams():
    return get_json('teams')


@app.route('/API/pro_players/')
@cross_domain(origin='*')
def get_pro_players():
    return get_json('pro_players')


@app.route('/API/matches/')
@cross_domain(origin='*')
def get_matches():
    # return get_json('upcoming')
    return jsonify(Gosu().fetch())


@app.route('/get_image')
@cross_domain(origin='*')
def get_image():
    return send_file('test.png', mimetype='image/gif')


@app.route('/API/')  # /?query=team&name=Secret
@cross_domain(origin='*')
def res():
    if len(request.args) > 1:
        return handle_multiple_params(request.args)
    path = request.args.get('query')
    return send_error('query', path)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def get_home(path):
    return render_template('index.html')


if __name__ == '__main__':
    Worker()
    app.run()