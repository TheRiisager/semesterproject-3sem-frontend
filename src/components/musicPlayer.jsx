import { useEffect, useState } from 'react';
import facade from './apiFacade';

function musicPlayer() {



return (

    <div> <button onClick={facade.Play}>Play</button>
    <button onClick={facade.Pause}>Pause</button>
    <button onClick={facade.NextSong}>Next</button>
     <button onClick={facade.PreviousSong}>Previous</button>
     </div>


)
   

}


export default musicPlayer;