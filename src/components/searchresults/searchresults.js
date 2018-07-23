import React from 'react';
import './searchresults.css';
import {Tracklist} from '../tracklist/tracklist.js';

export class SearchResults extends React.Component {


  render(){

    // have to give the props value a new variable
    // because props seem to disappear after
    // two levels down
    let results=this.props.searchResults;
    let addTracks=this.props.onAdd;

    return(
      <div className="SearchResults">
      <h2>Results</h2>
      <Tracklist results={results} onAdd={this.props.onAdd} isRemoval="false"/>
      </div>
    );
  }

}
