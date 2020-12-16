import { userConstants } from '../reducers/auth';

import APIURL from '../../config/'
import axios from 'axios';
import modalActions from './modal';

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
            dispatch(modalActions.toggleModal(false));
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

