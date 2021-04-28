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
    pokemon: null,
  }

  async componentDidMount(){
    const response = await request(POKEMON_API_URL);
    console.log(response);
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <Search/>
        <main>
          <PokeList/>
        </main>
        <Footer/>
      </div>
    );
  }

}

export default App;
