import React, {Component} from 'react';
import BestHeroes from './BestHeroes';
import provider from '../Helpers/RequestProvider';


export default class PlayerInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {player: this.props.data, heroes: []};
  }

  componentDidMount() {
    this.getData(this.props.data.player.account_id)
  }

  shouldComponentUpdate() {
    return this.state.heroes.length === 0;
  }

  getData = (id_) => {
    provider('heroes', id_, '/API/?query=player_heroes&id=' + id_, (res) => {
      this.setState(res);
    });
  };

  showPlayer = () => {
    //toDo: maybe simplify the JSON??
    if (this.state.player) {
      return (
        <div className='player-info'>
          <img className='player-avatar'
               src={this.state.player.player_profile.player.profile.avatarfull}
               title={this.state.player.player.name}
          />
        </div>
      )
    }
  };

  showBestHeroes = () => {
    return <BestHeroes data={this.state.heroes} account_id={this.props.data.player.account_id} key={Math.random()}/>
  };

  render() {
    return (
      <div className={'avatar-container-' + this.props.side}>
        {this.showPlayer()}
        {this.showBestHeroes()}
      </div>
    )
  }

}