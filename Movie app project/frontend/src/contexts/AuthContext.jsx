import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const login = async (username, password) => {
    try {
      const res = await axios.post("/api/login", { username, password });
      setUser(res.data.user);
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      return true;
    } catch {
      return false;
    }
  };

  const register = async (username, password) => {
    try {
      const res = await axios.post("/api/register", { username, password });
      setUser(res.data.user);
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      return true;
    } catch {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};