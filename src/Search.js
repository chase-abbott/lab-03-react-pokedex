import { Component } from 'react';
import './Search.css';

export default class Search extends Component {
  state = {

  }

  handleSubmit = ({ target }) => {

  }

  render() {
    return (
      <form 
        className="Search"
        onSubmit={this.handleSubmit}>
        <input></input>
        <select>
          <option value="">...sort by</option>
          <option value="type"> Type </option>
          <option value="secondary"> Secondary Type</option>
          <option value="attack"> Attack </option>
          <option value="height"> Height </option>
        </select>
        <button>👀</button>
      </form>
    );
  }

}