import {registerUserRequest} from "../api";
import {setError, setIsFetching, setUserInfo} from "./actions";
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
        dispatch( setUserInfo( response.data ) )
    }
    dispatch(setIsFetching(false))
}
