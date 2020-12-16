import { userConstants } from '../reducers/auth';

import history from '../../utils/history'
import APIURL from '../../config/'
import axios from 'axios';

//import { LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAILURE } from '../reducers/auth'

export const login = (username, password) => {
    console.log(username,password);
    return async dispatch => {
        dispatch(request({username}));
        try{
            const response = await axios.post(APIURL+'auth/', {
                username,
                password
            });
            localStorage.setItem("token", response.data.token)
            dispatch(success(response.data.token));
            history.push('/')
        }
        catch(error){
            console.log(error.message);
            dispatch(failure(error.message));
        }
        
    };

    function request() { return { type: userConstants.LOGIN_REQUEST }}
    function success(token) { return { type: userConstants.LOGIN_SUCCESS, token }}
    function failure(error) { return {type: userConstants.LOGIN_FAILURE, error }}
}

export function logout(){
    localStorage.removeItem("token")
    return { type: userConstants.LOGOUT };
}

