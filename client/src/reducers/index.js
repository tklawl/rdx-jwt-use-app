/*
Reducers are pure functions that 
specify how application state should change in 
response to an action. Reducers respond with the 
new state, which is passed to our store and, in turn,
our UI.
*/

import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";

//combineReducers is from Redux - used to combine reducers into one
export default combineReducers({
  auth: authReducer,
  errors: errorReducer
});