import React from 'react';
import './playlist.css';
import {Tracklist} from '../tracklist/tracklist.js';

export class Playlist extends React.Component {

  constructor(props){
    super(props);
    this.handleNameChange=this.handleNameChange.bind(this);
  }

  handleNameChange(event){
    event.preventDefault();
    console.log(event.target.value);
    this.props.onNameChange(event.target.value);
  }



  render(){
    let playlist=this.props.playlistTracks;
  //  let defaultValue;
  //  if (this.props.playlistName){
//      defaultValue=this.props.playlistName;
//    } else {
//      defaultValue='New Playlist';
//    }

    return(
      <div className="Playlist">
      <input defaultValue="Add a name" type="text" onChange={this.handleNameChange}/>
      <Tracklist results={playlist} onRemove={this.props.onRemove} isRemoval='true'/>
      <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>
    );
  }
}
