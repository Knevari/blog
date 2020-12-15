import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';

export default function configureStore(preloadedState) {
    const store = crneateStore(
        rootReducer, 
        preloadedState,
        applyMiddleware(thunk)
    );
    return store;
}