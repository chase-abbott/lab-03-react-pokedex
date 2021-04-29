import { Component } from 'react';
import Header from './Header';
import Search from './Search';
import PokeList from './PokeList';
import Footer from './Footer';
import './App.css';
import React from 'react';
import request from 'superagent';

const POKEMON_API_URL = 'https://pokedex-alchemy.herokuapp.com/api/pokedex?perPage=50';

class App extends Component {

  state = {
    pokemon: [],
    permanentPokemon: [],
    primaryTypes: [],
    secondaryTypes: [],
    search: '',
    sortDirection: 'asc',
    sortParameter: 'pokemon'
  }

  componentDidMount(){
    this.getPokemon();
  }

  async getPokemon() {

    const response = await request
      .get(POKEMON_API_URL);

    const primaryTypes = [...new Set(response.body.results.map(p => p.type_1))];
    const secondaryTypes = [...new Set(response.body.results.map(p => p.type_2))];
  
    this.setState({ pokemon: response.body.results,
      primaryTypes: primaryTypes,
      secondaryTypes: secondaryTypes, 
      permanentPokemon : response.body.results });
  }

  async sortPokemon() {
    const { search, sortDirection, sortParameter } = this.state;
    const response = await request
      .get(POKEMON_API_URL)
      .query({ sort : sortParameter, direction : sortDirection, pokemon : search });

    this.setState({ pokemon : response.body.results });
  }

  handleSearch = ({ search, sortField, typeSort, secondaryTypeSort }) => {
    // const { permanentPokemon } = this.state;
    // const newData = permanentPokemon
    //   .sort((a, b) => {
    //     if (a[sortField] < b[sortField]) return -1;
    //     if (a[sortField] > b[sortField]) return 1;
    //     return 0;
    //   });
    // this.sortPokemon();
    
    //   .filter(item => {
    //     return !typeSort || item.type_1 === typeSort;
    //   })
    //   .filter(item => {
    //     return !secondaryTypeSort || item.type_2 === secondaryTypeSort;
    //   })
    // // height and attack work, not types because [sortField] is different than data
    // // solution may be to map to a new array
    
    // this.setState({ pokemon: newData });
    console.log(sortField);
    this.setState(
      { search : search, sortParameter : sortField },
      () => this.sortPokemon(),
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
