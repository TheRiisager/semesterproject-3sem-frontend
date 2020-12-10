import { useEffect, useState } from 'react';
import facade from './apiFacade';
import LyricsConnect from './lyrics';
import SpotifyLogin from './spotifyLogin';

const UserPage = (props) => {
    
    const roles = props.roles;
    const isSpotifyConnected = props.isSpotifyConnected;
    const setIsSpotifyConnected = props.setIsSpotifyConnected;

    const initServerData = {
        msg: "loading.."
    }
    const [serverData, setServerData] = useState(initServerData);

    useEffect(() => {
        const role = roles.includes("admin") ? "admin" : "user";
        facade.fetchUserData(role)
        .then(data => setServerData(data));
    },[])

    return (
        <div>
            <LyricsConnect></LyricsConnect>
            <SpotifyLogin setIsSpotifyConnected={setIsSpotifyConnected}/>
        </div>
    )
}

export default UserPage;