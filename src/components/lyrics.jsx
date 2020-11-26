import { useEffect, useState } from 'react';

fetch(" https://orion.apiseeds.com/api/music/lyric/Eminem/Lose yourself"
  // + props.artist + "/" + props.songName
  + "?apikey=gcNODnOj5VuEJKCD98kixEwzNsNTVujeAfBregVPgARsL6tP2uCGSRZZnXXdluGt")
  .then(res => res.json())
  .then(data => console.log(data)
  )


function LyricsText() {

}

function LyricsConnect(props) {
  let serverDataMap =
    [{ key: "result.track.text", value:""},
    { key: "result.artist.name", value:"" },
    { key: "result.track.name", value:"" }];

  let [serverData, setServerData] = useState({serverDataMap})
useEffect(() => {
  fetch(" https://orion.apiseeds.com/api/music/lyric/Eminem/Lose yourself"
    // + props.artist + "/" + props.songName
    + "?apikey=gcNODnOj5VuEJKCD98kixEwzNsNTVujeAfBregVPgARsL6tP2uCGSRZZnXXdluGt")
    .then(res => res.json())
    .then(data => setServerData(data)
    )
}, [])


return (
  <div>
    <p>Du har ramt lyrics</p>
    <label htmlFor="songName">Song name</label>
    <input disabled id="songName" value="Lose yourself"></input>
    <label htmlFor="artistName">Artist</label>
    <input disabled id="arstistName" value=""></input>
    <br></br>
    <textarea readOnly value=""></textarea>
    <p>{serverData.result.artist.name}</p>
  </div>
);
}

export default LyricsConnect;

//{serverData.result.artist.name}