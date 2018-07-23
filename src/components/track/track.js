import React from 'react';
import './track.css';

export class Track extends React.Component {

  constructor(props){
    super(props);
    this.addTrack=this.addTrack.bind(this);
    this.removeTrack=this.removeTrack.bind(this);
  }

  // send track back to app.js to add to playlist
  addTrack(){
    //console.log(this.props.track.name);
    this.props.onAdd(this.props.track);
  }

  //send track back to app.js to remove from playlist
  removeTrack(){
    //console.log(this.props.track.id);
    this.props.onRemove(this.props.track);
  }

  // determine whether to put + or - next to
  // track and associate the appropriate action
  renderAction(isRemoval){
    if(isRemoval==='true'){
      return <a className='Track-action' onClick={this.removeTrack}>-</a>;
    } else {
      return <a className='Track-action' onClick={this.addTrack}>+</a>;
    }
  }



  render() {
    let isRemoval=this.props.isRemoval;
    //console.log(`here is key ${isRemoval}`);

    return(
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        {this.renderAction(isRemoval)}
      </div>
    );

  }

}
