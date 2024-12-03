import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { authReducer } from "./Auth/Reducer";
import { jobReducer } from "./Job/Reducer";
import companyReducer from "./company/Reducer";
import { blogReducer } from "./Blog/Reducer";

const rooterReducer=combineReducers({ 
    auth: authReducer,
    jobs: jobReducer,
    company: companyReducer,
    blog: blogReducer
})

export const store=legacy_createStore(rooterReducer,applyMiddleware(thunk));