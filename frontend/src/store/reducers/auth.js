export const userConstants = {
    LOGIN_REQUEST: 'AUTH_LOGIN_REQUEST',
    LOGIN_SUCCESS: 'AUTH_LOGIN_SUCCESS',
    LOGIN_FAILURE: 'AUTH_LOGIN_FAILURE',
    SET_TOKEN: 'AUTH_SET_TOKEN',
    LOGOUT: 'AUTH_LOGOUT'
};

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    loggedIn: true,
    loggingIn: false,
    error: '',
    user: {
        token: user && user.token ? user.token : null,
        username: user && user.username ? user.username : null,
    }
}

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST: {
            return {
                loggingIn: true,
                loggedIn: false,
                user: {
                    token: null,
                    username: null,
                },
                error: ''
            };
        }
        case userConstants.LOGIN_SUCCESS: {
            return {
                loggingIn: false,
                loggedIn: true,
                user: {
                    token: action.token,
                    username: action.username,
                },
                error: '',
                userSuccessfullyLoggedIn: true,
            };
        }
        case userConstants.LOGIN_FAILURE: {
            return {
                loggingIn: false,
                loggedIn: false,
                user: {
                    token: null,
                    username: null,
                },
                error: action.error
            };
        }
        case userConstants.SET_TOKEN: {
            return {
                ...state,
                userSuccessfullyLoggedIn: false,
            }
        }
        case userConstants.LOGOUT: {
            return {
                loggingIn: false,
                loggedIn: false,
                user: {
                    token: null,
                    username: null,
                },
                error: ''
            };
        }
        default:
            return state
    }
}
