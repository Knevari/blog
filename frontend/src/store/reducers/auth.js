export const userConstants = {
    LOGIN_REQUEST: 'USERS_LOGIN_REQUEST',
    LOGIN_SUCCESS: 'USERS_LOGIN_SUCCESS',
    LOGIN_FAILURE: 'USERS_LOGIN_FAILURE',
    LOGOUT: 'USERS_LOGOUT'
};

let token = localStorage.getItem('token');

const initialState = {
    loggedIn: true,
    loggingIn: false,
    error: false,
    user: token
}

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST: {
            return {
                loggingIn: true,
                loggedIn: false,
                user: null,
                error: false
            };
        }
        case userConstants.LOGIN_SUCCESS: {
            return {
                loggingIn: false,
                loggedIn: true,
                user: action.token,
                error: false,
                userSuccessfullyLoggedIn: true,
            };
        }
        case userConstants.LOGIN_FAILURE: {
            return {
                loggingIn: false,
                loggedIn: false,
                user: null,
                error: true
            };
        }
        case userConstants.LOGOUT: {
            return {
                loggingIn: false,
                loggedIn: false,
                user: null,
                error: false
            };
        }
        default:
            return state
    }
}
