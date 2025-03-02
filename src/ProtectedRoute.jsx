import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import config from "./secrect";

const ProtectedRoute = ({ element }) => {
  const { url } = config;
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Initially null

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userInfo = localStorage.getItem("userInfo"); // Retrieve from localStorage
        const token = localStorage.getItem("token"); // Retrieve token from localStorage

        if (!userInfo || !token) {
          setIsAuthenticated(false);
          return;
        }

        // Verify token with the backend
        await axios.get(`${url}/api/user/verifyToken`, {
          headers: { Authorization: `Bearer ${token}` }, // Send token in headers
        });

        setIsAuthenticated(true);
      } catch (error) {
        console.error("Authentication failed:", error.response?.data || error.message);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) return <div>Loading...</div>; // Show a loading state while verifying

  return isAuthenticated ? element : <Navigate to="/Login" replace />;
};

export default ProtectedRoute;