import { Component } from 'react';
import './Footer.css';

export default class Footer extends Component {
  
  render() {
    return (
      <footer className="Footer">
        <h6>
            Gotta catch 'em all
        </h6>
        <label>
          Items per page
          <select>
            <option value="10"> 10 </option>
            <option value="25"> 25 </option>
            <option value="50"> 50</option>
            <option value="100"> 100</option>
          </select>
        </label>
      </footer>
    );
  }

}
