import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';

import Team from './SmallComponents/Team';
import Upcoming from './SmallComponents/Upcoming';

class Home extends Component {

  constructor() {
    super();

    this.u = 'http://localhost:5000';

    this.state = {upcoming: [0]}
  }

  componentDidMount = () => {
    this.getLiveMatches();
  };

  getLiveMatches = () => {
    fetch(this.u + '/API/matches/')
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        this.setState({upcoming: res});
      });
  };

  render() {
    return (
      <div className="row">
          <div className="row col-md-10 select-match">
            <Team key={'left-side'} side={'left'} teams={this.state.upcoming[0]}/>
            <Team key={'right-side'} side={'right'} teams={this.state.upcoming[0]}/>
          </div>
        <Upcoming data={this.state.upcoming}/>
      </div>
    );
  }
}

export default Home;