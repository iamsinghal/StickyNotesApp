import {createStore, combineReducers, applyMiddleware} from 'redux';
import noteReducers from './reducers/noteReducer';
import getNotesReducers from './reducers/getNotesReducer';
import {logger} from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

export default createStore(combineReducers({noteReducers, getNotesReducers}), {}, applyMiddleware(logger, thunk, promise()));
