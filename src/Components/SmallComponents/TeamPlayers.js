import React, {Component} from 'react';
import {path} from "./Path";
import PlayerInfo from "./PlayerInfo";
import {localCache} from "../Helpers/LocalCache";
import CacheFunctions from "../Helpers/CacheFunctions";


export default class TeamPlayers extends Component {

  constructor() {
    super();
    this.state = {players: []};
    this.u = path;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.teamId > 0) {
      this.getData(nextProps.teamId)
    }
  }

  static defaultProps = {
    teamId: 0
  };

  getData = (id_) => {
    if (CacheFunctions.isCached(id_)) {
      this.setState({players: CacheFunctions.getFromCache(id_)})
    } else {
      fetch(this.u + '/API/?query=active_players&id=' + id_)
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          this.setState({players: res});
          localCache.push({id_: id_, data: res})
        });
    }
  };

  showPlayers = () => {
    if (this.state.players.length > 0) {
      let local = this.state.players;
      if (local.length > 5) {
        local = local.slice(0, 5);
      }
      return local.map((e) => {
        return <PlayerInfo key={Math.random()} data={e} side={this.props.side}/>
      })
    }
  };

  render() {
    return (
      <div className='all-avatars'>
        {this.showPlayers()}
      </div>
    )
  }

}