import React, {Component} from 'react';
import TeamDetails from './TeamDetails';


export default class Team extends Component {

  constructor(props) {
    super(props);

    // this.state = {team: this.props.teams[this.props.side]};


  }

  showTeamDetails = () => {
    return (
      <div>
        {this.state.team ? this.state.team.name : null}
      </div>
    )
  };

  checkForTeam = () => {
    if (this.props.teams === 0) {
      return <div> Loading, please wait... </div>
    }
    return (
      <div>
        <TeamDetails key={Math.random()} team={this.props.teams[this.props.side]}/>
      </div>
    )
  };

  render() {
    return (
      <div className={this.props.side === 'left' ? "col-md-4 offset-2 team" : "col-md-4 team"}>
        <div className="team-name"> TEAM 1</div>
        <br/>
        {this.checkForTeam()}
      </div>
    )
  }

}