import {createStore, combineReducers, applyMiddleware} from 'redux';
import noteReducers from './reducers/noteReducer';
// import requestFulfilledReducers from './reducers/requestFulfilledReducers';
import {logger} from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

export default createStore(combineReducers({noteReducers}), {}, applyMiddleware(logger, thunk, promise()));
    