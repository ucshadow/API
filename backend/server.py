# from flask import Flask
# from flask import request
# from worker import Worker
#
# app = Flask(__name__)
#
#
# @app.route('/API/')
# def hello_world():
#     path = request.args.get('query')
#     return 'Hello, you are here: {}'.format(path)
#     # return jsonify({'data': [1, 2, 3]})


from flask import Flask, Response
from worker import Worker


class Action(object):

    def __init__(self, action):
        self.action = action
        self.response = Response(status=200, headers={}, response="Teams")

    def __call__(self, *args):
        self.action()
        return self.response


class FlaskAppWrapper(object):
    app = None

    def __init__(self, name):
        self.app = Flask(name)

    def run(self):
        self.app.run()

    def add_endpoint(self, endpoint=None, endpoint_name=None, handler=None):
        self.app.add_url_rule(endpoint, endpoint_name, Action(handler))


class Act:

    def teams(self):
        print('sent teams...')


if __name__ == '__main__':
    worker = Worker()
    a = FlaskAppWrapper('server')
    act = Act()
    a.add_endpoint(endpoint='/ad', endpoint_name='ad', handler=act.teams)
    a.run()

    # # worker = Worker()
    # app.run()