import { Component } from 'react';
import './Search.css';

export default class Search extends Component {
  state = {
    nameFilter: '',
    sortField: '',
    typeSort: '',
    secondaryTypeSort: '',
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

  handleSecondaryTypeSort = ({ target }) => {
    this.setState({ secondaryTypeSort: target.value });
  }

  render() {
    const { nameFilter, sortField, typeSort, secondaryTypeSort } = this.state;
    const { primaryTypes, secondaryTypes } = this.props;
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
            <option key={item} value={item}> {item} </option>
          ))}  
        </select>

        <select
          name="secondaryTypeSort"
          value={secondaryTypeSort}
          onChange={this.handleSecondaryTypeSort}
        >
          <option value=""> ... secondary type</option>
          {secondaryTypes.map(item => (
            <option key={item} value={item}> {item} </option>
          ))}  
        </select>
        <button>👀</button>
      </form>
    );
  }

}