import { combineReducers } from 'redux';
import usersReducer from './slices/usersSlice';
import loggedInReducer from './slices/loggedInSlice';

const rootReducer = combineReducers({
    users: usersReducer,
    loggedIn: loggedInReducer,
})

export default rootReducer;