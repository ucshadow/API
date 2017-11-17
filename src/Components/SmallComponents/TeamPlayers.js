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

  fetchTeamPlayers = () => {
    if (this.props.teamId > 0) {
      Provider.fetchUrl('https://api.opendota.com/api/teams/' + this.props.teamId + ' /players', this)
    }
  };

  /**
   * For each player that is currently active in the team
   * a new Component is created to display data about that player
   * @returns A new Component for each player
   */
  showPlayers = () => {
    if (this.state.details.length > 0) {
      let local = this.state.details;
      if(this.state.details.length > 8) {
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

  render = () => {
    // should only fetch if it has a team id and it hasn't fetched before
    // to avoid recursion since it's called in the render() method
    if (this.props.teamId && this.state.details.length === 0) {
      this.fetchTeamPlayers()
    }
    return (
      <div className='col-md-8 team-players row'>
        {this.showPlayers()}
      </div>
    )
  }

}