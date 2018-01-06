import React, {Component} from 'react';
import {path} from '../SmallComponents/Path';
import UpcomingMatch from '../SmallComponents/UpcomingMatch';
import {localCache} from '../Helpers/LocalCache';

/**
 * Component responsible for the upcoming matches (right list)
 */
export default class Upcoming extends Component {

  constructor(props) {
    super(props);
    this.style = this.setStyle();
    this.state = {details: []};

    this.u = path;
  }

  static defaultProps = {
    dimensions: {w: 1920, h: 1080},
    activate: undefined
  };

  setStyle = () => {
    let w = this.props.dimensions.w;
    let h = this.props.dimensions.h;
    return {
      width: w - w / 1.2,
      height: h - h / 1.2,
      float: 'left',
      marginLeft: 10
    }
  };

  getData = () => {
    console.log('fetching upcoming');
    fetch(this.u + '/API/upcoming/')
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        localCache.push({id_: 'upcoming', 'data': res});
        this.setState({details: res});
        this.props.activate(res[0])
      });
  };

  populateUpcoming = () => {
    return this.state.details.map((e, i) => {
      return(
        <UpcomingMatch
          key={Math.random()}
          details={e}
          order={i}
          activate={this.props.activate}/>
      )
    })
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <div className='upcoming' style={this.style}>
        Upcoming
        {this.populateUpcoming()}
      </div>
    )
  }

}