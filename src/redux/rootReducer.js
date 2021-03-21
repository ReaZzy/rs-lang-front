import {combineReducers} from "redux";
import register from "./register/reducers";
import auth from "./auth/reducers";
import words from "./words";

const rootReducer = combineReducers({
    register,
    auth,
    words,
})

export default rootReducer