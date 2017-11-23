import React, {Component} from 'react';
import {path} from "./Path";
import PlayerInfo from "./PlayerInfo";
import {localCache} from "./LocalCache";


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
    if (this.isCached(id_)) {
      this.setState({players: this.getFromCache(id_)})
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

  isCached = (id_) => {
    for (let i = 0; i < localCache.length; i++) {
      if (localCache[i].id_ === id_) {
        return true;
      }
    }
    return false;
  };

  getFromCache = (id_) => {
    for (let i = 0; i < localCache.length; i++) {
      if (localCache[i].id_ === id_) {
        return localCache[i].data;
      }
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