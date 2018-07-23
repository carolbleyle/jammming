import React from 'react';
import './tracklist.css';
import {Track} from '../track/track.js';

export class Tracklist extends React.Component {


    render(){

      let addTracks=this.props.onAdd;
      let results=this.props.results;
      let isRemoval=this.props.isRemoval;

      return(
        <div className="TrackList">
        {
          results.map(track => {
            return (
              <Track track={track} key={track.id} onAdd={addTracks} isRemoval={isRemoval}
              onRemove={this.props.onRemove}/>
            );
          })}
      </div>
      );

    }
}
