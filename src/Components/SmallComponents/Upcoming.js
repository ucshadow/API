import React, { Component } from 'react';
import SingleUpcomingMatch from './SingleUpcomingMatch';
import {path} from "./Path";
import Provider from "../Provider";

export default class Upcoming extends Component {

  constructor() {
    super();
    this.u = path;
    this.state = {details: [0]}
  }

  componentDidMount() {
    this.getLiveMatches();
  };

  getLiveMatches = () => {
    Provider.fetchUrl(this.u + '/API/matches/', this)
  };

  show = () => {
    return this.state.details.map((e, i) => {
      return(
        <SingleUpcomingMatch key={Math.random()}
                             data={e}
                             changeActive={this.props.act}
                             index={i}
        />
      )
    })
  };

  changeActive = (e) => {
    this.props.act(2);
  };

  render() {
    // console.log(this.props.data);
    return (
      <div className='col-md-2 upcoming row'>
        <div className='col-md-12 upcoming_matches_title'>
          Upcoming matches
        </div>
        <br />
        {this.show()}
      </div>
    )
  }

}