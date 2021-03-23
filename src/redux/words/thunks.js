import {setIsFetching} from "../register/actions";
import {editAggregatedWords, setAggregatedWords, setMyWords, setWords} from "./actions";
import {getAggregatedWordsRequest, getMyWordsRequest, getWordsRequest, setAggregatedWordRequest} from "../api";

export const getMyWords = (id, token) => async (dispatch) =>{
    dispatch(setIsFetching(true))
    const data = await getMyWordsRequest(id, token)
    dispatch(setMyWords(data?.data))
    dispatch(setIsFetching(false))
}
export const getWords = (page, module) => async (dispatch) =>{
    dispatch(setIsFetching(true))
    const data = await getWordsRequest(page, module)
    dispatch(setWords(data?.data))
    dispatch(setIsFetching(false))
}

export const getAggregatedWords = (page, module, id, token) => async (dispatch) =>{
    dispatch(setIsFetching(true))
    const data = await getAggregatedWordsRequest(page, module, id, token)
    dispatch(setAggregatedWords(data?.data[0]))
    dispatch(setIsFetching(false))
}
export const setAggregatedWord = (id, wordId, type, token) => async (dispatch) =>{
    dispatch(setIsFetching(true))
    const data = await setAggregatedWordRequest(id, wordId, type, token)
    dispatch(editAggregatedWords(data?.data?.wordId, data?.data?.difficulty))
    dispatch(setIsFetching(false))
}