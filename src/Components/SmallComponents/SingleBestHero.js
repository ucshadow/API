import React, {Component} from 'react';
import {path} from "./Path";
import CacheFunctions from "../Helpers/CacheFunctions";

export default class SingleBestHero extends Component {

  constructor() {
    super();
    this.state = {hero: undefined};
    this.u = path;
    this.iconPath = 'http://cdn.dota2.com';
  }

  componentDidMount() {
    this.getData(this.props.hero_id)
  }

  getData = (id_) => {
    if (CacheFunctions.areHeroesCached()) {
      this.setState({hero: CacheFunctions.getFromHeroCache(id_)})
    } else {
      fetch(this.u + '/API/?query=hero&id=' + id_)
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          this.setState({hero: res});
        });
    }

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