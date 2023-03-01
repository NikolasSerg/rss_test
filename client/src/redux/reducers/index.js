import { combineReducers } from 'redux'
import {authentication} from "./auth.reducer";
import {posts} from "./post.reducer";
import {alertInfo} from "./alert.reducer";

const rootReducer = combineReducers({
    authentication,
    posts,
    alertInfo
})

export default rootReducer