import { userConstants } from '../reducers/auth';

import APIURL from '../../config/'
import axios from 'axios';
import modalActions from './modal';

export const login = (username, password) => {
    const request = () => ({ type: userConstants.LOGIN_REQUEST })
    const success = (token, username) => ({
        type: userConstants.LOGIN_SUCCESS,
        token,
        username
    })
    const failure = (error) => ({type: userConstants.LOGIN_FAILURE, error })

    return async dispatch => {
        dispatch(request({username}));
        try{
            const response = await axios.post(APIURL+'auth/', {
                username,
                password
            });
            localStorage.setItem("token", response.data.token)
            dispatch(success(response.data.token, username));      
            dispatch(modalActions.toggleModal(false));
        }
        catch(error){
            console.log(error.message);
            dispatch(failure(error.message));
        }
    }
}

export function logout(){
    localStorage.removeItem("token")
    return { type: userConstants.LOGOUT };
}

