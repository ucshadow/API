import React, {Component} from 'react';
import UpcomingTeamLeft from "./UpcomingTeamLeft";
import UpcomingTeamRight from "./UpcomingTeamRight";
import UpcomingMatchStatus from "./UpcomingMatchStatus";

export default class SingleUpcomingMatch extends Component {

  render() {
    return (
      <div className='col-md-12 row upcoming_match_row'>
        <UpcomingTeamLeft key={Math.random()} data={this.props.data.left}/>
        <UpcomingTeamRight key={Math.random()} data={this.props.data.right}/>
        <UpcomingMatchStatus key={Math.random()}
                             data={this.props.data.status}
                             changeActive={this.props.changeActive}
                             index={this.props.index}
        />
      </div>
    )
  }

}