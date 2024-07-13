import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import signupDialog from "./slices/signupDialog";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, signupDialog);

const store = configureStore({
  reducer: {
    dialog: persistedReducer,
  },
});

export const persistor = persistStore(store);
export default store;
