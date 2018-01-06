import React, {Component} from 'react';
import './App.css';
import SelectedMatch from "./MediumComponents/SelectedMatch";
import Upcoming from "./MediumComponents/Upcoming";
import CacheFunctions from "./Helpers/CacheFunctions";
import {path} from "./SmallComponents/Path";
import {heroCache} from "./Helpers/HeroCache";

/**
 * main Component responsible with retrieving the
 * 'live and upcoming matches'. Most of the functionality is
 * based on the result of this.
 * The workaround:
 * SelectedMatch and Upcoming are 2 different Components and cannot communicate between them directly.
 * The only thing they share is this Component (Home). The SelectedMatch Component needs info about upcoming
 * matches from the Upcoming Component. This info is used as the state (in the SelectedMatch Component),
 * since the SelectedMatch Component only displays one match at a time.
 * The Upcoming Component is passed a function that updates the state of the SelectedMatch Component.
 * That function is used as a state value in this Component so it will trigger a re-render when the SelectedMatch
 * component has been rendered and the function has been initialised.
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