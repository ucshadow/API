import React, {Component} from 'react';

/**
 * Draws the bar responsible for displaying the difference between 2 team properties
 * used in calculating a team's chance to win
 */
export default class ComparisonBar extends Component {

  constructor() {
    super()
  }

  calculateStyle = () => {
    return {
      position: 'absolute',
      height: this.props.dimensions.h / 28,
      width: this.barWidth(),
      background: this.direction() ? '#640342' : '#0e6027',
      left: this.direction() ? this.props.dimensions.w / 7.65 / 2 - 5 - this.barWidth() :
        this.props.dimensions.w / 7.65 / 2 + 5,
      top: (this.props.index * this.props.dimensions.h / 28 + 15) + this.props.index * 5 // space between bars
    }
  };

  direction = () => {
    // if left is bigger than right, direction is to the left
    // returns true if direction is to the left
    if(this.props.data[2] !== 'leaderBoard')  { // on the leader boards smaller number is better
      return this.props.data[0] > this.props.data[1]
    }
    return this.props.data[0] < this.props.data[1]
  };

  barWidth = () => {
    let w = Math.abs(this.props.data[0] - this.props.data[1]);
    while(w > 100) {
      w /= 10;
    }
    return this.props.dimensions.w / 7.65 / 2 * Math.ceil(w) / 100;
  };

  render() {
    return(
      <div className='comparison-bar' style={this.calculateStyle()} title={this.props.data[2]}>

      </div>
    )
  }

}