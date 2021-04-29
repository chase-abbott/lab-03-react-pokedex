import { Component } from 'react';
import './Search.css';

export default class Search extends Component {
  state = {
    nameFilter: '',
    sortField: '',
    typeSort: '',
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSearch(this.state);
  }

  handleNameFilter = ({ target }) => {
    this.setState({ nameFilter: target.value });
  }

  handleSortField = ({ target }) => {
    this.setState({ sortField: target.value });
  }

  handleTypeSort = ({ target }) => {
    this.setState({ typeSort: target.value });
  }

  render() {
    const { nameFilter, sortField, typeSort } = this.state;
    const { primaryTypes } = this.props;
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
          <option value="attack"> Attack </option>
          <option value="height"> Height </option>
        </select>
        <select
          name="typeSort"
          value={typeSort}
          onChange={this.handleTypeSort}
        >
          <option value=""> ...type</option>
          {primaryTypes.map(item => (
            <option value={item}> {item} </option>
          ))}  
        </select>
        <button>👀</button>
      </form>
    );
  }

}