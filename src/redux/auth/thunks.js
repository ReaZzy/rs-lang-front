import { setIsFetching, setUserInfo} from "../register/actions";
import {loginRequest, updateTokenRequest} from "../api";
import {authSetError, authSetUserInfo, setToken} from "./actions";

export const login = (email, password) => async (dispatch) => {
    dispatch(setIsFetching(true))
    const response = await loginRequest(email, password)
    if(response === 403){
        dispatch(authSetError("Incorrect email or password"))
        setTimeout(()=>{ dispatch(authSetError(null))}, 3000)
    }
    else if(Number.isInteger(response)){
        dispatch(authSetError("Server error"))
        setTimeout(()=>{ dispatch(authSetError(null))}, 3000)
    }
    else dispatch(authSetUserInfo(response.data))
    dispatch(setIsFetching(false))
}

export const logout = () => async (dispatch) =>{
    dispatch(setUserInfo(null))
    dispatch(authSetUserInfo(null))
}
export const updateToken = (id, tokenUpdate) => async (dispatch) =>{
    const {data: {token, refreshToken}} = await updateTokenRequest(id, tokenUpdate)
    dispatch(setToken(token, refreshToken))
}