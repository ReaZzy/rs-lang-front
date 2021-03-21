import {setIsFetching} from "../register/actions";
import {setMyWords} from "./actions";
import {getWordsRequest} from "../api";

export const getWords = (id, token) => async (dispatch) =>{
    dispatch(setIsFetching(true))
    const data = await getWordsRequest(id, token)
    dispatch(setMyWords(data?.data))
    dispatch(setIsFetching(false))
}