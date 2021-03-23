export const setMyWords = (payload) => ({type:"words/SET_MY_WORDS", payload})
export const setWords = (payload) => ({type:"words/SET_WORDS", payload})
export const setAggregatedWords = (payload) => ({type:"words/SET_AGGREGATED_WORDS", payload})
export const editAggregatedWords = (id, type) => ({type:"words/EDIT_AGGREGATED_WORDS", payload: {id, type}})