import { useEffect, useState } from 'react';
import facade from './apiFacade';

const UserPage = (props) => {
    const initServerData = {
        msg: "loading.."
    }
    const roles = props.roles;
    const [serverData, setServerData] = useState(initServerData);

    useEffect(() => {
        const role = roles.includes("admin") ? "admin" : "user";
        facade.fetchUserData(role)
        .then(data => setServerData(data));
    },[])

    return (
        <div>
            <h2>Server says:</h2>
        </div>
    )
}

export default UserPage;