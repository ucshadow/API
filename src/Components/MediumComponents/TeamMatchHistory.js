import React, {Component} from 'react';
import TeamHistoryChart from './TeamHistoryChart';
import {wins} from '../Helpers/WinTracker';
import provider from '../Helpers/RequestProvider';

export default class TeamMatchHistory extends Component {

  constructor() {
    super();
    this.state = {history: []};
  }

  static defaultProps = {
    dimensions: {w: 1920, h: 1080},
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.teamId > 0) {
      this.getData(nextProps.teamId);
      wins[nextProps.teamId] = []
    }
  }

  getData = (id_) => {
    provider('history', id_ + 'history', '/API/?query=team_last_match&id=' + id_, (res) => {
      this.setState(res);
    });
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
    return (
      <div style={this.calculateStyle()} className='team-history-container'>
        {this.showHistoryChart()}
      </div>
    )
  }

}