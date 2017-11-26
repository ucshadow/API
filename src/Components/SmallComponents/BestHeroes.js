import React, {Component} from 'react';
import SingleBestHero from "./SingleBestHero";


export default class BestHeroes extends Component {

  constructor(props) {
    super(props);
    this.state = {heroes: this.props.data}
  }

  showSpecificHero = () => {
    if(this.state.heroes.length > 0) {
      return this.state.heroes.slice(0, 3).map((e) => {
        return <SingleBestHero key={Math.random()} hero_id={e.hero_id}/>
      })
    }
  };

  render() {
    return(
      <div>
        {this.showSpecificHero()}
      </div>
    )
  }

}