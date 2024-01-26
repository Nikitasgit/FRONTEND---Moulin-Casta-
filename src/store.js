import { configureStore } from "@reduxjs/toolkit";
import accommodationsReducer from "./feature/accommodationsSlice";
import picturesReducer from "./feature/picturesSlice";

export const store = configureStore({
  reducer: {
    accommodations: accommodationsReducer,
    pictures: picturesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
