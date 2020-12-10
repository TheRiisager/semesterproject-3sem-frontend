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
  const [trackInfoState, setTrackInfoState] = useState(initTrackInfo)
//let trackInfoState = initTrackInfo;
useEffect(() => {
  setInterval( () => {
    console.log(trackInfoState)
    if(!(trackInfoState.trackid === "DUMMY")){
      fetchInfoWithID(trackInfoState.trackid)
    console.log("1 Track ID: " + trackInfoState.trackid)
    } else {
      facade.getTrackInfo()
      .then(data => setTrackInfoState(data))
      .then(console.log(trackInfoState))
    console.log("2 Track ID: " + trackInfoState.trackid)
    }
  },2000)

  return () => {
    clearInterval();
  }

},[])

const fetchInfoWithID = async (trackid) => {
  facade.getTrackInfo(trackInfoState.trackid)
  //.then(data => setTrackInfoState(data))
}

const fetchInfo = async () => {
  facade.getTrackInfo()
  .then(data => console.log(data))
}


return (
  <div>
    <p>Du har ramt lyrics</p>
    <label htmlFor="songName">Song name</label>
    <input disabled id="songName" value={trackInfoState.trackname}></input>
    <br></br>
    <label htmlFor="songLength">Song length</label>
    <input disabled id="songLength" value={trackInfoState.tracklength}></input>
    <label htmlFor="songPos">Song position</label>
    <input disabled id="songPos" value={trackInfoState.trackpos}></input>
    <br></br>
    <label htmlFor="artistName">Artist</label>
    <input disabled id="arstistName" value={trackInfoState.artistname}></input>
    <label htmlFor="albumName">Album</label>
    <input disabled id="albumName" value={trackInfoState.albumname}></input>
    <br></br>
    <textarea readOnly value={trackInfoState.lyrics}></textarea>
    <p></p>
  </div>
);
}

export default LyricsConnect;
