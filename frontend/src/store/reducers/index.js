import { combineReducers } from 'redux'
import searchReducer from './search'
import authReducer from './auth'
import toggleModalReducer from './modal'

export default combineReducers({
    search: searchReducer,
    auth: authReducer,
    modal: toggleModalReducer
});