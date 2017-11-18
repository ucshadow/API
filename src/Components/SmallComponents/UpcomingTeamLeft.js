import React, {Component} from 'react';
import Provider from "../Provider";
import {path} from "./Path";

export default class UpcomingTeamLeft extends Component {

  constructor() {
    super();
    this.u = path;

    this.width = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;

    this.state = {
      details: {
        last_match_time: 0,
        logo_url: 'https://i.imgur.com/5gO7P9B.png',
        losses: 0,
        name: 'TBD',
        rating: 0,
        tag: 0,
        team_id: 0,
        wins: 0
      }
    }
  }

  /**
   * fetches the team logo from the server side
   * @param teamName the name of the team that has no logo (in the OpenDota API)
   */
  getLogo = (teamName) => {
    fetch(this.u + '/API/?query=logo&name=' + teamName)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
      let oldState = this.state.details;
      oldState.logo_url = res.logo;
        this.setState({details: oldState});
      });
  };

  componentDidMount() {
    if(this.props.data !== 'TBD') {
      Provider.fetchUrl(path + '/API/?query=team&name=' + this.props.data, this)
    }
  }

  render() {
    // if(!this.state.details.logo_url) {
    //   this.getLogo(this.props.data);
    //   console.log('updating')
    // }
    return (
      <div className='col-md-4 upcoming_match_entry'>
        <img src={this.state.details.logo_url}
             alt={this.state.details.name}
             title={this.state.details.name}
             className='upcoming_team_logo'
             style={{height: this.width / 32 + 'px', width: this.width / 32 + 'px'}}
        />
      </div>
    )
  }

}