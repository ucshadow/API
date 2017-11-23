import React, {Component} from 'react';
import {path} from "./Path";


export default class PlayerInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {player: this.props.data};
    this.u = path;
  }

  // componentDidMount() {
  //   this.getData(this.props.playerId)
  // }

  // static defaultProps = {
  //   playerId: 0
  // };

  // getData = (id_) => {
  //   fetch(this.u + '/API/?query=player_info&id=' + id_)
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((res) => {
  //       this.setState({player: res});
  //     });
  // };

  showPlayer = () => {
    //toDo: maybe simplify the JSON??
    if(this.state.player) {
      return(
        <div className='player-info'>
          <img className='player-avatar'
               src={this.state.player.player_profile.player.profile.avatarfull}
                title={this.state.player.player.name}
          />
        </div>
      )
    }
  };

  render() {
    return(
      <div className={'avatar-container-' + this.props.side}>
        {this.showPlayer()}
      </div>
    )
  }

}