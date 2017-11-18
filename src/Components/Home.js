import React, {Component} from 'react';
import './App.css';
import Upcoming from './SmallComponents/Upcoming';
import TeamContainer from "./SmallComponents/TeamContainer";

/**
 * mai Component responsible with retrieving the
 * 'live and upcoming matches'. Most of the functionality is
 * based on the result of this.
 */
class Home extends Component {

  constructor() {
    super();
    this.state = {activeFunction: undefined}
  }

  shouldComponentUpdate() {
    return !this.state.activeFunction;
  }

  // holly mother of all workarounds!
  addActiveFunction = (f) => {
    this.setState({activeFunction: f})
  };

  render() {
    return (
      <div className="row team_container">
        <Upcoming act={this.state.activeFunction}/>
        <TeamContainer act={this.addActiveFunction} />
      </div>
    );
  }
}

export default Home;