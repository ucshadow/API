import React, {Component} from 'react';
import TeamWonInfo from './TeamWonInfo';


export default class DrawHistoryBetween extends Component {

  constructor(props){
    super(props);
    this.state = {data: this.props.data, squares: []}
  }

  drawMidLine = () => {
    return (
      <div style={{
        position: 'absolute',
        left: this.props.dimensions.width / 2,
        top: 10,
        width: 2,
        height: this.props.dimensions.height - this.props.dimensions.height / 5.5,
        background: 'pink'
      }}>

      </div>
    )
  };

  addTeams2 = () => {
    if(this.props.data.matches) {

      let arr = this.props.data.matches;
      if(this.props.data.matches.length > 10) {
        arr = arr.slice(0, 10);
      }
      return arr.map((e, i) => {
        return <TeamWonInfo
          team={this.getTeamData(e.won)}
          match={e}
          index={i} key={Math.random()}
          dimensions={this.props.dimensions}
        />
      })

    }
  };

  getTeamData = (team_id) => {
    for(let i = 0; i < this.props.teams.length; i++) {
      if(this.props.teams[i].data.team_id === team_id) {
        return this.props.teams[i];
      }
    }
  };

  render() {
    return (
      <div>
        {this.drawMidLine()}
        {this.addTeams2()}
      </div>
    )
  }

}