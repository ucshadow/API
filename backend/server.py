from flask import Flask
from flask import request
from worker import Worker

app = Flask(__name__)


@app.route('/API/')
def hello_world():
    path = request.args.get('query')
    return 'Hello, you are here: {}'.format(path)
    # return jsonify({'data': [1, 2, 3]})


if __name__ == '__main__':
    # worker = Worker()
    app.run()