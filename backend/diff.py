import requests
import json

r = requests.get('https://api.steampowered.com/IDOTA2Match_570/GetScheduledLeagueGames'
                 'eGames/v1/?key=3221B7028177669B2617814FECA4A67B')

with open('a.json', 'w') as f:
    json.dump(r.json()['result']['games'], f, indent=4)