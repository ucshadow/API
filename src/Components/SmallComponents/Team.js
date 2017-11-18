import React, {Component} from 'react';
import TeamDetails from './TeamDetails';


/**
 * Team main panel, one for each team
 */
export default class Team extends Component {

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
      <div className={this.props.side === 'left' ? "col-md-5 team" : "col-md-5 team"}>
        <div className="team-name"> TEAM 1</div>
        <br/>
        {this.checkForTeam()}
      </div>
    )
  }

}