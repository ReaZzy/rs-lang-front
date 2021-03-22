const initialState = {
    error:null,
    userInfo: null
}

const auth = (state=initialState, action) => {
    switch (action.type ) {
        case "auth/SET_ERROR":
            return {...state, error: action.payload}
            case "auth/SET_USER_INFO":
            return {...state, userInfo: action.payload}
        default:
            return state
    }
}

export default auth