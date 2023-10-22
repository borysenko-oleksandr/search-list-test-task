import {
  applyMiddleware,
  combineReducers,
  createStore,
} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import listReducer from "./reducers/list";

const rootReducer = combineReducers({
  list: listReducer,
});

export const initializeStore = () => {
  const middlewares = [thunk];

  if (__DEV__) {
    const createDebugger = require("redux-flipper").default;
    middlewares.push(createDebugger());
  }

  return createStore(rootReducer, applyMiddleware(...middlewares));
};

export const store = initializeStore();
