import { createStore as reduxCreateStore, compose, applyMiddleware } from "redux";
import reducers from "./reducers";
import thunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";


const createStore = () => reduxCreateStore(reducers, {}, compose(applyMiddleware(thunk),composeWithDevTools()));
export default createStore; 