const defaultUserState = {
  isLoggedIn: false,
}

export default function userReducer(state = defaultUserState, action) {
  switch (action.type) {
    case 'SET_LOGIN_STATE':
      return { ...state, isLoggedIn: action.payload }
    default:
      return state
  }
}
