import React, {Component} from 'react';
import DrawHistory from './DrawHistory';

export default class TeamHistory extends Component {

  constructor(props) {
    super(props);
    this.u = 'https://api.opendota.com/api/teams/';

    this.state = {history: []};

  }

  fetchTeamDetails = () => {
    if (this.state.history.length === 0) {
      fetch(this.u + this.props.id_ + '/matches')
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          this.setState({history: res});
        });
    }
  };

  showDetails = () => {
    if (this.state.history.length === 0) {
      return <DrawHistory key={Math.random()} data={[{
        match_id: 0,
        radiant_win: false,
        radiant: true,
        duration: 0,
        start_time: 0,
        leagueid: 0,
        league_name: "",
        cluster: 0
      }]}/>
    }
    if (this.state.history.length < 10) {
      return <DrawHistory key={Math.random()} data={this.state.history} id_={'t' + this.props.id_}
                          teamName={this.props.teamName}/>
    }
    return <DrawHistory key={Math.random()} data={this.state.history.slice(0, 10)} id_={'t' + this.props.id_}
                        teamName={this.props.teamName}/>
  };

  fetchDetails = () => {
    if (this.props.id_) {
      return this.fetchTeamDetails();
    }
  };


  render() {
    return (
      <div>
        {this.fetchDetails()}
        {this.showDetails()}
      </div>
    )
  }

}