const defaultContentState = {
    contentArray: []
} 

export default function contentReducer(state = defaultContentState, action) {
    switch(action.type) {
        case "SET_CONTENT":
            return {...state, contentArray: action.payload }
        default:
            return state
    }
}