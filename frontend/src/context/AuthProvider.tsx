import { authContext, type Res } from "./authContext";
import { useEffect, useState, type ReactNode } from "react";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [value, setValue] = useState<Res | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setValue({ success: true, token });
    }
  }, []);

  // Persist to localStorage whenever token changes
  useEffect(() => {
    if (value?.token) {
      localStorage.setItem("token", value.token);
    } else {
      localStorage.removeItem("token");
    }
  }, [value?.token]);

  return (
    <authContext.Provider value={{ value, setValue }}>
      {children}
    </authContext.Provider>
  );
};