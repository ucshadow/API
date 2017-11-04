import React, {Component} from 'react';
import TeamHistory from './TeamHistory';

export default class TeamDetails extends Component {

  constructor(props) {
    super(props);
    this.u = 'http://localhost:5000';

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
    fetch(this.u + '/API/?query=team&name=' + this.props.team)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        this.setState({details: res});
      });
  };

  showDetails = () => {
    return (
      <div>
        <div>
          Name: {this.state.details.name}
        </div>
        <div>
          Wins: {this.state.details.wins}
        </div>
        <div>
          Losses: {this.state.details.losses}
        </div>
        <div>
          Rating: {this.state.details.rating}
        </div>
        <div>
          ID: {this.state.details.team_id}
        </div>
        {this.state.details.logo_url ? <img src={this.state.details.logo_url} /> : null}
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