import React, {Component} from 'react';
import SinglePlayer from './SinglePlayer';

export default class TeamPlayers extends Component {

  constructor(props) {
    super(props);
    this.state = {details: []};
    this.playerFetchTimeout = 0;
  }

  fetchTeamPlayers = () => {
    if (this.props.teamId > 0) {
      // console.log('fetching ' + 'https://api.opendota.com/api/teams/' + this.props.teamId + ' /players');
      fetch('https://api.opendota.com/api/teams/' + this.props.teamId + ' /players')
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          this.setState({details: res});
        });
    }
  };

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
    console.log(this.state.details);
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