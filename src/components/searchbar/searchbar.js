import React from 'react';
import './searchbar.css';
import {Spotify} from '../../util/spotify.js';

export class SearchBar extends React.Component {

  constructor(props){
    super(props);
    this.state= {
      term: ""
    };
    this.search=this.search.bind(this);
    this.handleTermChange=this.handleTermChange.bind(this);
  }

  // pass the state value for term to the search method
  // in app.js

  search(){
    //this.props.onSearch(this.state.term);
    this.props.onSearch(this.state.term);

    //console.log(newList[1]);
    //console.log('That was it');

  }

  // get value of input into search bar and set it equal to term
  // in this component's state
  handleTermChange(event){
    this.setState(
      { term: event.target.value }
    );
  }

  render() {
    return (
      <div className="SearchBar">
      <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange}/>
      <button onClick={this.search}>SEARCH</button>
      </div>
    );
  }
}
