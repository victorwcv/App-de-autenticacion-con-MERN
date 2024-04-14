import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice.js";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Combine reducers
const rootReducer = combineReducers({ user: userReducer });

// Configuration for Redux persist
const persistConfig = {
  key: "root", // Key for storage
  version: 1,// Version of persisted storage
  storage, //Storage engine (localStorage or AsyncStorage)
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure Redux store
export const store = configureStore({
  reducer: persistedReducer,  // Set the root reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for redux-persist
    }),
});

// Create persistor
export const persistor = persistStore(store);
