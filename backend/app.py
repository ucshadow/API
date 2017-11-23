import json

from flask import Flask, jsonify, render_template, send_file
from requests.compat import basestring
from datetime import timedelta
from flask import make_response, request, current_app
from functools import update_wrapper

from Worker import Worker, add_logo
from helpers.image_downloader import BingLogoSearch
from helpers.team_name_special_rules import rules

app = Flask(__name__, static_url_path='/static')
logo = BingLogoSearch()
worker = None


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


def send_error(name, query):
    return jsonify({'error': 'your query matches no endpoints',
                    'query': query, 'name': name})


# def handle_multiple_params(p):
#     q = p.get('query')
#     if not q:
#         return send_error('query', q)
#     if q == 'team':
#         if not p.get('id'):
#             return send_error('team', q)
#         return jsonify(worker.get_team_by_id(p.get('id')))
#     if q == 'team_last_match':
#         if not p.get('id'):
#             return send_error('team_last_match', q)
#         print(worker.get_team_last_match_by_id(p.get('id')))
#         return jsonify(worker.get_team_last_match_by_id(p.get('id')))
#     if q == 'active_players':  # todo: does not work
#         if not p.get('id'):
#             return send_error('active_players', q)
#         return jsonify(worker.get_active_players_by_team_id(p.get('id')))
#     if q == 'player_info':
#         if not p.get('id'):
#             return send_error('player_info', q)
#         return jsonify(worker.get_player_by_id(p.get('id')))
#     if q == 'player_heroes':
#         if not p.get('id'):
#             return send_error('player_heroes', q)
#         return jsonify(worker.get_player_heroes_by_id(p.get('id')))





@app.route('/API/upcoming/')
@cross_domain(origin='*')
def get_upcoming():
    return jsonify(worker.upcoming_matches_with_details)
    # return jsonify(Gosu().fetch())


@app.route('/API/matches/')
@cross_domain(origin='*')
def get_matches():
    return jsonify(worker.upcoming_matches)


@app.route('/API/test/')
@cross_domain(origin='*')
def test__():
    return jsonify(worker.get_player_heroes_by_id(92477990))


@app.route('/API/')  # /?query=team&name=Secret
@cross_domain(origin='*')
def api_handler():
    if len(request.args) > 1:
        p = request.args
        q = request.args.get('query')
        if not q:
            return send_error('query', q)
        if q == 'team':
            if not p.get('id'):
                return send_error('team', q)
            return jsonify(worker.get_team_by_id(p.get('id')))
        if q == 'team_last_match':
            if not p.get('id'):
                return send_error('team_last_match', q)
            print(worker.get_team_last_match_by_id(p.get('id')))
            return jsonify(worker.get_team_last_match_by_id(p.get('id')))
        if q == 'active_players':  # todo: does not work
            if not p.get('id'):
                return send_error('active_players', q)
            return jsonify(worker.get_active_players_by_team_id(p.get('id')))
        if q == 'player_info':
            if not p.get('id'):
                return send_error('player_info', q)
            return jsonify(worker.get_player_by_id(p.get('id')))
        if q == 'player_heroes':
            if not p.get('id'):
                return send_error('player_heroes', q)
            return jsonify(worker.get_player_heroes_by_id(p.get('id')))
        if q == 'matches_between':
            if not p.get('id1'):
                return send_error('matches_between id1', q)
            if not p.get('id2'):
                return send_error('matches_between id2', q)
            return jsonify(worker.get_last_matches_between(p.get('id1'), p.get('id2')))
    path = request.args.get('query')
    return send_error('query', path)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def get_home(path):
    return render_template('index.html')


if __name__ == '__main__':
    worker = Worker()
    app.run()
