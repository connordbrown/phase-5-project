import { combineReducers } from 'redux';
import usersReducer from './slices/usersSlice';
import isLoggedInReducer from './slices/isLoggedInSlice';
import currentUserReducer from './slices/currentUserSlice';

// global state container
const rootReducer = combineReducers({
    users: usersReducer,
    isLoggedIn: isLoggedInReducer,
    currentUser: currentUserReducer,
})

export default rootReducer;