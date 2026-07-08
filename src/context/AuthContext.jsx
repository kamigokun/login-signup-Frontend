import { createContext, useContext, useEffect, useState } from "react";
import * as authService from "../services/authService";

const AuthContext = createContext(null);
const STORAGE_KEY = "keystone_token";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(STORAGE_KEY));
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    if (!token) {
      setInitializing(false);
      return;
    }
    authService
      .fetchProfile(token)
      .then((data) => setUser(data.user))
      .catch(() => {
        // token expired or invalid — clear it out
        localStorage.removeItem(STORAGE_KEY);
        setToken(null);
      })
      .finally(() => setInitializing(false));
  }, [token]);

  const persistSession = (newToken, newUser) => {
    localStorage.setItem(STORAGE_KEY, newToken);
    setToken(newToken);
    setUser(newUser);
  };

  const login = async (credentials) => {
    const data = await authService.login(credentials);
    persistSession(data.token, data.user);
    return data;
  };

  const signup = async (details) => {
    const data = await authService.signup(details);
    persistSession(data.token, data.user);
    return data;
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setToken(null);
    setUser(null);
  };

  const value = {
    token,
    user,
    isAuthenticated: Boolean(token),
    initializing,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
