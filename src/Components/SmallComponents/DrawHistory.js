import React, {Component} from 'react';
import HistoryDiagram from './HistoryDiagram';

export default class DrawHistory extends Component {

  constructor(props) {
    super(props);
    this.u = 'https://api.opendota.com/api/matches/';
    this.graphData = [];
    this.state = {g_d: []}
  }

  fetchMatchDetails = (id_) => {
    if (id_ !== 0) {
      fetch(this.u + id_)
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          let d = {};
          d.radiantTeam = res.radiant_team;
          d.direTeam = res.dire_team;
          d.radiantWin = res.radiant_win;
          d.match_id = res.match_id;
          this.graphData.push(d);
          // console.log(this.graphData);
          if (this.graphData.length >= this.props.data.length) {
            console.log('new state');
            console.log(this.state.g_d);
            this.setState({g_d: this.graphData})
          }
        });
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
        <HistoryDiagram key={Math.random()} d_={this.state.g_d} teamName={this.props.teamName}/>
      </div>
    )
  }

}