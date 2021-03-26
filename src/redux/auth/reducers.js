const initialState = {
    error: null,
    userInfo: null
}

const auth = (state = initialState, action) => {
    switch ( action.type ) {
        case "auth/SET_ERROR":
            return {...state, error: action.payload}
        case "auth/SET_USER_INFO":
            return {...state, userInfo: action.payload}
        case "auth/UPDATE_TOKEN":
            return {...state, userInfo: state.userInfo
                    ? {...state.userInfo, token: action.payload?.token, refreshToken:action.payload?.refreshToken}
                    : null}
        default:
            return state
    }
}

export default auth