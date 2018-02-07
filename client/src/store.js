import {createStore, combineReducers} from 'redux';
import noteReducers from './reducers/noteReducer';
import getNotesReducers from './reducers/getNotesReducer';

export default createStore(combineReducers({noteReducers, getNotesReducers}));
