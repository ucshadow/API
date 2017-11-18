import React, {Component} from 'react';
import SinglePlayer from './SinglePlayer';
import Provider from "../Provider";

/**
 * Parent Component containing player pictures Components
 */
export default class TeamPlayers extends Component {

  constructor(props) {
    super(props);
    this.state = {details: []};
    this.playerFetchTimeout = 0;
  }

  fetchTeamPlayers = (n) => {
    if (n) {
      Provider.fetchUrl('https://api.opendota.com/api/teams/' + n + ' /players', this)
    }
  };

  /**
   * For each player that is currently active in the team
   * a new Component is created to display data about that player
   * @returns Array new Component for each player
   */
  showPlayers = () => {
    if (this.state.details.length > 0) {
      let local = this.state.details;
      if(local.length > 8) {
        local = this.state.details.slice(0, 8)
      }
      return local.map((e) => {
        if (e.is_current_team_member) {
          this.playerFetchTimeout += 500;
          return <SinglePlayer key={Math.random()}
                               player={e}
                               timeout={this.playerFetchTimeout}
                               playerId={e.account_id}/>
        }
      })
    }
  };

  componentWillReceiveProps(n) {
    console.log(n);
    if(n.teamId) {
      this.fetchTeamPlayers(n.teamId);
    }
  }

  render = () => {
    return (
      <div className='col-md-8 team-players row'>
        {this.showPlayers()}
      </div>
    )
  }

}