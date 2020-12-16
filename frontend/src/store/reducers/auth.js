export const userConstants = {
    LOGIN_REQUEST: 'USERS_LOGIN_REQUEST',
    LOGIN_SUCCESS: 'USERS_LOGIN_SUCCESS',
    LOGIN_FAILURE: 'USERS_LOGIN_FAILURE',
    LOGOUT: 'USERS_LOGOUT'
};

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    loggedIn: true,
    loggingIn: false,
    error: '',
    user: {
        token: user && user.token ? user.token : null,
        username: null,
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
