API Project by Catalin

Public APIs:

* [Dota2 steam API](https://wiki.teamfortress.com/wiki/WebAPI)
* [OpenDota API](https://docs.opendota.com/)

Data for upcoming matches from
* [teamliquid](http://liquipedia.net/dota2/Main_Page)
* [gosugamers](http://www.gosugamers.net/dota2)

Programming languages:
* [Python](https://www.python.org/) -> [Flask](http://flask.pocoo.org/)
* [Javascript](https://nodejs.org/en/) -> [React](https://reactjs.org/)

Hosted on [Heroku](https://d2-api.herokuapp.com/) free tier.

Since Heroku free tier puts the process to sleep if idle, please allow up to 90 seconds for
the server to boot and download necessary data. I've tried to negate the impact on OpenDota API 
by downloading all the necessary data on server boot-up (there are around 200 queries and 3 a second
is the recommended amount by OpenDota guidelines).

**Description:**

The purpose of this App is to predict the chances for a team to win over the other 
team on a game of [Dota 2](http://www.dota2.com/play/).

Although the example from heroku is hardcoded with 6 teams, the App is capable to 
run and auto-update with upcoming matches.

**Presentation:**

* Upcoming matches, a list of matches that are soon to be played. Left team (represented by the team logo) vs
Right team

![alt text](https://i.imgur.com/Mk4haMu.png "Upcoming")

* Team presentation:

    - Team Logo
    - Each player's avatar
    - Each player's most played hero portrait
 
![alt text](https://i.imgur.com/iRUbdNW.png "Team Presentation")

* Team head-to-head past encounters (last 10 if 10):

    - Winning team logo
    - Tournament name
 
![alt text](https://i.imgur.com/6R3SQzL.png "Team past encounters")

* Team last 20 official matches:

    - Opponent team logo (click-able for match details)
 
![alt text](https://i.imgur.com/xIIFlZ9.png "Last 20 matches")

* Selected match details. The match can be selected by clicking a square in the 'last 20 matches' section. 
Main team is always on the left

    - Team logos
    - Each player's avatar and hero portrait of hero played in that specific match
    - Score at the end of the game
    - Tournament name and date
 
![alt text](https://i.imgur.com/G0rZqPX.png "Match details")

* Calculated chances to win the match.
Based on 5 criteria

    - leaderboard[rank](http://www.dota2.com/leaderboards/)of each player: weight 15
    - last 20 matches: weight 15
    - history between teams: weight 20
    - top 3 heroes of each player win rate (in competitive matches): weight 20
    - team [rating](http://liquipedia.net/dota2/Dota_Pro_Circuit/Rankings/Teams)(overall): weight 20
    - luck: weight 10 (scrapped)
 
![alt text](https://i.imgur.com/1SlZXgf.png "Chances to win")

 The App uses little to no CSS.
 
 Dimensions and positioning is calculated bases on the screen resolution.
 
 Developed on 4k resolution, but 1k _should_ look basically the same.

 Details about the implementation process can be found in the code comments.
 Un-commented code should be self-explanatory.