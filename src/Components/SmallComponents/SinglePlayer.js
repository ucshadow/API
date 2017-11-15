import React, {Component} from 'react';
import Provider from "../Provider";

export default class SinglePlayer extends Component {

  constructor(props) {
    super(props);
    this.state = {details: undefined}
  }

  fetchPlayerDetails = () => {
    setTimeout(() => {
      console.log('fetching ' + 'https://api.opendota.com/api/players/' + this.props.playerId);
      // fetch('https://api.opendota.com/api/players/' + this.props.playerId)
      //   .then((res) => {
      //     return res.json();
      //   })
      //   .then((res) => {
      //     this.setState({details: res});
      //   });
      Provider.fetchUrl('https://api.opendota.com/api/players/' + this.props.playerId, this)
    }, this.props.timeout)
  };

  showPlayerAvatar = () => {
    if (this.state.details) {
      return (
        <img src={this.state.details.profile.avatarfull} className='player-avatar'
             style={{width: this.width / 30 + 'px', height: this.width / 24 + 'px'}}/>
      )
    }
    return (
      <img src='https://i.imgur.com/5gO7P9B.png' className='player-avatar'
           style={{width: this.width / 30 + 'px', height: this.width / 24 + 'px'}}/>
    )
  };

  render() {
    if (this.props.playerId > 0 && !this.state.details) {
      this.fetchPlayerDetails();
    }
    return (
      <div className='col-md-2 single-player'>
        {this.showPlayerAvatar()}
      </div>
    )
  }

}