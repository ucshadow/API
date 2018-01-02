import React, {Component} from 'react';
import PlayerInfo from "./PlayerInfo";
import provider from "../Helpers/RequestProvider";


export default class TeamPlayers extends Component {

  constructor() {
    super();
    this.state = {players: []};
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
    provider('players', id_, '/API/?query=active_players&id=' + id_, (res) => {
      this.setState(res);
    });
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