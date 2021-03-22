const initialState = {
    myWords: null
}

const words = (state=initialState, action) => {
    switch (action.type ) {
        case "words/SET_MY_WORDS":
            return {...state, myWords: action.payload}
        default:
            return state
    }
}

export default words