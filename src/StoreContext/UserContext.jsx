import React, { createContext, useState } from 'react';

// Create the context
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  
/// const [userRole, setUserRole] = useState('admin'); // default role can be set here

  const [userRole, setUserRole] = useState('employee'); // default role can be set here

  return (
    <UserContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </UserContext.Provider>
  );
};
