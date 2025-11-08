import { createContext, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";

export interface Res {
  success: boolean;
  token: string;
}

export interface AuthContextType {
  value: Res | null;
  setValue: React.Dispatch<React.SetStateAction<Res | null>>;
  // convenience helpers
  login: (res: Res) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export const authContext = createContext<AuthContextType | null>(null);

export const useAuthGuard = () => {
  const context = useContext(authContext);
  const navigate = useNavigate();

  return useCallback(() => {
    // if there's no token in memory, try localStorage fallback
    if (!context?.value?.token) {
      const token = localStorage.getItem("token");
      if (token) {
        // hydrate context from localStorage
        context?.setValue({ success: true, token });
      } else {
        navigate("/");
      }
    }
  }, [context, navigate]);
};

// ======================
// useAuth HOOK
// (for convenience in other components)
// ======================
export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
