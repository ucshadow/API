import React, {Component} from 'react';
import Provider from "../Provider";

/**
 * Component responsible for showing data about a specific player
 * It's fetches the data by itself.
 */
export default class SinglePlayer extends Component {

  constructor(props) {
    super(props);
    this.state = {details: undefined}
  }

  /**
   * Fetches new player data every .5 seconds. OpenDota API guidelines
   * kindly asks for no more than 3 requests a second. The timeout length is passed as a prop
   * since it needs to be incremented by the parent or everything will
   * happen at once for every SinglePlayer instance, but after .5 seconds delay.
   */
  fetchPlayerDetails = () => {
    setTimeout(() => {
      Provider.fetchUrl('https://api.opendota.com/api/players/' + this.props.playerId, this)
    }, this.props.timeout)
  };

  /**
   * Only show high resolution avatar or placeholder.
   * Steam can handle the traffic :)
   * @returns {XML} the avatar image
   */
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
    // should only fetch if it has a player id and it hasn't fetched before
    // to avoid recursion since it's called in the render() method
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