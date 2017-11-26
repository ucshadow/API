import React, {Component} from 'react';

export default class TeamWonInfo extends Component {

  static defaultProps = {
    dimensions: {w: 1920, h: 1080},
    team: {
      position: 'left',
      data: {
        "last_match_time": 0,
        "logo_url": "https://i.imgur.com/5gO7P9B.png",
        "losses": 0,
        "name": "",
        "rating": 0,
        "tag": "",
        "team_id": 0,
        "wins": 0,
      }
    },

  };

  calculateStyle = () => {
    return {
      position: 'absolute',
      top: this.props.dimensions.height / 12 * this.props.index + 10,
      left: (this.props.team.position === 'left' ? 10 : null),
      right: (this.props.team.position === 'right' ? 10 : null),
    }
  };

  logoStyle = () => {
    return {
      height: this.props.dimensions.height / 14,
      width: this.props.dimensions.height / 14
    }
  };

  infoStyle = () => {
    return {
      width: this.props.dimensions.width / 4,
      height: this.props.dimensions.height / 14,
      border: '1px solid white',
      position: 'absolute',
      top: this.props.dimensions.height / 12 * this.props.index + 10,
      left: (this.props.team.position === 'left' ? this.props.dimensions.width / 5 : null),
      right: (this.props.team.position === 'right' ? this.props.dimensions.width / 5 : null),
      fontSize: this.props.dimensions.width / 44
    }
  };

  render() {
    // console.log(this.props.match);
    return (
      <div>
        <div className={'asdasd'} style={this.calculateStyle()}>
          <img src={this.props.team.data.logo_url}
               title={this.props.team.data.name}
               className='history-between-logo'
               style={this.logoStyle()}
          />

        </div>
        <div style={this.infoStyle()} className='match-info-match-history'>
          {this.props.match.match_info.league_name}
        </div>
      </div>
    )
  }

}