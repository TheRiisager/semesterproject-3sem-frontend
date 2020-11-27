import { useEffect, useState } from 'react';

function LyricsConnect(props) {

  let initServerData = {
    result: {
      artist: {
        name: "loading..."
      },
      track: {
        text: "loading...",
        name: "loading..."
      }
    }
  }
const [serverData, setServerData] = useState(initServerData);
useEffect(() => {
  fetch(" https://orion.apiseeds.com/api/music/lyric/"
    + props.artist + "/" + props.songName
    + "?apikey=gcNODnOj5VuEJKCD98kixEwzNsNTVujeAfBregVPgARsL6tP2uCGSRZZnXXdluGt")
    .then(res => res.json())
    .then(data => setServerData(data))
},[])


return (
  <div>
    <p>Du har ramt lyrics</p>
    <label htmlFor="songName">Song name</label>
    <input disabled id="songName" value={serverData.result.track.name}></input>
    <label htmlFor="artistName">Artist</label>
    <input disabled id="arstistName" value={serverData.result.artist.name}></input>
    <br></br>
    <textarea readOnly value={serverData.result.track.text}></textarea>
    <p></p>
  </div>
);
}

export default LyricsConnect;

//{serverData.result.artist.name}