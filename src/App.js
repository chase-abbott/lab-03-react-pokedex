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
    search: '',
    sortDirection: 'asc',
    sortParameter: '',
    type_1Sort: '',
    type_2Sort: '',
    page: 1,
    itemsPerPage: 25,
  }

  componentDidMount(){
    this.getPokemon();
    this.getTypes();
  }

  async getPokemon() {
    const { page, itemsPerPage } = this.state;

    const response = await request
      .get(POKEMON_API_URL)
      .query({ page : page,
        perPage: itemsPerPage });

    this.setState({ pokemon: response.body.results });
  }

  async getTypes() {
    const response = await request
      .get(POKEMON_API_URL)
      .query({ perPage: 801 });

    const primaryTypes = [...new Set(response.body.results.map(p => p.type_1))];
    const secondaryTypes = [...new Set(response.body.results.map(p => p.type_2))];

    const sortedPrimaryTypes = primaryTypes.sort((a, b) => {
      if (a[0] > b[0]) return 1;
      if (a[0] < b[0]) return -1;
      return 0;
    });
   
    const sortedSecondaryTypes = secondaryTypes.sort((a, b) => {
      if (a[0] > b[0]) return 1;
      if (a[0] < b[0]) return -1;
      return 0;
    });
   
    this.setState({ primaryTypes : sortedPrimaryTypes, secondaryTypes : sortedSecondaryTypes });
  }

  async sortPokemon() {
    const { search, 
      sortDirection, 
      sortParameter, 
      type_1Sort, 
      type_2Sort,
      page,
      itemsPerPage,
    } = this.state;

    const response = await request
      .get(POKEMON_API_URL)
      .query({ sort : sortParameter,
        type_1 : type_1Sort,
        type_2: type_2Sort, 
        direction : sortDirection, 
        pokemon : search,
        page: page,
        perPage: itemsPerPage
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
        page: 1
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

  handleItemsPerPage = ({ items }) => {
    this.setState({ itemsPerPage : items },
      () => this.sortPokemon()
    );
  }
    
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
        <Footer onPageNumberChange={this.handleItemsPerPage}/>
      </div>
    );
  }

}

export default App;
