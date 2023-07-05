import { configureStore, combineReducers } from "@reduxjs/toolkit";
import localforage from "localforage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import userReducer from "./userSlice";
import bookingReducer from "./bookingSlice";
import purchaseOrderReducer from "./purchaseOrderSlice";
import moduleSlice from "./moduleSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage: localforage,
};

const rootReducer = combineReducers({
  user: userReducer,
  booking: bookingReducer,
  purchase: purchaseOrderReducer,
  moduleCategory: moduleSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
