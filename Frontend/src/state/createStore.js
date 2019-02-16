import { createStore as reduxCreateStore } from "redux";
import reducers from "./reducers"
import { composeWithDevTools } from "redux-devtools-extension";


const createStore = () => reduxCreateStore(reducers, {},  composeWithDevTools())
export default createStore