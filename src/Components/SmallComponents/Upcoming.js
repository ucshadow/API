import React, { Component } from 'react';

let u = 'http://localhost:5000';


export default class Upcoming extends Component {

  constructor() {
    super();
    this.state = {data: ['placeholder']}
  }

  componentDidMount = () => {
    this.getLiveMatches();
  };

  getLiveMatches = () => {
    fetch(u + '/API/matches/')
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        this.setState({data: res});
      });
  };


  show = () => {
    console.log('hi from show');
    return this.state.data.map((e) => {
      return(
        <div key={Math.random()}>
          {e.left} vs {e.right} in {e.status}
        </div>
      )
    })
  };

  render() {
    return (
      <div className="col-md-2 upcoming">
        MATCHES
        <br />
        {this.show()}
      </div>
    )
  }

}