import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router';
import { getUsers } from '../apis/apis';

function Users(props) {
    const history = useNavigate();
    const [users, setUsers] = useState(null);

    const getData = async user => {
        const access_token = JSON.parse(localStorage.UserActivePrueba).token;
        const expiration = JSON.parse(localStorage.UserActivePrueba);
        const init = JSON.parse(localStorage.UserActivePrueba).iat;
        const fin = JSON.parse(localStorage.UserActivePrueba).exp;
        const seconds = fin-init;
        const result = await getUsers(access_token);
        setUsers(result);
        !expiration.expires &&
        getTime(seconds,user);
    }
    const getTime = (seconds, user) => {
        var date = new Date(0);
        date.setSeconds(seconds); // specify value for SECONDS here
        var timeString = date.toISOString().substr(11, 8);
        var minutes = timeString.split(':')[1];
        var now = new Date();
        now.setMinutes(now.getMinutes() + parseInt(minutes)); // timestamp
        now = new Date(now);
        user.expires = now;
        localStorage.UserActivePrueba = JSON.stringify(user);
    }

    useEffect(() => {
        const user = localStorage.UserActivePrueba ? JSON.parse(localStorage.UserActivePrueba) : false;
        if(user) {
            if(user.expires){
                const actual_date = new Date();
                const expiration = new Date(user.expires);
                const validate = actual_date > expiration;
                validate ? history("/login") : getData(user);
            } else {
                getData(user)
            }
        }
    },[props.user])
    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Address</th>
                    <th>SSN</th>
                </tr>
                </thead>
                <tbody>
                    {users ? (
                        users.map((user, key) => (
                        <tr key={key}>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.address}</td>
                            <td>{user.ssn}</td>
                        </tr>
                        ))
                    ) : (
                        <tr>
                        <td colSpan={3}>No users</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Users
