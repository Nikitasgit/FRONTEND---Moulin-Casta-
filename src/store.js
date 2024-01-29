import { configureStore } from "@reduxjs/toolkit";
import accommodationsReducer from "./feature/accommodationsSlice";
import loginReducer from "./feature/loginSlice";

export const store = configureStore({
  reducer: {
    accommodations: accommodationsReducer,
    login: loginReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
