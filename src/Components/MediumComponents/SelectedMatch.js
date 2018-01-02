import React, {Component} from 'react';
import SelectedMatchLeft from "../SmallComponents/SelectedMatchLeft";
import SelectedMatchRight from "../SmallComponents/SelectedMatchRight";
import HistoryBetween from "../SmallComponents/HistoryBetween";
import WinChances from "../SmallComponents/WinChances";

const default_ = {
  "left": {
    "last_match_time": 0,
    "logo_url": "https://i.imgur.com/5gO7P9B.png",
    "losses": 0,
    "name": "",
    "rating": 0,
    "tag": "",
    "team_id": 0,
    "wins": 0
  },
  "right": {
    "last_match_time": 0,
    "logo_url": "https://i.imgur.com/5gO7P9B.png",
    "losses": 0,
    "name": "",
    "rating": 0,
    "tag": "",
    "team_id": 0,
    "wins": 0
  },
  "status": ""
};

export default class SelectedMatch extends Component {

  constructor(props) {
    super(props);
    this.style = this.setStyle();

    this.state = {details: default_};
  }

  static defaultProps = {
    dimensions: {w: 1920, h: 1080},
    activate: undefined
  };

  setStyle = () => {
    let w = this.props.dimensions.w;
    let h = this.props.dimensions.h;
    return {
      width: w - w / 5,
      height: h - h / 2,
      float: 'left'
    }
  };

  changeDetails = (e) => {
    this.setState({details: e})
  };

  componentDidMount() {
    this.props.activate(this.changeDetails)
  }

  showWinChances = () => {
    if(this.state.details.left.team_id !== 0) {
      return <WinChances left={this.state.details.left} right={this.state.details.right}
                         dimensions={this.props.dimensions}/>
    }
  };

  render() {
    return (
      <div className='select-match' style={this.style}>
        <SelectedMatchLeft data={this.state.details.left} dimensions={this.props.dimensions}/>
        <HistoryBetween
          data={{
            l: this.state.details.left.team_id,
            r: this.state.details.right.team_id,
          }}
          teams={[
            {
              team_id: this.state.details.right.team_id,
              position: 'right',
              data: this.state.details.right
            },
            {
              team_id: this.state.details.left.team_id,
              data: this.state.details.left,
              position: 'left'
            }
          ]}
          dimensions={this.props.dimensions}/>
        <SelectedMatchRight data={this.state.details.right} dimensions={this.props.dimensions}/>
        {this.showWinChances()}
      </div>
    )
  }

}