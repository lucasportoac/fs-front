import { configureStore } from "@reduxjs/toolkit";

import themeReducer from "./themeSlice";
import cartReducer from "./cartSlice";
import { productApi } from "./productApi";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    cart: cartReducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;