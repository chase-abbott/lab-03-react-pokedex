import { Component } from 'react';
import Header from './Header';
import Search from './Search';
import PokeList from './PokeList';
import Footer from './Footer';
import './App.css';
import React from 'react';
import request from 'superagent';

const POKEMON_API_URL = 'https://pokedex-alchemy.herokuapp.com/api/pokedex';

class App extends Component {

  state = {
    pokemon: [],
  }

  async componentDidMount(){
    const response = await request(POKEMON_API_URL);
    this.setState({ pokemon: response.body.results });
  }

  handleSearch = ({ nameFilter, sortField }) => {
    const pokemonRegex = new RegExp(nameFilter, 'i');

    const { pokemon } = this.state;
    const newData = pokemon
      .filter(item => {
        return !nameFilter || item.pokemon.match(pokemonRegex);
      });
    this.setState({ pokemon: newData });
  }

  render() {
    const { pokemon } = this.state;
    console.log(pokemon);
    return (
      <div className="App">
        <Header/>
        <Search onSearch={this.handleSearch}/>
        <main>
          <PokeList pokemon={pokemon}/>
        </main>
        <Footer/>
      </div>
    );
  }

}

export default App;
