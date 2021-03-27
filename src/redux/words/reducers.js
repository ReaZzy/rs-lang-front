const initialState = {
    words: null,
    myWords: null,
    aggregatedWords: null,
    wordsFetching: false,
}

const words = (state = initialState, action) => {
    switch ( action.type ) {
        case "words/SET_MY_WORDS":
            return {...state, myWords: action.payload}
        case "words/SET_WORDS":
            return {...state, words: action.payload}
        case "words/SET_AGGREGATED_WORDS":
            return {...state, aggregatedWords: action.payload}
        case "words/SET_WORDS_FETCHING":
            return {...state, wordsFetching: action.payload}
        case "words/EDIT_AGGREGATED_WORDS":
            return {
                ...state, aggregatedWords:
                    {
                        "paginatedResults": state.aggregatedWords?.paginatedResults.map( e => {
                            if (e._id === action.payload.id) {
                                return {...e, "userWord": {"difficulty": `${action.payload.type}`, "optional":
                                            {"correctTimes": action.payload.correctTimes, "wrongTimes": action.payload.wrongTimes}
                                }}
                            } else return e
                        } ),
                        "totalCount": state.aggregatedWords?.totalCount
                    }
            }
        default:
            return state
    }
}

export default words