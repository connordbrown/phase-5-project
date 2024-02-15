import { combineReducers } from 'redux';
import usersReducer from './slices/usersSlice';
import loggedInReducer from './slices/loggedInSlice';
import currentUserReducer from './slices/currentUserSlice';

// global state container
const rootReducer = combineReducers({
    users: usersReducer,
    loggedIn: loggedInReducer,
    currentUser: currentUserReducer,
})

export default rootReducer;