const defaultPageState = {
    number: 0,
    subject: "Departure Checklist",
    length: 0,
    remainingCheckboxes: 0,
    remainingQuestions: 0
}

export default function pageReducer(state = defaultPageState, action) {
    switch(action.type) {
    case "SET_PAGE":
        return {...state, number: action.payload}
    case "SET_PAGE_LENGTH":
        return {...state, length: action.payload}
    case "ADD_CHECKBOX":
        return {...state, remainingCheckboxes: state.remainingCheckboxes + 1}
    case "REMOVE_CHECKBOX":
        return {...state, remainingCheckboxes: state.remainingCheckboxes - 1}
    case "RESET_CHECKBOXES":
        return {...state, remainingCheckboxes: 0}
    case "ADD_TO_REMAINING_QUESTIONS":
        return {...state, remainingQuestions: state.remainingQuestions + 1}
    case "REMOVE_FROM_REMAINING_QUESTIONS":
        return {...state, remainingQuestions: state.remainingQuestions - 1}
    case "RESET_REMAINING_QUESTIONS":
        return {...state, remainingQuestions: 0}
    default:
        return state;
    }
}