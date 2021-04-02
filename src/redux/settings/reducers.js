const initialState = {
    checkedWordTranslate: false,
    checkedSentenceTranslate: false,
    checkedHard: false,
    checkedDeleted: false,
}

const settings = (state = initialState, action) => {
    switch ( action.type ) {
        case "settings/SET_SETTINGS":
            return {...state, ...action.payload}
        default:
            return state
    }
}

export default settings