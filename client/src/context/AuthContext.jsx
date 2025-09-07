import React, { createContext, useState, useEffect } from "react";
import { login as apiLogin, register as apiRegister } from "../api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [user, token]);

  const login = async (email, password) => {
    const data = await apiLogin(email, password);
    setUser(data.user);
    setToken(data.token);
  };

  const register = async (name, email, password) => {
    const data = await apiRegister(name, email, password);
    setUser(data.user);
    setToken(data.token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
