const defaultContentState = {
    contentArray: [],
    history: []
} 

export default function contentReducer(state = defaultContentState, action) {
    switch(action.type) {
        case "SET_CONTENT":
            return {...state, contentArray: action.payload }
        case "SET_CONTENT_HISTORY":
            return {...state, history: action.payload }
        default:
            return state
    }
}