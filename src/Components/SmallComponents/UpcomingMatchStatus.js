import React, {Component} from 'react';

export default class UpcomingMatchStatus extends Component {

  constructor() {
    super();
  }

  changeTeam = () => {
    this.props.changeActive(this.props.index)
  };

  render() {
    return (
      <div className='col-md-4 row'>
        <div className='col-md-4 upcoming_match_in'>
          {this.props.data === 'live' ? '' : 'in: '}
        </div>
        <div className='col-md-8 upcoming_match_entry'>
          {this.props.data}
          <button onClick={this.changeTeam} id={'button-' + this.props.index}> Show </button>
        </div>
      </div>
    )
  }

}