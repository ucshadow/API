import React, {Component} from 'react';
import TeamHistory from './TeamHistory';
import TeamPlayers from './TeamPlayers';
import {path} from "./Path";
import Provider from "../Provider";

export default class TeamDetails extends Component {

  constructor(props) {
    super(props);
    this.u = path;

    this.width = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;

    this.state = {
      details: {
        last_match_time: 0,
        logo_url: undefined,
        losses: 0,
        name: "",
        rating: 0,
        tag: "",
        team_id: 0,
        wins: 0
      }
    }
  }

  componentDidMount = () => {
    this.fetchTeamDetails();
  };

  fetchTeamDetails = () => {
    // fetch(this.u + '/API/?query=team&name=' + this.props.team)
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((res) => {
    //     this.setState({details: res});
    //   });
    Provider.fetchUrl(this.u + '/API/?query=team&name=' + this.props.team, this)
  };

  handleLogoLoad = () => {
    if(!this.state.details.logo_url) {
      return 'https://i.imgur.com/5gO7P9B.png';
    }
    return this.state.details.logo_url;
  };

  showDetails = () => {
    // console.log('getting logo from' + this.state.details.logo_url);
    return (
      <div className='row team-details'>
        {this.state.details.logo_url ?
          <img src={this.handleLogoLoad()} className='col-md-4 team-logo-big' /> : null}
        <TeamPlayers teamId={this.state.details.team_id} />
      </div>
    )
  };

  // showDetails = () => {
  //   return <TeamDetails teamId={this.state.details.team_id}/>
  // };


  render() {
    return (
      <div>
        {this.showDetails()}
        <TeamHistory key={Math.random()} id_={this.state.details.team_id} teamName={this.state.details.name}/>
      </div>
    )
  }

}