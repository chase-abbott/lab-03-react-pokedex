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
    primaryTypes: []
  }


  componentDidMount(){
    this.getPokemon();
  }

  
  async getPokemon() {
    const response = await request(POKEMON_API_URL);
    const primaryTypes = [...new Set(response.body.results.map(p => p.type_1))];
   
    this.setState({ pokemon: response.body.results, primaryTypes: primaryTypes });
  }
  
  handleSearch = ({ nameFilter, sortField, typeSort }) => {
    const pokemonRegex = new RegExp(nameFilter, 'i');
    
    const { pokemon } = this.state;
    const newData = pokemon
      .filter(item => {
        return !nameFilter || item.pokemon.match(pokemonRegex);
      })
      .filter(item => {
        console.log(item);
        return !typeSort || item.type_1 === typeSort;
      })
    // height and attack work, not types because [sortField] is different than data
    // solution may be to map to a new array
      .sort((a, b) => a[sortField] - b[sortField]);
      
    this.setState({ pokemon: newData });
  }
    
  render() {
    const { pokemon, primaryTypes } = this.state;
      
    return (
      <div className="App">
        <Header/>
        <Search primaryTypes={primaryTypes} onSearch={this.handleSearch}/>
        <main>
          <PokeList pokemon={pokemon}/>
        </main>
        <Footer/>
      </div>
    );
  }

}

export default App;
