import { applyMiddleware, createStore } from 'redux';
import myReducer from './myReducer';
import thunkMiddleware from 'redux-thunk'

const store = createStore(myReducer, applyMiddleware(thunkMiddleware))

export default store