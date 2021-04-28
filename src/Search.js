import { Component } from 'react';
import './Search.css';

export default class Search extends Component {
  state = {
    nameFilter: '',
    sortField: '',
  }

  handleSubmit = (e) => {
    e.preventDefault();
  }

  handleNameFilter = ({ target }) => {
    this.setState({ nameFilter: target.value });
  }

  handleSortField = ({ target }) => {
    this.setState({ sortField: target.value });
  }

  render() {
    const { nameFilter, sortField } = this.state;
    return (

      <form 
        className="Search"
        onSubmit={this.handleSubmit}>

        <input
          name="nameFilter"
          value={nameFilter}
          onChange={this.handleNameFilter}
        ></input>

        <select
          name="sortField"
          value={sortField}
          onChange={this.handleSortField}
        >
          <option value="">...sort by</option>
          <option value="type"> Type </option>
          <option value="secondary-type"> Secondary Type</option>
          <option value="attack"> Attack </option>
          <option value="height"> Height </option>
        </select>
        <button>👀</button>
      </form>
    );
  }

}