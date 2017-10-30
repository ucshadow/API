from local_API.api_class import APIEndpoint
from local_API.server_act import Act

act = Act()

endpoints = [
    APIEndpoint('/get_all_teams', 'all teams', act.teams),
    APIEndpoint('/get_incoming', 'incoming matches', act.incoming)
]
