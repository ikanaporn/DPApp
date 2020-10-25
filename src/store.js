import { createStore, applyMiddleware } from "redux";
import reducer from './reducers'
import thunk from "redux-thunk";

store = createStore(reducer, applyMiddleware(thunk));
export default store;