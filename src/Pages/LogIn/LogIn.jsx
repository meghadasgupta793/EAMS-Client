import React, { useState, useContext,useEffect } from 'react';
import './LogIn.css';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../Redux/api/admin/userApi';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../Redux/features/authSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../../StoreContext/UserContext';

const LogIn = () => {
  const { setUserData } = useContext(UserContext);
  const [credentials, setCredentialsState] = useState({ UserName: '', Password: '' });
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentialsState({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(credentials).unwrap();
      dispatch(setCredentials(user));

      setUserData(user.UserRole, {
        id: user.id,
        UserRole: user.UserRole,
        UserName: user.UserName,
        EmployeeName: user.EmployeeName,
        EmpNo: user.EmpNo,
        EmployeeId: user.EmployeeId,
        Picture: user.Picture,
        license: user.license,
      });

      // Display toast synchronously
      toast.success('Login successful!');
      navigate('/');
    } catch (err) {
      console.error('Failed to login: ', err);
      // Display toast synchronously
      toast.error('Login failed. Please check your credentials and try again.');
    }
  };


  // Cleanup function to prevent toast from being displayed after unmount
  useEffect(() => {
    return () => {
      toast.dismiss(); // Dismiss all toasts when the component unmounts
    };
  }, []);

  return (
    <div className="login">
      <div className="login-title">
        <h1>Welcome Back</h1>
      </div>
      <div className="login-container">
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
              <input
                type="submit"
                value={isLoading ? 'Logging in...' : 'Login'}
                disabled={isLoading}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
