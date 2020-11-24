import { useEffect } from "react";
import facade from "./apiFacade";


const SpotifyLogin = (props) => {
    const setIsSpotifyConnected = props.setIsSpotifyConnected;
    let loginWindow;

    const openSpotifyLogin = (event) => {
        event.preventDefault();
        const url = "https://accounts.spotify.com/authorize?client_id=f382ba93a1794be4b700ddcbf6bfe068&response_type=code&redirect_uri=http://localhost:3000/&scope=user-read-currently-playing user-modify-playback-state user-read-playback-state"
        loginWindow = window.open(url, "log in to spotify",
            "titlebar=no," +
            "toolbar=no," +
            "menubar=no," +
            "status=no," +
            "width=600" +
            "height=200"
            );

        setInterval(() => {
            try{
                if(loginWindow.location.href != url && loginWindow.location.href){
                    const urlParams = new URLSearchParams(loginWindow.location.href)
                    const code = urlParams.get('http://localhost:3000/?code');
                    facade.sendSpotifyCode(code);
                    loginWindow.close();
                    clearInterval();
                    setIsSpotifyConnected(true);
                }
            } catch (error) {}
            
        }, 500);
    }

    return (
        <div>
            <p>You have not connected your Spotify account.</p>
            <p>Please connect your Spotify account to use our app</p>

            <button onClick={openSpotifyLogin}>Connect to Spotify</button>
        </div>
    )
}

export default SpotifyLogin;