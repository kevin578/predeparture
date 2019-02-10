import { combineReducers } from 'redux';
import userReducer from "./userReducer";
import pageReducer from "./pageReducer";


export default combineReducers({
    user: userReducer,
    page: pageReducer
})