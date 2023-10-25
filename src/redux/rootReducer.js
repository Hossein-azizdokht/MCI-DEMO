import { combineReducers } from "redux";
import usersReducer from "./users/userssReducer";

const rootReducer = combineReducers({
  allUsers: usersReducer
});

export default rootReducer;
