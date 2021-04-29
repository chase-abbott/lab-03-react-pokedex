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
    primaryTypes: [],
    secondaryTypes: [],
    search: ''
  }

  componentDidMount(){
    this.getPokemon();
  }

  async getPokemon() {
    const { search } = this.state;
    const response = await request
      .get(POKEMON_API_URL)
      .query({ pokemon : search });
    const primaryTypes = [...new Set(response.body.results.map(p => p.type_1))];
    const secondaryTypes = [...new Set(response.body.results.map(p => p.type_2))];
   
    this.setState({ pokemon: response.body.results, primaryTypes: primaryTypes, secondaryTypes: secondaryTypes });
  }
  
  // handleSearch = ({ sortField, typeSort, secondaryTypeSort }) => {
    
  //   const { pokemon } = this.state;
  //   const newData = pokemon
  //     .filter(item => {
  //       return !typeSort || item.type_1 === typeSort;
  //     })
  //     .filter(item => {
  //       return !secondaryTypeSort || item.type_2 === secondaryTypeSort;
  //     })
  //   // height and attack work, not types because [sortField] is different than data
  //   // solution may be to map to a new array
  //     .sort((a, b) => a[sortField] - b[sortField]);
      
  //   this.setState({ pokemon: newData });
  // }

  handleSearch = ({ search, sortField, typeSort, secondaryTypeSort }) => {
    const { pokemon } = this.state;
    const newData = pokemon
      .filter(item => {
        return !typeSort || item.type_1 === typeSort;
      })
      .filter(item => {
        return !secondaryTypeSort || item.type_2 === secondaryTypeSort;
      })
    // height and attack work, not types because [sortField] is different than data
    // solution may be to map to a new array
      .sort((a, b) => a[sortField] - b[sortField]);
    
    // this.setState({ pokemon: newData });
    this.setState(
      { search : search, pokemon : newData },
      // () => this.getPokemon(),
    );


  }
    
  render() {
    const { pokemon, primaryTypes, secondaryTypes } = this.state;
      
    return (
      <div className="App">
        <Header/>
        <Search 
          primaryTypes={primaryTypes} 
          secondaryTypes={secondaryTypes}
          onSearch={this.handleSearch}
        />
        <main>
          {pokemon && (pokemon.length
            ? <PokeList pokemon={pokemon}/> 
            : <p> Sorry! That doesn't exist</p>
          )}
        </main>
        <Footer/>
      </div>
    );
  }

}

export default App;
