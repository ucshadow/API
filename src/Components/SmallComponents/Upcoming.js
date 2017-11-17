import React, { Component } from 'react';
import SingleUpcomingMatch from './SingleUpcomingMatch';

export default class Upcoming extends Component {

  constructor(props) {
    super(props);

  }

  show = () => {
    // console.log('hi from show');
    return this.props.data.map((e, i) => {
      return(
        <SingleUpcomingMatch key={Math.random()}
                             data={e}
                             changeActive={this.props.changeActive}
                             index={i}
        />
      )
    })
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