import { createStore, combineReducers, applyMiddleware } from "redux";
import dataReducer from "./dataReducer";
import thunkMiddleware from 'redux-thunk';

let reducers = combineReducers({
    dataPage: dataReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;