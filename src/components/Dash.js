import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { getUsers, registerUser } from '../apis/apis';
import CreateUser from './CreateUser';
import Users from './Users'

function Dash() {
    const [newUser, setNewUser] = useState([]);
    const [error, setError] = useState(false);
    const history = useNavigate();

    const createUser = async (user) => {
        const access_token = JSON.parse(localStorage.UserActivePrueba).token;
        const users = await getUsers(access_token);
        const found = users.find(res => res.ssn === user.ssn);
        if(!found){
            await registerUser(access_token, JSON.stringify(user));
            setError(false);
            setNewUser([
                ...newUser,
                user
            ])
        } else {
            setError('El número de seguro social ya se encuentra registrado, verifique he intente de nuevo')
        }
    }

    useEffect(() => {
        const user = localStorage.UserActivePrueba ? JSON.parse(localStorage.UserActivePrueba) : false;
        !user && history("/login");
    }, []);

    return (
        <div className="container">
            <h1>Dashboard</h1>
            <div className="flex-row">
            <div className="flex-large">
                <h2>Add user</h2>
                <span style={{color: 'red', fontSize: 12}}>{error}</span>
                <CreateUser createUser={createUser}/>
            </div>
            <div className="flex-large">
                <h2>List users</h2>
                <Users user={newUser} />
            </div>
            </div>
        </div>
    )
}

export default Dash
