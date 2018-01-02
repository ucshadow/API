import React, {Component} from 'react';
import {wins} from "../Helpers/WinTracker";

export default class OpponentSquare extends Component {


  constructor(props) {
    super(props);
    this.w = this.props.dimensions.width;
    this.h = this.props.dimensions.height;
    this.step = this.h / this.props.active / 2;
    this.state = {logo: undefined}
  }

  getOpponent = (q) => {
    if (this.props.match_info.radiant) {
      return this.props.match_info.match_data.result['dire_' + q];
    }

    return this.props.match_info.match_data.result['radiant_' + q];
  };

  calculateStyle = () => {
    let top = this.calculateTop();
    return {
      width: this.w / 22,
      height: this.w / 22,
      position: 'absolute',
      left: this.props.index * (this.w / this.props.active),
      top: top,
      border: this.calculateBorder(),
    }
  };

  calculateTop = () => {
    if (this.props.index === 0) {
      // refresh because rerender cause double sum
      if (wins[this.props.team_id].length > 0) {
        wins[this.props.team_id] = [];
      }
      return this.h / 2 - (this.w / 20 / 2)
    }

    // I am radiant
    if (this.props.match_info.radiant) {
      // if radiant wins
      if (this.props.match_info.radiant_win) {
        // I should go up so negative height is added to the array (y axis is decreased, so the box
        // should be higher on the screen)
        wins[this.props.team_id].push(this.step * -1);
        // return middle of the div - half the box size - sum of array
        return this.h / 2 - (this.w / 20 / 2) - this.sumWins();
      }
      // if dire wins I should go down so box height is added to the array
      wins[this.props.team_id].push(this.step);
      return this.h / 2 - (this.w / 20 / 2) - this.sumWins();

    }
    // else I'm dire
    if (this.props.match_info.radiant_win) {
      // I should go down
      wins[this.props.team_id].push(this.step);
      return this.h / 2 - (this.w / 20 / 2) - this.sumWins();
    }
    // else I should go up
    wins[this.props.team_id].push(this.step * -1);
    return this.h / 2 - (this.w / 20 / 2) - this.sumWins();

  };

  calculateBorder = () => {

    if(this.props.selected === this.props.index) {
      return '2px solid white'
    }

    if (this.props.index === 0) {
      return '1px solid blue';
    }

    // I am radiant
    if (this.props.match_info.radiant) {
      // if radiant wins
      if (this.props.match_info.radiant_win) {
        // I should go up so height is added to the array
        return '1px solid green';
      }
      // if dire wins I should go down so negative box height is added to the array
      return '1px solid red'

    }
    // else I'm dire
    if (this.props.match_info.radiant_win) {
      // I should go down
      return '1px solid red'
    }
    // else I should go up
    return '1px solid green'
  };

  sumWins = () => {
    let s = 0;
    wins[this.props.team_id].forEach((e) => {
      s += e;
    });
    return s;
  };

  setSelected = () => {
    this.props.setSelected(this.props.index);
  };

  render() {
    return (
      <div style={this.calculateStyle()} className='history-square' onClick={this.setSelected}>
        <img src={this.getOpponent('logo')}
             title={this.getOpponent('name')}
             style={{width: '100%', height: '100%'}}
        />
      </div>
    )
  }

}