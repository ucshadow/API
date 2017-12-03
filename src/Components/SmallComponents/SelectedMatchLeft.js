import React, {Component} from 'react';
import TeamPlayers from "./TeamPlayers";
import TeamMatchHistory from "../MediumComponents/TeamMatchHistory";

const default_ = {
  data: {
    "last_match_time": 0,
    "logo_url": "https://i.imgur.com/5gO7P9B.png",
    "losses": 0,
    "name": "",
    "rating": 0,
    "tag": "",
    "team_id": 0,
    "wins": 0
  }
};

export default class SelectedMatchLeft extends Component {

  constructor(props) {
    super(props);
    this.state = {details: this.props.data}
  }

  static defaultProps = {
    dimensions: {w: 1920, h: 1080},
    data: default_
  };

  calculateStyle = () => {
    return {
      width: this.props.dimensions.w / 3.1,
      height: this.props.dimensions.h / 2,
      border: '1px solid white',
      float: 'left'
    }
  };

  render() {
    return (
      <div style={this.calculateStyle()} className='selected-match-left'>
        <div className='team-logo-container-left' style={{width: this.props.dimensions.w / 24}}>
          <img className='team-logo' src={this.props.data.logo_url}/>
        </div>

        <TeamPlayers teamId={this.props.data.team_id} side={'left'}/>
        <TeamMatchHistory teamId={this.props.data.team_id} dimensions={this.props.dimensions} left={true}/>
      </div>
    )
  }

}