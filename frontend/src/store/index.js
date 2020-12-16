import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

import { login } from './actions/auth' 

export default function configureStore(preloadedState) {
    const store = createStore(
        rootReducer, 
        preloadedState,
        applyMiddleware(thunk)
    );
    return store;
}
