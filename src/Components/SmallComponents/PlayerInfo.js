import React, {Component} from 'react';
import {path} from "./Path";
import CacheFunctions from "../Helpers/CacheFunctions";
import {localCache} from "../Helpers/LocalCache";
import BestHeroes from "./BestHeroes";


export default class PlayerInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {player: this.props.data, heroes: []};
    this.u = path;
  }

  componentDidMount() {
    this.getData(this.props.data.player.account_id)
  }

  shouldComponentUpdate() {
    return this.state.heroes.length === 0;
  }

  getData = (id_) => {
    if (CacheFunctions.isCached(id_)) {
      this.setState({heroes: CacheFunctions.getFromCache(id_)})
    } else {
      fetch(this.u + '/API/?query=player_heroes&id=' + id_)
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          this.setState({heroes: res});
          localCache.push({id_: id_, data: res});
        });
    }

  };

  showPlayer = () => {
    //toDo: maybe simplify the JSON??
    if (this.state.player) {
      return (
        <div className='player-info'>
          <img className='player-avatar'
               src={this.state.player.player_profile.player.profile.avatarfull}
               title={this.state.player.player.name}
          />
        </div>
      )
    }
  };

  showBestHeroes = () => {
    return <BestHeroes data={this.state.heroes} account_id={this.props.data.player.account_id} key={Math.random()}/>
  };

  render() {
    return (
      <div className={'avatar-container-' + this.props.side}>
        {this.showPlayer()}
        {this.showBestHeroes()}
      </div>
    )
  }

}