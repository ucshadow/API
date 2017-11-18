import React, {Component} from 'react';
import Team from "./Team";
import Provider from "../Provider";
import {path} from "./Path";

export default class TeamContainer extends Component {

  constructor() {
    super();
    this.u = path;
    this.state = {details: [0], active: 0}
  }

  componentDidMount() {
    this.getLiveMatches();
    this.props.act(this.changeActive)
  };

  getLiveMatches = () => {
    Provider.fetchUrl(this.u + '/API/matches/', this)
  };

  changeActive = (a) => {
    this.setState({active: a})
  };

  render() {
    return (
      <div className="row col-md-10 select-match">
        <Team key={'left-side'} side={'left'} teams={this.state.details[this.state.active]}/>
        <div className='col-md-2 previous_meetings'> </div>
        <Team key={'right-side'} side={'right'} teams={this.state.details[this.state.active]}/>
      </div>
    )
  }
}