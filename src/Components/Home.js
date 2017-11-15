import React, { Component } from 'react';
import './App.css';

import Team from './SmallComponents/Team';
import Upcoming from './SmallComponents/Upcoming';
import {path} from "./SmallComponents/Path";
import Provider from "./Provider";

class Home extends Component {

  constructor() {
    super();

    this.u = path;

    this.state = {details: [0]}
  }

  componentDidMount = () => {
    this.getLiveMatches();
  };

  getLiveMatches = () => {
    // fetch(this.u + '/API/matches/')
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((res) => {
    //     this.setState({details: res});
    //   });
    Provider.fetchUrl(this.u + '/API/matches/', this)
  };

  render() {
    return (
      <div className="row">
          <div className="row col-md-10 select-match">
            <Team key={'left-side'} side={'left'} teams={this.state.details[0]}/>
            <Team key={'right-side'} side={'right'} teams={this.state.details[0]}/>
          </div>
        <Upcoming data={this.state.details}/>
      </div>
    );
  }
}

export default Home;