from local_API.action import Action


class APIEndpoint:
    def __init__(self, endpoint, endpoint_name, handler):
        self.endpoint = endpoint
        self.endpoint_name = endpoint_name
        self.handler = Action(handler, endpoint_name)
