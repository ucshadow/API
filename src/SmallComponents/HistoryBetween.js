import React, {Component} from 'react';
import {path} from "./Path";
import DrawHistoryBetween from "./DrawHistoryBetween";

export default class HistoryBetween extends Component {

  constructor(props) {
    super(props);
    this.u = path;
    this.state = {history: []}
  }

  static defaultProps = {
    dimensions: {w: 1920, h: 1080},
    data: {}
  };

  componentWillReceiveProps(next) {
    if(next.data.l) {
      this.getData(next.data.l, next.data.r);
    }
  }

  getData = (id1, id2) => {
    fetch(this.u + '/API/?query=matches_between&id1=' + id1 + '&id2=' + id2)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        this.setState({history: res});
      });
  };

  calculateStyle = () => {
    return {
      width: this.props.dimensions.w / 8,
      height: this.props.dimensions.h / 2,
    }
  };

  showData = () => {
    return (
      <div>
        {this.props.data.l} vs {this.props.data.r}
      </div>
    )
  };

  render() {
    return (
      <div className='history-between' style={this.calculateStyle()}>
        <DrawHistoryBetween
          data={this.state.history}
          dimensions={this.calculateStyle()}
          teams={this.props.teams}
        />
      </div>
    )
  }

}