const defaultButtonReducer = {
    checkboxes: 0
}

export default function buttonReducer(state = defaultButtonReducer, actions) {
    switch(actions.type) {
        default:
            return {...state}
    }
}