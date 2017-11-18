import React, {Component} from 'react';
import TeamHistory from './TeamHistory';
import TeamPlayers from './TeamPlayers';
import {path} from "./Path";
import Provider from "../Provider";

/**
 * Component responsible with fetching a team details.
 * It has a default details object so it loads even if the fetch fails
 */
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

  componentDidMount(){
    this.fetchTeamDetails();
  };

  fetchTeamDetails = () => {
    Provider.fetchUrl(this.u + '/API/?query=team&name=' + this.props.team, this)
  };

  /**
   * Displays the team logo. Should display a placeholder if no team logo
   *
   * @returns {*}
   */
    //toDO: MOVED TO THE BACKEND
  handleLogoLoad = () => {
    if(!this.state.details.logo_url) {
      return 'https://i.imgur.com/5gO7P9B.png';
    }
    return this.state.details.logo_url;
  };

  showDetails = () => {
    return (
      <div className='row team-details'>
        {this.state.details.logo_url ?
          <img src={this.handleLogoLoad()} className='col-md-4 team-logo-big' /> : null}
        <TeamPlayers teamId={this.state.details.team_id} />
      </div>
    )
  };


  render() {
    return (
      <div>
        {this.showDetails()}
        <TeamHistory key={Math.random()} id_={this.state.details.team_id} teamName={this.state.details.name}/>
      </div>
    )
  }

}