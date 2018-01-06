import React, {Component} from 'react';
import DrawHistoryBetween from './DrawHistoryBetween';
import provider from '../Helpers/RequestProvider';

export default class HistoryBetween extends Component {

  constructor(props) {
    super(props);
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
    provider('history', 'history' + id1 + id2, '/API/?query=matches_between&id1=' + id1 + '&id2=' + id2, (res) => {
      this.setState(res);
    });
  };

  calculateStyle = () => {
    return {
      width: this.props.dimensions.w / 8,
      height: this.props.dimensions.h / 2,
    }
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