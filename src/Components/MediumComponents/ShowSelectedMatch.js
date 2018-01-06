import React, {Component} from 'react';
import DetailsSingleTeam from '../SmallComponents/DetailsSingleTeam';
import provider from '../Helpers/RequestProvider';


/**
 * Shows details (at the bottom of the screen) about the selected match
 */
export default class ShowSelectedMatch extends Component {

  constructor() {
    super();
    this.state = {allHeroes: []}
  }

  componentDidMount() {
    this.getData('allHeroes')
  }

  getData = (id_) => {
    provider('allHeroes', id_ + 'allHeroes', '/API/?query=hero_stats&id=1' + id_, (res) => {
      this.setState(res);
    });
  };

  calculateStyle = () => {
    return {
      position: 'absolute',
      width: this.props.dimensions.width,
      height: this.props.dimensions.height,
      border: '1px solid red',
      top: this.props.dimensions.height + 10
    }
  };

  showTeams = () => {
    if (this.state.allHeroes.length > 0) {
      let team1Picks = [];
      let team1Bans = [];
      let team2Picks = [];
      let team2Bans = [];

      // last minor (5 to 7 of January) was not Captain's mode
      // but Captain's draft, so no ban and picks.
      if (this.props.data.match_data.result.picks_bans) {
        this.props.data.match_data.result.picks_bans.map((e) => {

          if (e.is_pick) {
            e['hero_data'] = this.getHeroDataById(e.hero_id);
            e['player_data'] = this.getRespectivePlayerByHeroId(e.hero_id);
          }
          if (e.team === 0) { // team 1
            if (e.is_pick) {
              team1Picks.push(e);
            } else {
              team1Bans.push(e);
            }
          } else {
            if (e.is_pick) {
              team2Picks.push(e);
            } else {
              team2Bans.push(e);
            }
          }
        });
      }

      return (
        <div>
          <DetailsSingleTeam
            picks={team1Picks}
            bans={team1Bans}
            data={this.props.data}
            t={0}
            opponent={this.props.opponent}
          />
          <DetailsSingleTeam
            picks={team2Picks}
            bans={team2Bans}
            data={this.props.data}
            t={1}
            opponent={this.props.opponent}
          />
        </div>
      )
    }

  };

  getHeroDataById = (id) => {
    for (let i = 0; i < this.state.allHeroes.length; i++) {
      if (this.state.allHeroes[i].hero_id === id) {
        return this.state.allHeroes[i];
      }
    }
  };

  getRespectivePlayerByHeroId = (id) => {
    for (let i = 0; i < this.props.data.match_data.result.players.length; i++) {
      if (this.props.data.match_data.result.players[i].hero_id === id) {
        return this.props.data.match_data.result.players[i];
      }
    }
  };

  identifyTeam = (radiant) => {
    if (this.props.data.radiant && radiant) {
      return true;
    }
    if (this.props.data.radiant && !radiant) {
      return false;
    }
    if (!this.props.data.radiant && radiant) {
      return false;
    }
    if (!this.props.data.radiant && !radiant) {
      return true;
    }
  };

  showTeamLogo = () => {
    return (
      <div className='team-logo-match-details-container'>
        <img src={this.props.data.match_data.result.dire_logo}
             style={{
               left: this.identifyTeam(false) ? 0 : null,
               right: this.identifyTeam(false) ? null : 0
             }}
        />
        <img src={this.props.data.match_data.result.radiant_logo}
             style={{
               left: this.identifyTeam(true) ? 0 : null,
               right: this.identifyTeam(true) ? null : 0
             }}
        />
      </div>
    )
  };

  showVS = () => {
    return (
      <div className='show-selected-match-versus'>
        VS
      </div>
    )
  };

  showScore = () => {
    return (
      <div className='score-match-details-container'>
        <div
          style={{
            left: this.identifyTeam(false) ? 0 : null,
            right: this.identifyTeam(false) ? null : 0,
            width: '50%'
          }}
        >
          {this.identifyTeam(false) ?
            this.props.data.match_data.result.dire_score :
            this.props.data.match_data.result.radiant_score}
        </div>

        <div
          style={{
            left: this.identifyTeam(true) ? 0 : null,
            right: this.identifyTeam(true) ? null : 0,
            width: '50%'
          }}
        >
          {this.identifyTeam(false) ?
            this.props.data.match_data.result.radiant_score :
            this.props.data.match_data.result.dire_score}
        </div>
      </div>
    )
  };

  render() {
    return (
      <div className='selected-match-details-container' style={this.calculateStyle()}>
        {this.showTeams()}
        {this.showTeamLogo()}
        {this.showVS()}
        {this.showScore()}
      </div>
    )
  }

}