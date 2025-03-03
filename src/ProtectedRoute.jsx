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
        const userInfo = localStorage.getItem("userInfo");
        const token = localStorage.getItem("token");

        if (!userInfo || !token) {
          handleLogout();
          return;
        }

        // Verify token with the backend
        await axios.get(`${url}/api/user/verifyToken`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setIsAuthenticated(true);
      } catch (error) {
        console.error("Authentication failed:", error.response?.data || error.message);
        handleLogout();
      }
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    // Clear localStorage and sessionStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("user");
    localStorage.removeItem("licenseInfo");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("userInfo");
    sessionStorage.removeItem("userRole");

    setIsAuthenticated(false);
  };

  if (isAuthenticated === null) return <div>Loading...</div>;

  return isAuthenticated ? element : <Navigate to="/Login" replace />;
};

export default ProtectedRoute;
