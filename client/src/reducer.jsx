import { combineReducers } from "redux";
import usersReducer from "./slices/usersSlice";

const rootReducer = combineReducers({
    users: usersReducer,
})

export default rootReducer;