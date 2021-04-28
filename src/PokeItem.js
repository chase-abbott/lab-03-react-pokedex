import { Component } from 'react';
import './PokeItem.css';

export default class PokeItem extends Component {
  
  render() {
    return (
      <li className="PokeItem">
        <h2> venusaur-mega </h2>
        <img src="http://assets.pokemon.com/assets/cms2/img/pokedex/full/003_f2.png" alt="venusaur-mega"></img>
        <h4> Type: Grass</h4>
        <h4> Secondary Type: Poison</h4>
        <h4> Attack: 100</h4>
        <h4> Height: 24</h4>
        
      </li>
    );
  }

}
