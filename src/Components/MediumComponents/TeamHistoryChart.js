import React, {Component} from 'react';
import OpponentSquare from "./OpponentSquare";

export default class TeamHistoryChart extends Component {

  constructor() {
    super();
    this.state = {active: 20};
  }

  drawSquares = () => {
    let data = this.props.data;
    if (data.length > this.state.active) {
      data = data.slice(0, this.state.active);
    }
    return data.map((e, i) => {
      return <OpponentSquare
        key={Math.random()}
        match_info={e}
        dimensions={this.props.dimensions}
        index={i}
        active={this.state.active}
        team_id={this.props.team_id}
      />
    })

  };

  slide = (e) => {
    this.setState({active: e.target.value})
  };

  render() {
    console.log(this.props.children);
    return (
      <div
        style={this.props.dimensions}
        className='chart-container'
      >
        {this.drawSquares()}
        <input type='range' min='2' max='20' value={this.state.value} onChange={this.slide}/>
      </div>
    )
  }

}