from flask import Flask
import local_API.api_endpoints
from worker import Worker


class FlaskAppWrapper(object):
    app = None

    def __init__(self, name):
        self.app = Flask(name)

    def run(self):
        self.app.run()

    def add_endpoint(self, obj):
        self.app.add_url_rule(obj.endpoint, obj.endpoint_name, obj.handler)


if __name__ == '__main__':
    worker = Worker()
    a = FlaskAppWrapper('server')
    for e in local_API.api_endpoints.endpoints:
        a.add_endpoint(e)
    a.run()