import React, { Component } from 'react';

let u = 'http://localhost:5000';


export default class Upcoming extends Component {

  constructor(props) {
    super(props);

  }

  show = () => {
    // console.log('hi from show');
    return this.props.data.map((e) => {
      return(
        <div key={Math.random()}>
          {e.left} vs {e.right} in {e.status}
        </div>
      )
    })
  };

  render() {
    // console.log(this.props.data);
    return (
      <div className="col-md-2 upcoming">
        MATCHES
        <br />
        {this.show()}
      </div>
    )
  }

}