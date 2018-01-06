import React, {Component} from 'react';
import CacheFunctions from "../Helpers/CacheFunctions";
import {path} from "./Path";
import {localCache} from "../Helpers/LocalCache";
import DetailsSingleTeamDrawer from "./DetailsSingleTeamDrawer";


export default class DetailsSingleTeam extends Component {


  constructor(props) {
    super(props);
    this.u = path;
    this.state = {picks: this.props.picks, playerInfo: []}
  }

  componentDidMount() {
    this.solvePlayerInfo(this.props.picks);
  }

  componentWillReceiveProps(nextP) {
    this.solvePlayerInfo(nextP.picks);
  }

  solvePlayerInfo = (a) => {
    // this is a more complex version of the fetch so the provider is not used here.
    let query = [];
    a.map((e) => {
      query.push(e.player_data.account_id + '')
    });
    let queryString = query.join(',');
    if(query.length === 0) {
      queryString = '113800818,137193239,134276083,89423756,107803494'; // dummy query
    }

    if (CacheFunctions.isCached(queryString)) {
      this.setState({playerInfo: CacheFunctions.getFromCache(queryString)})
    } else {
      fetch(this.u + '/API/?query=player_batch&ids=' + queryString)
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          res.map((e) => {
            localCache.push({id_: 'player' + e.account_id, data: e});
          });
          this.setState({playerInfo: res});
          localCache.push({id_: queryString, data: res})
        });
    }
  };

  drawTeams = () => {
    if (this.state.playerInfo.length > 0) {
      return <DetailsSingleTeamDrawer
        key={Math.random()}
        players={this.state.playerInfo}
        t={this.props.t}
        picks={this.props.picks}
        opponent={this.props.opponent}
        data={this.props.data}
      />
    }
  };

  showTitle = () => {
    return (
      <div className='tournament-title'>
        {this.props.data.league_name} &nbsp;&nbsp;&nbsp;&nbsp;
        {new Date(this.props.data.start_time * 1000).toGMTString().split('GMT')[0]}
      </div>
    )
  };

  render() {
    return (
      <div>
        {this.showTitle()}
        {this.drawTeams()}
      </div>
    )
  }

}