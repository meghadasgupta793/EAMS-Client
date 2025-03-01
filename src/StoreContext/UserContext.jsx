import React, { createContext, useState } from 'react';

// Create the context
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  // Initialize state from sessionStorage if available
  const storedUserRole = sessionStorage.getItem('userRole');
  const storedUserInfo = sessionStorage.getItem('userInfo');

  const [userRole, setUserRole] = useState(storedUserRole || 'admin'); // default role
  const [userInfo, setUserInfo] = useState(storedUserInfo ? JSON.parse(storedUserInfo) : null);

  // Function to set user data in both state and sessionStorage
  const setUserData = (role, userDetails) => {
    setUserRole(role);
    setUserInfo(userDetails);
    sessionStorage.setItem('userRole', role);
    sessionStorage.setItem('userInfo', JSON.stringify(userDetails));
  };

  return (
    <UserContext.Provider value={{ userRole, setUserRole, userInfo, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
