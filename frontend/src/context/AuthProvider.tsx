import { authContext, type Res } from "./authContext";
import { useEffect, useState, type ReactNode, useCallback } from "react";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // initialize synchronously from localStorage so children get token on first render
  const [value, setValue] = useState<Res | null>(() => {
    const token = localStorage.getItem("token");
    return token ? { success: true, token } : null;
  });

  const login = useCallback((res: Res) => {
    setValue(res);
    if (res?.token) localStorage.setItem("token", res.token);
  }, []);

  const logout = useCallback(() => {
    setValue(null);
    localStorage.removeItem("token");
  }, []);

  // keep localStorage in sync in case value is updated elsewhere
  useEffect(() => {
    if (value?.token) {
      localStorage.setItem("token", value.token);
    } else {
      localStorage.removeItem("token");
    }
  }, [value?.token]);

  const isAuthenticated = !!value?.token;

  return (
    <authContext.Provider value={{ value, setValue, login, logout, isAuthenticated }}>
      {children}
    </authContext.Provider>
  );
};