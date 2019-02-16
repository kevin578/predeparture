const defaultContentState = {
    contentFromDatabase: []
} 

export default function contentReducer(state = defaultContentState, action) {
    switch(action.type) {
        case "SET_CONTENT":
            return {...state, contentFromDatabase: action.payload }
        default:
            return state
    }
}