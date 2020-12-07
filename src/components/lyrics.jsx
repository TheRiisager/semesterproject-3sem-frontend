import { useEffect, useState } from 'react';
import facade from './apiFacade';

function LyricsConnect() {

  const initTrackInfo = {
    trackname: "loading...",
    tracklength: "loading...",
    trackpos: "loading...",
    artistname: "loading...",
    albumname: "loading...",
    trackid: "DUMMY",
    lyrics: "loading..."
  }
let trackInfo = initTrackInfo;

useEffect(() => {
  setInterval( () => {
    console.log(trackInfo.trackid)
    if(!trackInfo.trackid === "DUMMY"){
      facade.getTrackInfo(trackInfo.trackid)
      .then(data => trackInfo = data)
    } else {
      facade.getTrackInfo()
      .then(data => trackInfo = data)
    }
  },500)

  return () => {
    clearInterval();
  }

},[])



//const [trackInfo, setTrackInfo] = useState(initTrackInfo);

return (
  <div>
    <p>Du har ramt lyrics</p>
    <label htmlFor="songName">Song name</label>
    <input disabled id="songName" value={trackInfo.trackname}></input>
    <label htmlFor="artistName">Artist</label>
    <input disabled id="arstistName" value={trackInfo.artistname}></input>
    <br></br>
    <textarea readOnly value={trackInfo.lyrics}></textarea>
    <p></p>
  </div>
);
}

export default LyricsConnect;
