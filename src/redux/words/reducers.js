const initialState = {
    words: null,
    myWords: null,
    aggregatedWords: null,
    correct: [],
    wrong: [],
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
                                return {...e, "userWord": {"difficulty": `${action.payload.type}`}}
                            } else return e
                        } ),
                        "totalCount": state.aggregatedWords?.totalCount
                    }
            }
        case "words/SET_CORRECT_WORD":
            const index = state.correct.findIndex(e=> e?.id === action.payload.id)
            return {...state,
                correct:
                index > -1
                ? state.correct.map(e=> {
                    if (e.id === action.payload.id) {
                        return {...e, correctTimes: e.correctTimes + 1}
                    }
                    return {...e}
                })
                : [...state.correct, {...action.payload, "correctTimes": 1}]
            }
        case "words/SET_INCORRECT_WORD":
            const indexIncorrect = state.wrong.findIndex(e=> e?.id === action.payload.id)
            return {...state,
                wrong:
                    indexIncorrect > -1
                ? state.wrong.map(e=> {
                    if (e.id === action.payload.id) {
                        return {...e, wrongTimes: e.wrongTimes + 1}
                    }
                    return {...e}
                })
                : [...state.wrong, {...action.payload, "wrongTimes": 1}]
            }
        default:
            return state
    }
}

export default words