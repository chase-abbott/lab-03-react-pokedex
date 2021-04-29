import { Component } from 'react';
import './Search.css';

export default class Search extends Component {
  state = {
    search: '',
    sortField: '',
    typeSort: '',
    secondaryTypeSort: '',
    direction: 'asc',
    page: 1,
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSearch(this.state);
  }

  handleSearch = ({ target }) => {
    this.setState({ search: target.value });
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

  handleDirection = ({ target }) => {
    this.setState({ direction: target.value });
  }

  handlePageForward = () => {
    const { page } = this.state;
    this.setState({ page: (page + 1) });
  }

  handlePageBack = () => {
    const { page } = this.state;
    if (page > 1){
      this.setState({ page: (page - 1) });
    }
  }

  handlePageChange = ({ target }) => {
    this.setState({ page: target.value });
  }



  render() {
    const { sortField, typeSort, secondaryTypeSort, search, direction, page } = this.state;
    const { primaryTypes, secondaryTypes } = this.props;
    return (
      <div className="SearchDiv">

        <form 
          className="Search"
          onSubmit={this.handleSubmit}>

          <input
            name="search"
            value={search}
            onChange={this.handleSearch}
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
            name="direction"
            value={direction}
            onChange={this.handleDirection}
          >
            <option value="asc"> Low to High </option>
            <option value="desc"> High to Low </option>
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
        <div className="PagesDiv">
          <button 
            value="back"
            onClick={this.handlePageBack}
          >⬅</button>

          <input
            value={page}
            onChange={this.handlePageChange}
          ></input>
         
          <button
            value="forward"
            onClick={this.handlePageForward}
          > ➡</button>
        </div>
      </div>

    );
  }

}