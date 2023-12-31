import { contactReducer } from "./reducers/contact.reducer.js"

import { combineReducers, compose, legacy_createStore as createStore } from "redux"


const rootReducer = combineReducers({
    contactModule: contactReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(rootReducer, composeEnhancers())

window.gStore = store