import React, { createContext, useContext, useState } from "react";

const UserContext = createContext(null); // Declare UserContext

export const useUser = () => useContext(UserContext); // Export a hook for easy usage

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};
