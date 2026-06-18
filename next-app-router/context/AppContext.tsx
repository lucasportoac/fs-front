"use client";

import { createContext, useContext, useState } from "react";

type Usuario = {
  email: string;
};

type AppContextType = {
  usuario: Usuario | null;
  login: (email: string) => void;
  logout: () => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  function login(email: string) {
    setUsuario({ email });
  }

  function logout() {
    setUsuario(null);
  }

  return (
    <AppContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext deve ser usado dentro de AppContextProvider");
  }

  return context;
}