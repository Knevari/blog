

export const userConstants = {
    LOGIN_REQUEST: 'USERS_LOGIN_REQUEST',
    LOGIN_SUCCESS: 'USERS_LOGIN_SUCCESS',
    LOGIN_FAILURE: 'USERS_LOGIN_FAILURE',
    LOGOUT: 'USERS_LOGOUT'
};

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export default function authReducer(state = initialState, action) {
    console.log(action)
    switch (action.type) {
    case userConstants.LOGIN_REQUEST:
        return {
        loggingIn: true,
        loggedIn: false,
        user: null,
        error: false
        };
    case userConstants.LOGIN_SUCCESS:
        return {
        loggingIn: false,
        loggedIn: true,
        user: action.token,
        error: false
        };
    case userConstants.LOGIN_FAILURE:
        return {
            loggingIn: false,
            loggedIn: false,
            user: null,
            error: true
        };
    case userConstants.LOGOUT:
        return {
            loggingIn: false,
            loggedIn: false,
            user: null,
            error: false
        };
    default:
        return state
    }
}
