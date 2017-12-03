import React, {Component} from 'react';
import CacheFunctions from "../Helpers/CacheFunctions";
import {localCache} from "../Helpers/LocalCache";
import {path} from "../SmallComponents/Path";
import TeamHistoryChart from "./TeamHistoryChart";
import {wins} from "../Helpers/WinTracker";

export default class TeamMatchHistory extends Component {

  constructor() {
    super();
    this.state = {history: []};
    this.u = path
  }

  static defaultProps = {
    dimensions: {w: 1920, h: 1080},
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.teamId > 0) {
      // console.log('fetching history for ' + nextProps.teamId);
      this.getData(nextProps.teamId);
      wins[nextProps.teamId] = []
    }
  }

  getData = (id_) => {
    if (CacheFunctions.isCached(id_ + 'history')) {
      // console.log(CacheFunctions.getFromCache(id_));
      this.setState({history: CacheFunctions.getFromCache(id_ + 'history')})
    } else {
      fetch(this.u + '/API/?query=team_last_match&id=' + id_)
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          localCache.push({id_: id_ + 'history', data: res});
          this.setState({history: res});
        });
    }

  };

  calculateStyle = () => {
    return {
      width: this.props.dimensions.w / 3.1,
      height: this.props.dimensions.h / 4,
      bottom: 1
    }
  };

  showHistoryChart = () => {
    if (this.state.history.length > 0) {
      return <TeamHistoryChart data={this.state.history}
                               dimensions={this.calculateStyle()}
                               team_id={this.props.teamId}
                               left={this.props.left}
      />
    }
  };

  render() {
    // console.log(this.state.history);
    return (
      <div style={this.calculateStyle()} className='team-history-container'>
        {this.showHistoryChart()}
      </div>
    )
  }

}