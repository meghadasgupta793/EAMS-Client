import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Profile.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { UserContext } from '../../../StoreContext/UserContext';
import { useLogoutMutation } from '../../../Redux/api/admin/userApi'; // Import logout mutation
import config from '../../../secrect';

const Profile = ({ onClose }) => {
    const { userRole, setUserData,userInfo } = useContext(UserContext); // Access context
    const [logout, { isLoading }] = useLogoutMutation(); // Use the logout mutation
    const navigate = useNavigate();
    const { ImgUrl } = config;

    // Handle logout
    const handleLogout = async () => {
        try {
            // Call the logout API
            await logout().unwrap();

            // Clear user data from context and sessionStorage
            setUserData(null, {}); // Clear context data
            sessionStorage.removeItem('userRole'); // Clear session storage
            sessionStorage.removeItem('userInfo'); // Clear session storage

            // Redirect to login page or home page
            navigate('/Login'); // Or any other page you want to navigate to after logout

        } catch (err) {
            console.error('Logout failed:', err);
            // Handle any errors, like showing a message to the user
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
