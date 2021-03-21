import {combineReducers} from "redux";
import register from "./register/reducers";
import auth from "./auth/reducers";

const rootReducer = combineReducers({
    register,
    auth,
})

export default rootReducer