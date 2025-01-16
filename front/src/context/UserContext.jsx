/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";

// Create the context
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Initialize the email state from sessionStorage
  const [userEmail, setUserEmail] = useState(() => {
    return sessionStorage.getItem("userEmail") || ""; // Read from sessionStorage
  });

  // Update sessionStorage whenever userEmail changes
  useEffect(() => {
    if (userEmail) {
      sessionStorage.setItem("userEmail", userEmail);
    } else {
      sessionStorage.removeItem("userEmail");
    }
  }, [userEmail]);

  return (
    <UserContext.Provider value={{ userEmail, setUserEmail }}>
      {children}
    </UserContext.Provider>
  );
};
