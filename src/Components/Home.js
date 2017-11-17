import React, { Component } from 'react';
import './App.css';

import Team from './SmallComponents/Team';
import Upcoming from './SmallComponents/Upcoming';
import {path} from "./SmallComponents/Path";
import Provider from "./Provider";

/**
 * mai Component responsible with retrieving the
 * 'live and upcoming matches'. Most of the functionality is
 * based on the result of this.
 */
class Home extends Component {

  constructor() {
    super();
    this.u = path;
    this.state = {details: [0], active: 0}
  }

  componentDidMount = () => {
    this.getLiveMatches();
  };

  getLiveMatches = () => {
    Provider.fetchUrl(this.u + '/API/matches/', this)
  };

  changeActive = (active) => {
    this.setState({active: active})
  };

  render() {
    return (
      <div className="row">
          <div className="row col-md-10 select-match">
            <Team key={'left-side'} side={'left'} teams={this.state.details[this.state.active]}/>
            <Team key={'right-side'} side={'right'} teams={this.state.details[this.state.active]}/>
          </div>
        <Upcoming data={this.state.details} changeActive={this.changeActive}/>
      </div>
    );
  }
}

export default Home;