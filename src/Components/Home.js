import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';

import Team from './SmallComponents/Team';
import Upcoming from './SmallComponents/Upcoming';

class Home extends Component {
  render() {
    return (
      <div className="row">

          <div className="row col-md-10 select-match">
            <Team />
          </div>
        <Upcoming />
      </div>
    );
  }
}

export default Home;