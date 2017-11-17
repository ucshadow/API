import React, {Component} from 'react';
import HistoryDiagram from './HistoryDiagram';
import Provider from "../Provider";

/**
 * Component responsible with fetching match details for a specific match;
 * the data is passed to the diagram. Specific data includes:
 * radiant Team name
 * dire Team name
 * radiant victory
 * match id
 * start Time
 */
export default class DrawHistory extends Component {

  constructor(props) {
    super(props);
    this.u = 'https://api.opendota.com/api/matches/';
    this.graphData = [];
    this.state = {g_d: []}
  }

  fetchMatchDetails = (id_) => {
    if (id_ !== 0) {
      Provider.fetchGraphData(this.u + id_, this, this.graphData, this.props.data)
    }
  };


  results = () => {
    if (this.props.data.length > this.state.g_d.length) {
      return this.props.data.map((e) => {
        return (
          <div key={Math.random()}>
            match id: {this.fetchMatchDetails(e.match_id)}
          </div>
        )
      })
    }
  };

  render() {
    return (
      <div>
        {this.results()}
        <HistoryDiagram key={Math.random()} d_={this.state.g_d} id_={this.props.id_} teamName={this.props.teamName}/>
      </div>
    )
  }

}