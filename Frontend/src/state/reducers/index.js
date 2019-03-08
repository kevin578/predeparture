import { combineReducers } from 'redux';
import userReducer from "./userReducer";
import pageReducer from "./pageReducer";
import contentReducer from "./contentReducer";
import buttonReducer from "./buttonReducer";

export default combineReducers({
    user: userReducer,
    page: pageReducer,
    content: contentReducer
})