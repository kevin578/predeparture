import { combineReducers } from 'redux';
import userReducer from "./userReducer";
import pageReducer from "./pageReducer";
import contentReducer from "./contentReducer";

export default combineReducers({
    user: userReducer,
    page: pageReducer,
    content: contentReducer
})