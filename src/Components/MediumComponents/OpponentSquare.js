import React, {Component} from 'react';
import {wins} from '../Helpers/WinTracker';

/**
 * Draws a square for a specific opponent in the match history graph of a team
 */
export default class OpponentSquare extends Component {

  constructor(props) {
    super(props);
    this.w = this.props.dimensions.width;
    this.h = this.props.dimensions.height;
    this.step = this.h / this.props.active / 2;
    this.state = {logo: undefined}
  }

  /**
   * Gets the main team opponent for the match that is shown. The opponent can be either dire or radiant
   * @param q {string} either the name of the opponent or the logo
   * @returns {*}
   */
  getOpponent = (q) => {
    if (this.props.match_info.radiant) {
      return this.props.match_info.match_data.result['dire_' + q];
    }

    return this.props.match_info.match_data.result['radiant_' + q];
  };

  /**
   * calculates the style of the Component (the square) based on the screen resolution.
   * Specifically here, it also calculates the left distance based on the index of the match,
   * the end result being that the last match is shown to the left and the distance
   * from left increases with match history, the 20'th from last match being the farther from left
   * @returns {{width: number, height: number, position: string, left: number, top: *, border: string}}
   */
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

  /**
   * Calculates the position of the Component (the square) from the top of the parent element.
   * If the main team won a game, the square for the specific match should be higher than the previous
   * square, and lower if the main team lost the match, the overall graph representing the history of the team
   * @returns {number}
   */
  calculateTop = () => {
    if (this.props.index === 0) {
      // refresh because re-render causes double sum
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

  /**
   * Calculates the border of the Element (the square) based on the same principles as the {calculateTop}
   * function. Fora win the border is red, for a loss the border is green. The last match played is always
   * blue, the last match is in the center (vertically), being the reference match for the whole graph
   * @returns {string}
   */
  calculateBorder = () => {
    if (this.props.selected === this.props.index) {
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

  /**
   * sums the wins of the main team. It should ensure that the graph does not overflow
   * even if the main team only had wins or loses
   * @returns {number}
   */
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