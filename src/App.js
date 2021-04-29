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
    sortParameter: '',
    type_1Sort: '',
    type_2Sort: '',
    page: 1,
  }

  componentDidMount(){
    this.getPokemon();
  }

  async getPokemon() {
    const { page } = this.state;

    const response = await request
      .get(POKEMON_API_URL)
      .query({ page : page });

    const primaryTypes = [...new Set(response.body.results.map(p => p.type_1))];
    const secondaryTypes = [...new Set(response.body.results.map(p => p.type_2))];
  
    this.setState({ pokemon: response.body.results,
      primaryTypes: primaryTypes,
      secondaryTypes: secondaryTypes, 
      permanentPokemon : response.body.results });
  }

  async sortPokemon() {
    const { search, 
      sortDirection, 
      sortParameter, 
      type_1Sort, 
      type_2Sort,
      page
    } = this.state;

    const response = await request
      .get(POKEMON_API_URL)
      .query({ sort : sortParameter,
        type_1 : type_1Sort,
        type_2: type_2Sort, 
        direction : sortDirection, 
        pokemon : search,
        page: page
      });

    this.setState({ pokemon : response.body.results });
  }
  

  handleSearch = ({ search, sortField, typeSort, secondaryTypeSort, direction }) => {
    this.setState(
      { search : search, 
        sortParameter : sortField, 
        type_1Sort : typeSort, 
        type_2Sort : secondaryTypeSort,
        sortDirection : direction,
      },
      () => this.sortPokemon(),
    );
  }


  handlePageForward = () => {
    const { page } = this.state;
    this.setState({ page: (page + 1) },
      () => this.sortPokemon()
    );
    
  }

  handlePageBack = () => {
    const { page } = this.state;
    if (page > 1){
      this.setState({ page: (page - 1) },
        () => this.sortPokemon()
      );
    }
  }

  // handlePageChange = ({ target }) => {
  //   this.setState({ page: target.value });
  // }
    
  render() {
    const { pokemon, primaryTypes, secondaryTypes, page } = this.state;
      
    return (
      <div className="App">
        <Header/>
        <Search 
          primaryTypes={primaryTypes} 
          secondaryTypes={secondaryTypes}
          onSearch={this.handleSearch}
          page={page}
          pageForward={this.handlePageForward}
          pageBack={this.handlePageBack}
          pageChange={this.handlePageChange}
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
