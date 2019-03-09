const defaultUserState = {
  isLoggedIn: true,
  id: '',
  email: '',
  role: '',
  firstName: '',
  lastName: '',
  progress: [],
}

export default function userReducer(state = defaultUserState, action) {
  switch (action.type) {
    case 'SET_LOGIN_STATE':
      return { ...state, isLoggedIn: action.payload }
    case 'SET_USER_INFO':
      const { id, email, role, firstName, lastName } = action.payload
      return {
        ...state,
        id,
        email,
        role,
        firstName,
        lastName
      }
    case 'EDIT_PROGRESS':
      return { ...state, progress: action.payload }
    default:
      return state
  }
}
