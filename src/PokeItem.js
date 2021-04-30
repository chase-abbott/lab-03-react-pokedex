import { Component } from 'react';
import './PokeItem.css';

export default class PokeItem extends Component {
  
  render() {
    const { monster } = this.props;
    return (
      <a href={monster.pokedex} target="_blank" rel="noreferrer">
        <li className="PokeItem" 
          style= {{
            backgroundColor: `${monster.color_1}`
          }}
          href={monster.pokedex}
        >
          <h2> {monster.pokemon} </h2>
          <img src={monster.url_image} alt={monster.pokemon}></img>
          <h4> Type: {monster.type_1}</h4>
          <h4> Secondary Type: {monster.type_2}</h4>
          <h4> Attack: {monster.attack}</h4>
          <h4> Height: {monster.height}</h4>
        
        </li>
      </a>
    );
  }

}
