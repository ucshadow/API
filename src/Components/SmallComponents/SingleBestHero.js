import React, {Component} from 'react';
import provider from "../Helpers/RequestProvider";

export default class SingleBestHero extends Component {

  constructor() {
    super();
    this.state = {hero: undefined};
    this.iconPath = 'http://cdn.dota2.com';
  }

  componentDidMount() {
    this.getData(this.props.hero_id)
  }

  getData = (id_) => {
    provider('hero', id_ + 'hero', '/API/?query=hero&id=' + id_, (res) => {
      this.setState(res);
    });
  };

  showHeroImage = () => {
    return <img style={{width: '100%'}}
                src={this.state.hero ? this.iconPath + this.state.hero.img : 'https://i.imgur.com/5gO7P9B.png'}
                title={this.state.hero ? this.state.hero.localized_name : 'Loading'}/>
  };

  render() {
    return (
      <div className='best-heroes-single-hero'>
        {this.showHeroImage()}
      </div>
    )
  }

}