import {setIsFetching} from "../register/actions";
import {
    editAggregatedWords,
    setAggregatedWords,
    setMyWords,
    setWords,
    setWordsFetching
} from "./actions";
import {
    deleteWordRequest,
    getAggregatedWordsRequest,
    getMyWordsRequest,
    getWordsRequest,
    setAggregatedWordRequest, updateAggregatedWord
} from "../api";

export const getMyWords = (id, token) => async (dispatch) => {
    dispatch( setWordsFetching( true ) )
    const data = await getMyWordsRequest( id, token )
    dispatch( setMyWords( data?.data ) )
    dispatch( setWordsFetching( false ) )
}
export const getWords = (page, module) => async (dispatch) => {
    dispatch( setWordsFetching( true ) )
    const data = await getWordsRequest( page, module )
    dispatch( setWords( data?.data ) )
    dispatch( setWordsFetching( false ) )
}

export const getAggregatedWords = (page, module, id, token) => async (dispatch) => {
    dispatch( setWordsFetching( true ) )
    const data = await getAggregatedWordsRequest( page, module, id, token )
    dispatch( setAggregatedWords( data?.data[0] ) )
    dispatch( setWordsFetching( false ) )
}
export const setAggregatedWord = (id, word, type, token, page = 0, module = 0) => async (dispatch) => {
    const aggCorrectTimes = word?.userWord?.optional?.correctTimes ? word.userWord.optional.correctTimes : 0
    const aggWrongTimes = word?.userWord?.optional?.wrongTimes ? word.userWord.optional.wrongTimes : 0
    dispatch( setIsFetching( true ) )
    const data = await setAggregatedWordRequest( id, word._id, type, token,
        aggCorrectTimes,
        aggWrongTimes,
    ).catch( async e => updateAggregatedWord( id, word._id, type, token,
        aggCorrectTimes,
        aggWrongTimes, ) )
    dispatch( editAggregatedWords( data?.data?.wordId, data?.data?.difficulty, aggCorrectTimes, aggWrongTimes ) )
    if (type === "deleted") dispatch( getAggregatedWords( page, module, id, token ) )
    dispatch( setIsFetching( false ) )
}
export const deleteWord = (id, wordId, token, type = "normal") => async (dispatch) => {
    await deleteWordRequest( id, wordId, token )
    dispatch( editAggregatedWords( wordId, type ) )
}

export const wrongWord = (id, word, token) => async (dispatch, getState) => {
    word = {...word, _id: word.id ? word.id : word._id}
    await setAggregatedWordRequest(
        id,
        word._id,
        word.userWord?.wrongTimes > 1 ? "hard" : word.userWord?.difficulty === "hard"? "hard" : "learn", // eslint-disable-line
        token,
        word?.userWord?.optional?.correctTimes ? word?.userWord?.optional?.correctTimes : 0,
        1
    )
        .catch(
            async e => await updateAggregatedWord( id,
                word._id, word.userWord?.optional?.wrongTimes > 1
                    ? "hard"
                    : word.userWord?.difficulty === "hard"? "hard" : "learn", // eslint-disable-line
                token, word.userWord?.optional?.correctTimes, word.userWord?.optional?.wrongTimes
                    ? word.userWord?.optional?.wrongTimes + 1
                    : 1
            )
        )
}

export const correctWord = (id, word, token) => async (dispatch, getState) => {
    word = {...word, _id: word.id ? word.id : word._id}
    await setAggregatedWordRequest( id, word._id, word.userWord?.correctTimes > 1 ? "deleted" : word.userWord?.difficulty === "hard"? "hard" : "learn", token, 1 ).catch( // eslint-disable-line
        async e => await updateAggregatedWord( id, word._id, word.userWord?.optional.correctTimes > 1 ? "deleted" :word.userWord?.difficulty === "hard"? "hard" : "learn", token, word?.userWord?.optional?.correctTimes ? word?.userWord?.optional?.correctTimes + 1 : 1, word?.userWord?.optional?.wrongTimes ) // eslint-disable-line
    )
}