import React, {Component} from 'react';
import {path} from "../SmallComponents/Path";
import CacheFunctions from "../Helpers/CacheFunctions";
import {localCache} from "../Helpers/LocalCache";
import TeamHistoryChart from "./TeamHistoryChart";

export default class TeamHistoryChartData extends Component {

  constructor(props) {
    super(props);
    this.u = path;
    this.state = {teams: []}
  }

  componentDidMount() {
    this.getData(this.batchIds().join(','));
  }

  componentWillReceiveProps(p) {
    this.getData(this.batchIds().join(','));
  }

  getData = (id_) => {
    if (CacheFunctions.isCached(id_)) {
      this.setState({teams: CacheFunctions.getFromCache(id_)})
    } else {
      fetch(this.u + '/API/?query=team_batch&ids=' + id_)
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          localCache.push({id_: id_, data: res});
          this.setState({teams: res});
        });
    }

  };

  batchIds = () => {
    let ids = [];
    this.props.data.forEach((e) => {
      let team1Id = e.match_data.result.dire_team_id;
      let team2Id = e.match_data.result.radiant_team_id;
      if (ids.indexOf(team1Id) < 0) {
        ids.push(team1Id)
      }
      if (ids.indexOf(team2Id) < 0) {
        ids.push(team2Id)
      }
    });
    return ids;
  };

  sendData = () => {
    if (this.state.teams.length > 0) {
      return <TeamHistoryChart key={Math.random()} data={this.props.data} teams={this.state.teams}/>
    }
  };

  render() {
    return (
      <div>
        {this.sendData()}
      </div>
    )
  }

}