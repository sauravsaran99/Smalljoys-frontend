import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({token:null, userId: null});

  const login = ({token, userId}) => {
    // Perform API call to authenticate user and set user state if successful
    const newUser = {token, userId };
    // console.log('.....log')
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const logout = () => {
    // Perform API call to log out user and clear user state
    setUser(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    // console.log('context', storedUser);
    if (storedUser) {
      login({...storedUser});
    }
  }, []);

  const contextValue = {
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
