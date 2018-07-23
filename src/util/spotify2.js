let accessToken;
let playlistID;
let arrayOfTracks = [];
let Spotify = {

  getAccessToken(){
    const clientId='d4fa1d8991464b03bd43ee51eb645265';
    const redirectUri='http://localhost:3000/';
    if (accessToken){
      console.log('Already got one');
      return accessToken;
    }
    if (window.location.href.match(/access_token=([^&]*)/)) {
      let tokenString=window.location.href.match(/access_token=([^&]*)/);
      accessToken=tokenString[1];
      let expireString=window.location.href.match(/expires_in=([^&]*)/);
      let expiration=expireString[1];
      //erase token from history so it doesn't try to use an expired on to authenticate
      window.setTimeout(() => accessToken = '', expiration*1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      console.log('redirecting');
      window.location.href=`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
    }
    },

    search(term){
      console.log(term);
      const accessToken = Spotify.getAccessToken();
      Spotify.getAccessToken();
      console.log(accessToken);
      return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
        {headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      }).then(function(response){
        console.log(response.status);
        return response.json();
      }).then(function(json){
      //  console.log(JSON.stringify(json));
        let tracks=json.tracks.items;
        console.log(tracks.length);
        if (tracks.length>0){
          arrayOfTracks = tracks.map(track => {
            return {
              id: track.id,
              name: track.name,
              artist: track.artists[0].name,
              album : track.album.name,
              uri : track.uri
            };
          });
        }
      //  console.log(arrayOfTracks[1]);
        return arrayOfTracks;
      });
    },

    savePlaylist(trackURIs, playlistName){
      let userID;
      let playlistID;
      const accessToken=Spotify.getAccessToken();
      if (!playlistName || !trackURIs || trackURIs.length === 0) return;

      //get a user ID
      return fetch('https://api.spotify.com/v1/me',
        {headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`
        }}).then(function(response){
        console.log(response.status);
        return response.json();
        }).then(function(json){
          console.log(json);
          userID=json.id;
          console.log(userID);
        })
        // make a playlist on spotify
        .then(function(){
          const data=JSON.stringify(
            {name : name}
            );
            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,
              {
                method: 'POST',
                body: data,
                headers: {
                  Accept: 'application/json',
                  Authorization: `Bearer ${accessToken}`
                }
              })}
              .then(function(response){
                console.log(response.status);
                return response.json();
              }).then(function(json){
                return playlistID=json.id;
                console.log(json);
                console.log(playlistID);
              })
              // add tracks to the playlist
              .then(function(){
                let data=JSON.stringify(
                   {uris: trackURIs}
                  );
                return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,
                  {
                    method: 'POST',
                    body: data,
                    headers: {
                      Accept: 'application/json',
                      Authorization: `Bearer ${accessToken}`
                    }
                  }
                )})
                .then(function(response){
                  console.log(response.status);
                  return response.json();
                });
              }






              /*
                  getUserID: function(){
                    if (accessToken){
                      return fetch('https://api.spotify.com/v1/me',
                        {headers: {
                          Accept: 'application/json',
                          Authorization: `Bearer ${accessToken}`
                        }}).then(function(response){
                        console.log(response.status);
                        return response.json();
                        }).then(function(json){
                          console.log(json);
                          userID=json.id;
                          console.log(userID);
                        });
                      } else {
                        accessToken=Spotify.getAccesstoken
                      }
                  },


                  makePlaylist: function(name){
                    //list = Spotify.search();
                    name = 'test';
                    if (!name) {
                      console.log('No name');
                      return;
                    }
                    const data=JSON.stringify(
                      {name : name}
                    );
                    return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,
                      {
                        method: 'POST',
                        body: data,
                        headers: {
                          Accept: 'application/json',
                          Authorization: `Bearer ${accessToken}`
                        }
                      }).then(function(response){
                        console.log(response.status);
                        return response.json();
                      }).then(function(json){
                        return playlistID=json.id;
                        console.log(json);
                        console.log(playlistID);
                      })
                  },

                  savePlaylist: function(trackURIs, playlistName){

                  //  let trackURIs=arrayOfTracks.map(item => `${item.uri}`);
                  //  console.log(trackURIs);
                  //  let data=JSON.stringify(
                  //    {uris: trackURIs}
                  //  );
                    Promise.all([Spotify.getAccessToken(),Spotify.getUserID(), Spotify.makePlaylist(playlistName)]).
                      then(function(trackURIs){
                        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,
                          {
                            method: 'POST',
                            body: trackURIs,
                            headers: {
                              Accept: 'application/json',
                              Authorization: `Bearer ${accessToken}`
                            }
                          }
                        )}).
                        then(function(response){
                          console.log(response.status);
                          return response.json();
                        });
                      }
                      */
