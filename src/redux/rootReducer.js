import {combineReducers} from "redux";
import register from "./register/reducers";
import auth from "./auth/reducers";
import words from "./words";
import settings from "./settings";

const rootReducer = combineReducers({
    register,
    auth,
    words,
    settings
})

export default rootReducer