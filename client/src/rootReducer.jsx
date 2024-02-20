import { combineReducers } from 'redux';
import usersReducer from './slices/usersSlice';
import isLoggedInReducer from './slices/isLoggedInSlice';
import currentUserReducer from './slices/currentUserSlice';
import articlesReducer from './slices/articlesSlice';
import articlesLoadedReducer from './slices/articlesLoadedSlice';
import categoriesReducer from './slices/categoriesSlice';

// global state container
const rootReducer = combineReducers({
    users: usersReducer,
    isLoggedIn: isLoggedInReducer,
    currentUser: currentUserReducer,
    articles: articlesReducer,
    articlesLoaded: articlesLoadedReducer,
    categories: categoriesReducer,
})

export default rootReducer;