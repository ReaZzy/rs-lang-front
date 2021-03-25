import {setIsFetching} from "../register/actions";
import {
    editAggregatedWords,
    setAggregatedWords, setCorrectWord,
    setIncorrectWord,
    setMyWords,
    setWords,
    setWordsFetching
} from "./actions";
import {
    deleteWordRequest,
    getAggregatedWordsRequest,
    getMyWordsRequest,
    getWordsRequest,
    setAggregatedWordRequest
} from "../api";

export const getMyWords = (id, token) => async (dispatch) =>{
    dispatch(setWordsFetching(true))
    const data = await getMyWordsRequest(id, token)
    dispatch(setMyWords(data?.data))
    dispatch(setWordsFetching(false))
}
export const getWords = (page, module) => async (dispatch) =>{
    dispatch(setWordsFetching(true))
    const data = await getWordsRequest(page, module)
    dispatch(setWords(data?.data))
    dispatch(setWordsFetching(false))
}

export const getAggregatedWords = (page, module, id, token) => async (dispatch) =>{
    dispatch(setWordsFetching(true))
    const data = await getAggregatedWordsRequest(page, module, id, token)
    dispatch(setAggregatedWords(data?.data[0]))
    dispatch(setWordsFetching(false))
}
export const setAggregatedWord = (id, wordId, type, token, page=0, module=0) => async (dispatch) =>{
    dispatch(setIsFetching(true))
    if (type === "deleted" ) await dispatch(deleteWord(id, wordId,token, type))
    const data = await setAggregatedWordRequest(id, wordId, type, token)
    dispatch(editAggregatedWords(data?.data?.wordId, data?.data?.difficulty))
    if (type === "deleted" ) dispatch(getAggregatedWords(page, module, id, token))
    dispatch(setIsFetching(false))
}
export const deleteWord = (id, wordId, token, type="normal") => async (dispatch) =>{
    await deleteWordRequest(id, wordId, token)
    dispatch(editAggregatedWords(wordId, type))
}

export const wrongWord = (id, word, token) => (dispatch, getState) => {
    const {words: {wrong}} = getState()
    const index = wrong.findIndex(e=> e.id === word.id)
    index > -1
        && wrong[index]?.wrongTimes > 2 && dispatch(setAggregatedWord(id, word.id, "hard", token))
    dispatch(setIncorrectWord(word))
}

export const correctWord = (id, word, token) => (dispatch, getState) => {
    const {words: {correct}} = getState()
    const index = correct.findIndex(e=> e.id === word.id)
    index > -1
    && correct[index]?.correctTimes > 2 && dispatch(setAggregatedWord(id, word.id, "deleted", token))
    dispatch(setCorrectWord(word))
}