import React, { Component } from 'react';


export default class Upcoming extends Component {

  constructor() {
    super();
    //this.url = 'http://www.gosugamers.net/dota2';
    this.state = {data: ['placeholder']}
  }

  componentDidMount = () => {
    let url = 'https://api.steampowered.com/IDOTA2Match_570/GetLiveLeagueGames/v1/?key=3221B7028177669B2617814FECA4A67B';
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        this.setState({data: res});
      });
  };

  //changeState = (s) => {
  //  this.setState({data: s})
  //};
  //
  show = () => {
    console.log('hi from show');
    return this.state.data.map((e) => {
      console.log(e);
      return e.league_tier >= 2 ? (
        <div>
          {e.radiant_team.team_name} vs {e.dire_team.team_name}
        </div>
      ) : null
    })
  };

  render() {
    return (
      <div className="col-md-2 upcoming">
        MATCHES
        <br />

      </div>
    )
  }

}