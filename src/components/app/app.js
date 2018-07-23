import React from 'react';
import './app.css';
import {Spotify} from '../../util/spotify.js';
import {SearchBar} from '../searchbar/searchbar.js';
import {SearchResults} from '../searchresults/searchresults.js';
import {Playlist} from '../playlist/playlist.js';


export class App extends React.Component {

  constructor(props){
    super(props);
    this.state= {searchResults:[],
    playlistName: '',
    playlistTracks: []
    };
    this.addTrack=this.addTrack.bind(this);
    this.removeTrack=this.removeTrack.bind(this);
    this.updatePlaylistName=this.updatePlaylistName.bind(this);
    this.savePlaylist=this.savePlaylist.bind(this);
    this.search=this.search.bind(this);
    }


    //add a new track to the state playlistTracks, then update to the new
    //playlistTracks array
  addTrack(track){
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)){
        //console.log('This track is already in the playlist');
        return;
      }
    let newList=this.state.playlistTracks.concat(track);
    this.setState(
      {
        playlistTracks: newList
      }
    );
  }

    //find a track in the current state playlistTracks array by track.id
    //remove it from the array and update state.playlistTracks array
  removeTrack(track){

    //console.log(track);
    let removeID = track.id;
    //console.log(removeID);
    let newList=this.state.playlistTracks.filter(keepTrack => keepTrack.id !== removeID);
    //console.log(newList);
    this.setState(
      {
        playlistTracks: newList
      }
    );

  }

    //take a name (collected from input element in playlist.js)
    // and update state.playlistName with new name
  updatePlaylistName(name) {

    //console.log(name);
    this.setState(
      {
        playlistName: name
      }
    );
    //console.log(JSON.stringify(this.state.playlistName));
  }

    //use Spotify API to save playlist to Spotify account
  savePlaylist(){
    //console.log(this.state.playlistTracks);
    let trackURIs = this.state.playlistTracks.map(element => element.uri);
    //console.log(trackURIs);
    //console.log(this.state.playlistName);
    Spotify.savePlaylist(trackURIs, this.state.playlistName);
  }

    //take a search term entered into input element in searchbar.js
    //use Spotify API to get list of tracks based on search term
    //then update state.searchResults array to the array returned by Spotify
  search(term){
    let newList;
    Spotify.search(term)
    .then(function(data){
      this.setState({searchResults: data});
      //console.log(this.state.searchResults);
    }.bind(this));
  }

render() {

 return (
   <div>
    <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch={this.search}/>
        <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
          <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}
                    onRemove={this.removeTrack} onNameChange={this.updatePlaylistName}
                    onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }

}
