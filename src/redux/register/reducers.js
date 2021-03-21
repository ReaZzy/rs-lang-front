
const initialState = {
  isFetching: false,
  error: null,
}

const register = (state= initialState, action) => {
  switch (action.type) {
    case "register/SET_IS_FETCHING":
      return {...state, isFetching: action.payload}
    case "register/SET_ERROR": {
      return {...state, error: action.payload}
    }
    default:
      return state
  }
}

export default register