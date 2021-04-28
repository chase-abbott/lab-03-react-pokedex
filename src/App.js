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

  render() {
    const { pokemon } = this.state;
    console.log(pokemon);
    return (
      <div className="App">
        <Header/>
        <Search/>
        <main>
          <PokeList pokemon={pokemon}/>
        </main>
        <Footer/>
      </div>
    );
  }

}

export default App;
