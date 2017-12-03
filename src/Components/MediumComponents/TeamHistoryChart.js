import React, {Component} from 'react';
import OpponentSquare from "./OpponentSquare";
import ShowSelectedMatch from "./ShowSelectedMatch";
import {path} from "../SmallComponents/Path";

export default class TeamHistoryChart extends Component {

  constructor() {
    super();
    this.u = path;
    this.state = {active: 20, selected: 0, cached: false};
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
        setSelected={this.setSelected}
        selected={this.state.selected}
      />
    })

  };

  slide = (e) => {
    this.setState({active: e.target.value});
  };

  showSelectedMatch = () => {

    /**
     * opponent is actually the main team, not going to change the whole chain..
     */

    return <ShowSelectedMatch
      key={Math.random}
      data={this.props.data[this.state.selected]}
      left={this.props.left}
      dimensions={this.props.dimensions}
      opponent={this.props.team_id}
    />
  };

  setSelected = (n) => {
    this.setState({selected: n})
  };

  render() {
    return (
      <div>
        <div
          style={this.props.dimensions}
          className='chart-container'
        >
          {this.drawSquares()}
          <input type='range' min='2' max='20' value={this.state.active} onChange={this.slide}/>
        </div>
        <div className='selected-match-details'>
          {this.showSelectedMatch()}
        </div>
      </div>
    )
  }

}