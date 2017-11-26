import React, {Component} from 'react';

export default class UpcomingMatch extends Component {

  constructor(){
    super();
  }

  render() {
    return (
      <div className='upcoming-match' onClick={() => this.props.activate(this.props.details)}>
        <img src={this.props.details.left.logo_url} alt='' title={this.props.details.left.name} />
        <img src={this.props.details.right.logo_url} alt='' title={this.props.details.right.name} />
      </div>
    )
  }

}