import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';

class About extends Component {

  constructor() {
    super();

    this.state = {data: []}
  }

  componentDidMount = () => {
    this.getAllData();
  };

  getAllData = () => {
    let url = 'https://api.opendota.com/api/teams/39/matches';
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        this.setState({data: res});
      });
  };

  showData = () => {
    return this.state.data.map((e) => {
      return(
        <div>
          {e.league_name}
        </div>
      )
    })
  };

  render() {
    return (
      <div className="App">
        {this.showData()}
      </div>
    );
  }
}

export default About;