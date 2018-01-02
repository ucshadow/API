import React, {Component} from 'react';
import ComparisonBar from './ComparisonBar';

export default class ComparisonBarPreparation extends Component {

  constructor() {
    super();
  }

  static defaultProps = {
    data: {left: 0, right: 0},
    dimensions: {h: 1080, w: 1920},
  };

  draw = (arr) => {
    return arr.map((e, i) => {
      return <ComparisonBar key={Math.random()} data={e} index={i} dimensions={this.props.dimensions}/>
    })
  };

  prepareData = () => {
    let arr = [];
    let local = [];
    Object.entries(this.props.data).map((entry) => {
      Object.entries(entry[1]).map((e) => {
        local.push(e)
      })
    });
    local.slice(0, 5).map((e, i) => {
      arr.push([local[i][1], local[i + 6][1], Object.keys(this.props.data.left)[i]])
    });

    // arr[5] = [Math.round(Math.random() * 100), Math.round(Math.random() * 100), 'luck'];
    // no more luck :/

    return arr;
  };

  calculateStyle = () => {
    // console.log(this.props.dimensions);
    return {
      position: 'absolute',
      width: this.props.dimensions.w / 7.65,
      height: this.props.dimensions.h / 3.6,
      top: this.props.dimensions.h / 2,
      left: this.props.dimensions.w / 3.1
    }
  };

  drawLine = () => {
    return (
      <div style={{
        position: 'absolute',
        width: 3,
        height: this.calculateStyle().height / 1.4,
        left: this.calculateStyle().width / 2 - 1,
        top: 10,
        background: 'pink'
      }}>

      </div>
    )
  };

  showChances = (arr) => {
    console.log(arr);
    let leftChances = [];
    let rightChances = [];


    arr.map((e) => {
      this.calculateChances(e, leftChances, rightChances)
    });

    let l = parseFloat(leftChances.reduce((a, b) => {return a + b}, 0)).toFixed(2);
    let r = parseFloat(rightChances.reduce((a, b) => {return a + b}, 0)).toFixed(2);

    return this.displayChances(l, r);
  };

  displayChances = (l, r) => {
    let style = this.calculateStyle();
    style.height = 30;
    style.top = '80%';
    style.left = 0;
    style.textAlign = 'center';

    return <div style={style}> {l} to {r} </div>
  };

  calculateChances = (e, l, r) => {
    //leaderboard rank of each player: 15
    //last 20 matches: 15
    //history between: 20
    //top 3 heroes win rate: 20
    //team rating: 20

    let left = e[0];
    let right = e[1];
    let desc = e[2];
    let dif = Math.abs(left - right);

    while(dif > 100) {  // contract variables
      dif /= 10
    }

    let score = 0;

    if(desc === 'leaderBoard' || desc === 'last20Matches') {
      score = dif * 15 / 100
    } else {
      score = dif * 20 / 100
    }

    if (desc === 'leaderBoard') { // smaller is better
      if(left < right) { // ++ left
        l.push(score)
      } else {
        r.push(score)
      }
    } else { // bigger is better
      if(left > right) { // ++ left
        l.push(score)
      } else {
        r.push(score)
      }
    }
  };

  render() {
    return (
      <div style={this.calculateStyle()}>
        {this.drawLine()}
        {this.draw(this.prepareData())}
        {this.showChances(this.prepareData())} {/* toDo: change this, it's called 2 times */}
      </div>
    )
  }

}