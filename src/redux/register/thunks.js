import {registerUserRequest} from "../api";
import {setError, setIsFetching} from "./actions";
import {authSetUserInfo} from "../auth/actions";
export const registerUser = (data) => async (dispatch) =>{
    dispatch(setIsFetching(true))
    const response =  await registerUserRequest(data)
    if (response === 417){
        dispatch(setError("User already exists"))
        setTimeout(()=>{ dispatch(setError(null))}, 3000)
    }
    else if (Number.isInteger(response)){
        dispatch(setError("Server Error"))
        setTimeout(()=>{ dispatch(setError(null))}, 3000)
    }
    else {
        dispatch( authSetUserInfo( response.data ) )
    }
    dispatch(setIsFetching(false))
}
