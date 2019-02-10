const defaultUserState = {
  isLoggedIn: false,
}

export default function userReducer(state = defaultUserState, action) {
  switch (action.type) {
    case 'IS_LOGGED_IN':
      return { ...state, isLoggedIn: action.payload }
    default:
      return state
  }
}
