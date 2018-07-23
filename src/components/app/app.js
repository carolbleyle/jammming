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

  addTrack(track){
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)){
        console.log('This track is already in the playlist');
        return;
      }
    let newList=this.state.playlistTracks.concat(track);
    this.setState(
      {
        playlistTracks: newList
      }
    );
  }

  removeTrack(track){

    console.log(track);
    let removeID = track.id;
    console.log(removeID);
    let newList=this.state.playlistTracks.filter(keepTrack => keepTrack.id !== removeID);
    console.log(newList);
    this.setState(
      {
        playlistTracks: newList
      }
    );

  }

  updatePlaylistName(name) {

    console.log(name);
    this.setState(
      {
        playlistName: name
      }
    );
    console.log(JSON.stringify(this.state.playlistName));
  }

  savePlaylist(){
    console.log(this.state.playlistTracks);
    let trackURIs = this.state.playlistTracks.map(element => element.uri);
    console.log(trackURIs);
    console.log(this.state.playlistName);
    Spotify.savePlaylist(trackURIs, this.state.playlistName);
  }

  search(term){
    let newList;
    Spotify.search(term)
    .then(function(data){
      this.setState({searchResults: data});
      console.log(this.state.searchResults);
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
        <div className="SearchBar">
          <input placeholder="Enter A Song, Album, or Artist" />
          <button onClick={Spotify.search}>SEARCH</button>
          <button onClick={Spotify.getAccessToken}>Click</button>
          <button onClick={Spotify.getUserID}>User ID</button>
          <button onClick={Spotify.makePlaylist}>Create new playlist</button>
          <button onClick={Spotify.savePlaylist}>Add to Playlist</button>

          </div>
      </div>
);
}

}


/*
// Get the hash of the url
const hash = window.location.hash
.substring(1)
.split('&')
.reduce(function (initial, item) {
  if (item) {
    var parts = item.split('=');
    initial[parts[0]] = decodeURIComponent(parts[1]);
  }
  return initial;
}, {});
window.location.hash = '';

// Set token
let _token = hash.access_token;

const authEndpoint = 'https://accounts.spotify.com/authorize';

// Replace with your app's client ID, redirect URI and desired scopes
const clientId = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
const redirectUri = 'http://localhost:8888';
const scopes = [
  'user-read-birthdate',
  'user-read-email',
  'user-read-private'
];

// If there is no token, redirect to Spotify authorization
if (!_token) {
  window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token`;
}
*/
