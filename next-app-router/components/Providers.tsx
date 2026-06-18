"use client";

import { Provider } from "react-redux";
import { store } from "../store/store";
import { AppContextProvider } from "../context/AppContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AppContextProvider>{children}</AppContextProvider>
    </Provider>
  );
}