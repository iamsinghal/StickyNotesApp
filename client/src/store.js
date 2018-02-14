import {createStore, combineReducers, applyMiddleware} from 'redux';
import noteReducers from './reducers/noteReducer';
import getIdReducer from './reducers/getIdReducer';
import {logger} from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

export default createStore(combineReducers({noteReducers, getIdReducer}), {}, applyMiddleware(logger, thunk, promise()));
