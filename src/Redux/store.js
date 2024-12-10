import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import {thunk} from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage

import { authReducer } from "./Auth/Reducer";
import { jobReducer } from "./Job/Reducer";
import companyReducer from "./company/Reducer";
import { blogReducer } from "./Blog/Reducer";
import { savedJobReducer } from "./SavedJob/Reducer";
import { profileReducer } from "./UserProfile/Reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  jobs: jobReducer,
  company: companyReducer,
  blog: blogReducer,
  savedJob: savedJobReducer,
  profile: profileReducer,
});

// Configuring persistence
const persistConfig = {
  key: "root", // Key to persist the entire state
  storage,     // Specifies the storage method (localStorage)
  whitelist: ["auth"], // Specify reducers to persist (e.g., auth)
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store with the persisted reducer
export const store = legacy_createStore(persistedReducer, applyMiddleware(thunk));

// Create a persistor
export const persistor = persistStore(store);
