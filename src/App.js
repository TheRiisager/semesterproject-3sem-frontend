import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import facade from './components/apiFacade';
import Login from './components/login';
import SpotifyLogin from './components/spotifyLogin';
import UserPage from './components/userPage';
import LyricsConnect from './components/lyrics';
import decoder from './components/jwtDecoder';
import musicPlayer from './components/musicPlayer';





function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSpotifyConnected, setIsSpotifyConnected] = useState(false);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    if( facade.getToken() ) {
      let tokenPayload = decoder.getPayload(facade.getToken())
      setIsLoggedIn(true)
      setRoles(tokenPayload.roles.split (","))
      setIsSpotifyConnected(tokenPayload.hasSpotify)
    }
  },[])

  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {roles.includes("user") ?
            <li>
              <Link to="/user">User page</Link>
            </li>
            : ""
          }
          {roles.includes("admin") ?
            <li>
              <Link to="/admin">Admin page</Link>
            </li>
            : ""
          }
          {roles.includes("user") || roles.includes("admin") ?
            <li>
              <Link to="/ext">External API demo</Link>
            </li>
            : ""
          }

          {roles.includes("user") || roles.includes("admin") ?
            <li>
              <Link to="/musicplayer">Music player</Link>
            </li>
            : ""
          }

        </ul>

        <Route exact path="/">
          {isLoggedIn ?
            <div>
              <SpotifyLogin setIsSpotifyConnected={setIsSpotifyConnected}/>
              <UserPage roles={roles} />
              <button onClick={() => facade.logOut(setIsLoggedIn, setRoles)}>Log out</button>
            </div>
          :
            <div>
             <musicPlayer/>         
               <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setRoles={setRoles} setIsSpotifyConnected={setIsSpotifyConnected}/> 
              
            </div>
            

          }
        </Route>
        <Route path="/user">
          {roles.includes("user") ?
            <p>User stuff here</p>
            :
            <p>You are not allowed to view this page</p>
          }
        </Route>
        <Route path="/admin">
          {roles.includes("admin") ?
            <p>Admin stuff here</p>
            :
            <p>You are not allowed to view this page</p>
          }
        </Route>
        <Route path="/ext">
          {roles.includes("user") || roles.includes("admin") ?
            <p>External API stuff here</p>
            :
            <p>You are not allowed to view this page</p>
          }
        </Route>
        <Route path="/lyrics">
          <LyricsConnect artist="Eminem" songName="Lose yourself">
            
          </LyricsConnect>
        </Route>

        <Route path="/musicplayer">
          {roles.includes("user") || roles.includes("admin") ?
          
          
            musicPlayer()
            
            :
            <p>You are not allowed to view this page</p>
          }
           
          
        </Route>
        
      </div>
    </Router>
  )
}

export default App;
