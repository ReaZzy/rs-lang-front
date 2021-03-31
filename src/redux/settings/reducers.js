const initialState = {
    checkedWordTranslate: false,
    checkedSentenceTranslate: false,
    checkedHard: false,
    checkedDeleted: false,
}

const settings = (state = initialState, action) => {
    switch ( action.type ) {
        case "settings/SET_SETTINGS":
            return {
                checkedWordTranslate: action.payload.checkedWordTranslate,
                checkedSentenceTranslate: action.payload.checkedSentenceTranslate,
                checkedHard: action.payload.checkedHard,
                checkedDeleted: action.payload.checkedDeleted,
            }
        default:
            return state
    }
}

export default settings