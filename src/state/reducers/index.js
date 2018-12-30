import { combineReducers } from 'redux';
import pageReducer from "./pageReducer.js"

export default combineReducers({
    page: pageReducer
})