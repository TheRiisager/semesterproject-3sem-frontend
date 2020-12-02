import { useState, useEffect } from 'react';
import facade from './apiFacade';

const Login = (props) => {
    const setIsLoggedIn = props.setIsLoggedIn;
    const setRoles = props.setRoles;
    const setIsSpotifyConnected = props.setIsSpotifyConnected
    const init = { username: "", password: "" };
    const [loginCredentials, setLoginCredentials] = useState(init);
    const [loginError, setLoginError] = useState("");

    const doChange = (event) => {
        setLoginCredentials({ ...loginCredentials,[event.target.id]: event.target.value })
    }

    const doLogin = (event) => {
        event.preventDefault();
        facade.doLogin(loginCredentials.username, loginCredentials.password, setIsLoggedIn, setRoles, setLoginError, setIsSpotifyConnected);
    }

    return (
        <div>
            <p>{loginError}</p>
            <form onChange={doChange}>
                <input placeholder="Username" id="username"/>
                <br />
                <input type="password" placeholder="password" id="password"/>
                <br/>
                <button onClick={doLogin}>Login</button>
            </form>
        </div>
    );
}

export default Login;