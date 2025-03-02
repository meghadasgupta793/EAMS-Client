import React, { useContext,useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Profile.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { UserContext } from '../../../StoreContext/UserContext';
import { useLogoutMutation } from '../../../Redux/api/admin/userApi'; // Import logout mutation
import config from '../../../secrect';
import { useDispatch } from 'react-redux'; // Import useDispatch
import { logout } from '../../../Redux/features/authSlice'; // Import the logout action

const Profile = ({ onClose }) => {
    const { userRole, setUserData,userInfo } = useContext(UserContext); // Access context
 
    const navigate = useNavigate();
    const { ImgUrl } = config;
    const dispatch = useDispatch(); // Initialize dispatch
    const [isLoading, setIsLoading] = useState(false); // Loading state for logout

    // Handle logout
  // Handle logout
  const handleLogout = async () => {
    setIsLoading(true); // Set loading state to true
    try {
        // Dispatch the logout action
        dispatch(logout());

         // Redirect to login page
        navigate('/Login');
    } catch (err) {
        console.error('Logout failed:', err);
        // Handle any errors, like showing a message to the user
        toast.error('Logout failed. Please try again.');
    } finally {
        setIsLoading(false); // Reset loading state
    }
};

    return (
        <div className="profile-container" onClick={onClose}>
            <div className="profile-top">
            <img 
           src={`${userInfo?.Picture ? `${ImgUrl}/${userInfo.Picture}` : 'images/profile.png'}`} 
            alt="Employee" 
            className="profile-photo" 
        />
                <div className="employee-info">
                <h2 className="profile-name">{userInfo?.EmployeeName || 'Loading...'}</h2>
                <p className="employee-number">Emp No: {userInfo?.EmpNo || 'Loading...'}</p>
        </div>
            </div>
            <div className="profile-divider"></div>

            <div className="profile-bottom">
                {/* Render options for employees */}
                {userRole === 'employee' && (
                    <>
                        <Link to="/MyProfileUpdate" className="profle-icon-container" onClick={onClose}>
                            <AccountCircleIcon className="profileMenu-icon" />
                            <span>My Profile</span>
                        </Link>
                        <Link to="/ApplyTour" className="profle-icon-container" onClick={onClose}>
                            <AirplanemodeActiveIcon className="profileMenu-icon" />
                            <span>Apply Tour</span>
                        </Link>
                        <Link to="/ApplyAttendance" className="profle-icon-container" onClick={onClose}>
                            <CheckCircleIcon className="profileMenu-icon" />
                            <span>Mark Attendance</span>
                        </Link>
                        <div className="profle-icon-container" onClick={handleLogout}>
                            <LogoutIcon className="profileMenu-icon" />
                            <span>{isLoading ? 'Logging out...' : 'Logout'}</span>
                        </div>
                    </>
                )}

                {/* Render options for vms role */}
                {userRole === 'vms' && (
                    <>
                        {/* Add links or actions specific to vms */}
                        <Link to="/VmsDashboard" className="profle-icon-container" onClick={onClose}>
                            <AirplanemodeActiveIcon className="profileMenu-icon" />
                            <span>VMS Dashboard</span>
                        </Link>
                        <Link to="/VmsSettings" className="profle-icon-container" onClick={onClose}>
                            <AccountCircleIcon className="profileMenu-icon" />
                            <span>VMS Settings</span>
                        </Link>
                        <div className="profle-icon-container" onClick={handleLogout}>
                            <LogoutIcon className="profileMenu-icon" />
                            <span>{isLoading ? 'Logging out...' : 'Logout'}</span>
                        </div>
                    </>
                )}

                {/* Render logout for admin */}
                {userRole === 'admin' && (
                    <div className="profle-icon-container" onClick={handleLogout}>
                        <LogoutIcon className="profileMenu-icon" />
                        <span>{isLoading ? 'Logging out...' : 'Logout'}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
