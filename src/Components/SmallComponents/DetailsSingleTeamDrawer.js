import React, {Component} from 'react';

export default class DetailsSingleTeamDrawer extends Component {

  constructor(props) {
    super(props);
  }

  showPicks = () => {
    return this.props.picks.map((e, i) => {
      return (
        <div key={Math.random()} style={this.calculateStyle(i)}>
          <div className='show-single-team-player'
               style={{float: !this.areWeTheBadGuys() ? 'right' : 'left'}}>
            {this.showPlayer(i)}
          </div>
          <img src={'http://cdn.dota2.com' + e.hero_data.img}
               className='show-single-team-image'
               style={{float: !this.areWeTheBadGuys() ? 'right' : 'left'}}
          />

        </div>
      )
    })
  };

  showPlayer = (index) => {
    if (this.props.players[index]) {
      return <img style={{width: '100%'}} src={this.props.players[index].avatarfull}/>
    }
    return <img style={{width: '100%'}} src='https://i.imgur.com/5gO7P9B.png'/>
  };

  calculateStyle = () => {
    return {
      width: 220,
      height: 100,  // toDo: change this to match screen dimension!
      border: '1px solid white',
    }
  };

  solveTeamNames = () => {
    let selfId = this.props.players[0].team_id;  // get team id from a player
    return this.props.data.match_data.result.radiant_team_id === selfId ?
      this.props.data.match_data.result.radiant_name : this.props.data.match_data.result.dire_name
  };

  areWeTheBadGuys = () => {
    let selfId = this.props.players[0].team_id;
    return selfId === this.props.opponent;
  };

  render() {
    return (
      <div style={{
        left: this.areWeTheBadGuys() ? 0 : null,
        right: this.areWeTheBadGuys() ? null : 0,
        position: 'absolute'
      }}>
        {this.showPicks()}
        {this.solveTeamNames()}
      </div>
    )
  }

}