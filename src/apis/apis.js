import axios from "axios";
import { BASE_API_LOGIN, BASE_API_MEMBERS, BASE_PATH_SERVER } from "../configuration/globalVariables"

const login = async (data) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const response = await axios.post(BASE_API_LOGIN,data,config)
    .then(res => {
        localStorage.UserActivePrueba = JSON.stringify(res.data);
        return true;
    })
    .catch(error => error)
    return response;
}

const registerUser = async (access_token, data) => {
    console.log(access_token);
    const config = {
        headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json'
        }
    }
    console.log('data',data);
    const response = await axios.post(BASE_PATH_SERVER + BASE_API_MEMBERS,data,config)
    .then(res => {
        return res;
    })
    .catch(error => error)
    console.log('esperando');
    return response;
}

const getUsers = async (access_token) => {
    const config = {
        headers: {
        'Authorization': `Bearer ${access_token}`
        }
    }
    const response = await axios.get(BASE_PATH_SERVER + BASE_API_MEMBERS,config)
    .then(res => {
        return res.data;
    })
    .catch(error => error);
    return response;
}

export{
    login,
    getUsers,
    registerUser
}