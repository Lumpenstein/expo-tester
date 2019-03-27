import createSecureStore from "../redux-persist-expo-secureStore";

import { compose, applyMiddleware, createStore } from "redux";
import { persistStore, persistCombineReducers } from "redux-persist";
import reducers from "./reducers";

// Secure storage
const storage = createSecureStore();
const config = {
  key: "root",
  storage
};

const persistedReducer = persistCombineReducers(config, reducers);

// console.log(persistedReducer);
// console.log(reducers);

function configureStore () {
  // ...
  let store = createStore(persistedReducer);
  let persistor = persistStore(store);

  return { persistor, store };
}

export default configureStore;
