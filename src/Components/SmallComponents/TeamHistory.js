import React, {Component} from 'react';
import DrawHistory from './DrawHistory';
import Provider from "../Provider";

/**
 * Component responsible with fetching of a team match history
 * The match history is used to draw a graph.
 */
export default class TeamHistory extends Component {

  constructor(props) {
    super(props);
    this.u = 'https://api.opendota.com/api/teams/';
    this.state = {details: []};
  }

  fetchTeamDetails = () => {
    if (this.state.details.length === 0) {
      Provider.fetchUrl(this.u + this.props.id_ + '/matches', this)
    }
  };

  showDetails = () => {
    if (this.state.details.length === 0) {
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
    if (this.state.details.length < 10) {
      return <DrawHistory key={Math.random()} data={this.state.details} id_={'t' + this.props.id_}
                          teamName={this.props.teamName}/>
    }
    return <DrawHistory key={Math.random()} data={this.state.details.slice(0, 10)} id_={'t' + this.props.id_}
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