import React, {Component} from 'react';
import './App.css';
import SelectedMatch from "./MediumComponents/SelectedMatch";
import Upcoming from "./MediumComponents/Upcoming";
import CacheFunctions from "./Helpers/CacheFunctions";
import {path} from "./SmallComponents/Path";
import {heroCache} from "./Helpers/HeroCache";

/**
 * mai Component responsible with retrieving the
 * 'live and upcoming matches'. Most of the functionality is
 * based on the result of this.
 */
class Home extends Component {

  constructor() {
    super();
    this.width = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;
    this.height = window.innerHeight
      || document.documentElement.clientHeight
      || document.body.clientHeight;

    this.state={activeFunction: undefined};
    this.u = path;
  }

  shouldComponentUpdate() {
    return !this.state.activeFunction;
  }

  // holly mother of all workarounds!
  addActiveFunction = (f) => {
    this.setState({activeFunction: f})
  };

  componentDidMount() {  // cache hero data
    this.getData();
  }

  getData = () => {
    if (!CacheFunctions.areHeroesCached()) {
      fetch(this.u + '/API/?query=hero_stats&id=1')
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          heroCache.push(res);

        });
    }

  };

  render() {
    return (
      <div className="team_container">
        <SelectedMatch dimensions={{w: this.width, h: this.height}} activate={this.addActiveFunction}/>
        <Upcoming dimensions={{w: this.width, h: this.height}} activate={this.state.activeFunction}/>
      </div>
    );
  }
}

export default Home;