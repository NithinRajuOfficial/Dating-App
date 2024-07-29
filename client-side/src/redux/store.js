import { configureStore } from "@reduxjs/toolkit";
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
import storage from "redux-persist/lib/storage";
import signupDialog from "./slices/signupDialog";
import loginDialog from "./slices/loginDialog";
import otpDialog from "./slices/otpDialog";
import userDataDialog from "./slices/userDataDialog";
import userHobbiesDialog from "./slices/userHobbiesDialog";

const persistConfig = {
  key: "root",
  storage,
};

const persistedSignupReducer = persistReducer(persistConfig, signupDialog);
const persistedLoginReducer = persistReducer(persistConfig, loginDialog);
const persistedOtpReducer = persistReducer(persistConfig, otpDialog);
const persistedUserDataDialogReducer = persistReducer(persistConfig,userDataDialog)
const persistedUserHobbiesReducer = persistReducer(persistConfig, userHobbiesDialog);

const store = configureStore({
  reducer: {
    signupDialog: persistedSignupReducer,
    loginDialog: persistedLoginReducer,
    otpDialog: persistedOtpReducer,
    userDataDialog: persistedUserDataDialogReducer,
    userHobbiesDialog: persistedUserHobbiesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
