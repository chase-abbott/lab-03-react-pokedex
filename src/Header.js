import { Component } from 'react';
import './Header.css';

export default class Header extends Component {
  
  render() {
    return (
      <header className="Header">
        <img src="./pokeball.png" alt="pokeball"/>
        <h1> Chase's Pokedex </h1>
      </header>
    );
  }

}