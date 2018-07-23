import React from 'react';
import './searchresults.css';
import {Tracklist} from '../tracklist/tracklist.js';

export class SearchResults extends React.Component {

  constructor(props){
    super(props);
  //  this.addTrackSR=this.addTrackSR.bind(this);
  }

  //addTrackSR(track){
//    return this.props.onAdd(track);
//  }

  render(){

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
