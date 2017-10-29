import React, { Component } from 'react';


export default class Upcoming extends Component {

  constructor() {
    super();
    this.url = 'http://www.gosugamers.net/dota2';
    this.state = {data: ['placeholder']}
  }

  componentDidMount = () => {

  };

  changeState = (s) => {
    this.setState({data: s})
  };

  show = () => {
    console.log('hi from show');
    return this.state.data.map((e) => {
      return console.log(e)
    })
  };

  render() {
    return (
      <div className="col-md-2 upcoming">
        UPCOMING
        <br />
        {this.state.data[0]}
        {this.show()}
      </div>
    )
  }

}