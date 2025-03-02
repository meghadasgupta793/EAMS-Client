import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../Redux/api/admin/userApi';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../Redux/features/authSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../../StoreContext/UserContext';
import './LogIn.css';

const LogIn = () => {
  const { setUserData } = useContext(UserContext);
  const [credentials, setCredentialsState] = useState({ UserName: '', Password: '' });
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentialsState((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoading) return; // Prevent multiple submissions

    try {
      const response = await login(credentials).unwrap();

      // Store token and user data in localStorage
      localStorage.setItem('token', response.token); // Updated to localStorage
      localStorage.setItem('userInfo', JSON.stringify(response.user)); // Updated to localStorage
      localStorage.setItem('licenseInfo', JSON.stringify(response.license)); // Updated to localStorage

      // Dispatch user credentials to Redux state
      dispatch(setCredentials({ user: response.user, token: response.token }));

      // Set user data in UserContext
      setUserData(response.user.UserRole, {
        id: response.user.id,
        UserRole: response.user.UserRole,
        UserName: response.user.UserName,
        EmployeeName: response.user.EmployeeName,
        EmpNo: response.user.EmpNo,
        EmployeeId: response.user.EmployeeId,
        Picture: response.user.Picture,
        license: response.license,
      });

      // Show success toast and navigate to home
      toast.success('Login successful!');
      navigate('/');
    } catch (err) {
      console.error('Failed to login:', err);
      toast.error(err?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  // Clear toasts on component unmount
  useEffect(() => {
    return () => toast.dismiss();
  }, []);

  return (
    <div className="login">
      <div className="login-title">
        <h1>Welcome Back</h1>
      </div>
      <div className="login-container">
        {/* Left Section: Company Info */}
        <div className="login-left">
          <div className="company-info">
            <img src="/images/CompanyLogo.png" alt="Company Logo" className="company-logo" />
            <h2 className="company-name">MN Software</h2>
            <p className="company-description">
              Welcome to MN Software, where we provide streamlined solutions for Employee Attendance Management and Visitor Management.
              Our product ensures easy tracking, reporting, and management of employee attendance and visitors, all in one place.
            </p>
          </div>
        </div>

        {/* Right Section: Login Form */}
        <div className="login-right">
          <div className="login-form-box">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="UserName"
                required
                name="UserName"
                value={credentials.UserName}
                onChange={handleChange}
              />
              <input
                type="password"
                placeholder="Password"
                required
                name="Password"
                value={credentials.Password}
                onChange={handleChange}
              />
              <button type="submit" disabled={isLoading} className='login-btn'>
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;