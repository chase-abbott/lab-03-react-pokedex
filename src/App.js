import { Component } from 'react';
import Header from './Header';
import Search from './Search';
import PokeList from './PokeList';
import Footer from './Footer';
import './App.css';
import React from 'react';

class App extends Component {

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
