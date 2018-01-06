import React, {Component} from 'react';
import CacheFunctions from '../Helpers/CacheFunctions';
import ComparisonBarPreparation from './ComparisonBarPreparation';

export default class WinChances extends Component {

  constructor() {
    super();
    this.values = {
      left: {leaderBoard: 0, last20Matches: 0, history: 0, top5Heroes: 0, teamRating: 0, luck: 0},
      right: {leaderBoard: 0, last20Matches: 0, history: 0, top5Heroes: 0, teamRating: 0, luck: 0}
    };
    this.state = {data: 0};
    this.activate();
  }

  activate = () => {
    // retry for cached version every 0.1 seconds
    let interval;
    interval = setInterval(() => {
      let res = this.getCachedData();
      if (res) {
        this.setState({data: this.values});
        clearInterval(interval);
      }
    }, 2000)
  };

  componentWillReceiveProps() {
    this.activate();
  }

  getCachedData = () => {

    let total = 0;

    let leftId = this.props.left.team_id;
    let rightId = this.props.right.team_id;

    // leader board rank
    let leftPlayers = CacheFunctions.getFromCache(leftId);
    let rightPlayers = CacheFunctions.getFromCache(rightId);

    // last 20 matches of each team
    let left20 = CacheFunctions.getFromCache(leftId + 'history');
    let right20 = CacheFunctions.getFromCache(rightId + 'history');

    // history between
    let history = CacheFunctions.getFromCache('history' + leftId + rightId);

    // top 5 heroes win rate for each player
    let heroes = CacheFunctions.getFromCache('allHeroesallHeroes'); // sigh

    // team ratings
    let upcoming = CacheFunctions.getFromCache('upcoming');

    if (leftPlayers && rightPlayers) {
      this.calculateLeaderBoardRank(leftPlayers, rightPlayers);
      total++;
    }

    if(left20 && right20) {
      this.calculateLast20Wins(left20, right20);
      total++;
    }

    if(history) {
      this.calculateLast10Between(history.matches, leftId);
      total++;
    }

    if(heroes) {
      this.values.left.top5Heroes = this.calculateTop5Heroes(leftPlayers, heroes);
      this.values.right.top5Heroes = this.calculateTop5Heroes(rightPlayers, heroes);
      total++
    }

    if(upcoming) {
      this.values.left.teamRating = this.calculateTeamRating(leftId, upcoming);
      this.values.right.teamRating = this.calculateTeamRating(rightId, upcoming);
      total++;
    }

    if(total === 5) {  // cache has all needed data
      return total;
    }
  };

  calculateLeaderBoardRank = (l, r) => {
    let leftLBRank = 0;
    let rightLBRank = 0;
    l.map((e) => {
      leftLBRank += e.player_profile.player.leaderboard_rank;
    });
    r.map((e) => {
      rightLBRank += e.player_profile.player.leaderboard_rank;
    });
    this.values.left.leaderBoard = leftLBRank;
    this.values.right.leaderBoard = rightLBRank;
  };

  calculateLast20Wins = (left20, right20) => {
    let leftWinArr = this.parseHistory(left20);
    let rightWinArr = this.parseHistory(right20);

    this.values.left.last20Matches = this.calculateHistoryScore(leftWinArr);
    this.values.right.last20Matches = this.calculateHistoryScore(rightWinArr);
  };

  calculateLast10Between = (history, leftId) => {
    if (history.length > 10) {
      history = history.slice(0, 10);
    }

    this.parseHistoryBetween(history, leftId)
  };

  parseHistory = (h) => {
    let arr = [];
    h.map((e) => {
      if (e.radiant) {
        if (e.radiant_win) {
          arr.push(1);
        } else {
          arr.push(-1);
        }
      } else {
        if (e.radiant_win) {
          arr.push(-1);
        } else {
          arr.push(1);
        }
      }
    });
    return arr;
  };

  parseHistoryBetween = (arr, left) => {
    // each element in the array should have a score influence directly proportional with
    // the index number, meaning recent matches have a bigger impact in the overall score
    let leftScore = 0;
    let rightScore = 0;
    let impact = 1;
    arr.reverse().map((e) => {
      if (e.won === left) {
        leftScore += impact
      } else {
        rightScore += impact;
      }
      impact *= 1.2;
    });
    this.values.left.history = leftScore;
    this.values.right.history = rightScore;
    // return {left: leftScore, right: rightScore}
  };

  calculateHistoryScore = (arr) => {
    // each element in the array should have a score influence directly proportional with
    // the index number, meaning recent matches have a bigger impact in the overall score
    let impact = 1;
    let score = 0;
    arr.reverse().map((e) => {
      score += e * impact;
      impact *= 1.1;
    });
    return score;
  };

  calculateTop5Heroes = (players, heroes) => {
    let score = 0;
    if(players) {
      players.map((e) => {
        score += this.heroesForSinglePlayer(CacheFunctions.getFromCache(e.player.account_id), heroes)
      });
      return score / 5;
    }
    return 0
  };

  heroesForSinglePlayer = (player, heroes) => {
    let score = 0;
    if(player) {
      player.map((e) => {
        let heroId = e.hero_id;
        let hero = this.getHeroByHeroId(heroId, heroes);
        let pick = hero.pro_pick;
        let win = hero.pro_win;
        score += pick / win;
      });
      return score
    }
    return 0
  };

  getHeroByHeroId = (id, heroes) => {
    for(let hero of heroes) {
      if(hero.hero_id == id) { // no typ, only valu :/
        return hero;
      }
    }
  };

  calculateTeamRating = (id, upcoming) => {
    for(let match of upcoming) {
      if(match.left.team_id == id) { // no typ, only valu :/
        return match.left.rating;
      }
      if(match.right.team_id == id) { // no typ, only valu :/
        return match.right.rating;
      }
    }
  };

  drawBars = () => {
    if(this.getCachedData()) {
      return <ComparisonBarPreparation data={this.state.data}
                            dimensions={this.props.dimensions}
      />
    }
  };

  render() {
    return (
      <div className='win-chances'>
        {this.drawBars()}
      </div>
    )
  }

}