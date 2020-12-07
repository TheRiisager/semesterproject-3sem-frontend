import settings from '../settings.json'
import decoder from './jwtDecoder';

const URL = settings.URL;

const handleHttpErrors = (res) => {
    if (!res.ok) {
      return Promise.reject({ status: res.status, fullError: res.json() })
    }

    return res.json();
}


function apiFacade(){

    const makeOptions = (method,addToken,body) =>{
        var opts = {
          method: method,
          headers: {
            "Content-type": "application/json",
            'Accept': 'application/json',
          }
        }
        if (addToken && getToken != null){
          opts.headers["x-access-token"] = getToken();
        }
        if (body) {
          opts.body = JSON.stringify(body);
        }
        return opts;
      }
    
    const fetchUserData = (role) => {
      const options = makeOptions("GET", true);
      return fetch(URL + "/api/info/" + role, options)
      .then(handleHttpErrors)
      .catch(err => console.log("fetch request to info endpoint failed: " + err.status));
    }

    const setToken = (token) => {
        localStorage.setItem("jwtToken", token)
    }
    
    const getToken = () => {
        return localStorage.getItem("jwtToken")
    }

    const doLogin = (user, pass, setIsLoggedIn, setRoles, setLoginError, setIsSpotifyConnected) => {
        const options = makeOptions("POST",false,{username: user, password: pass});
        fetch(URL + "/api/login", options)
        .then(handleHttpErrors)
        .then(res => {
            setToken(res.token);
            setRoles(res.roles.split(","));
            setIsLoggedIn(true);
            setIsSpotifyConnected( decoder.getPayload(res.token).hasSpotify )
        })
        .catch(err => {
            console.log("fetch request to login endpoint failed: " + err.status);
            if(setLoginError){
              setLoginError("Failed to login");
            }
        });
    }

    const logOut = (setIsLoggedIn, setRoles) => {
      localStorage.removeItem("jwtToken");
      setRoles([]);
      setIsLoggedIn(false);
    }

    const sendSpotifyCode = (code) => {
      const options = makeOptions("POST",true,{code: code});
      fetch(URL + "/api/spotify/auth", options)
    }

    const getTrackInfo = (trackid) => {
      let options = makeOptions("GET",true)
      if(trackid){
        options = makeOptions("GET",true,{trackid: trackid})
      }
      return fetch(URL + "/api/spotify/trackinfo",options)
      .then(handleHttpErrors)
      .catch(err => console.log("Request to trackinfo endpoint failed:" + err.status))
      
    }

    return{
        doLogin,
        setToken,
        getToken,
        logOut,
        fetchUserData,
        sendSpotifyCode,
        getTrackInfo
    }
        
    
}
const facade = apiFacade();
export default facade;