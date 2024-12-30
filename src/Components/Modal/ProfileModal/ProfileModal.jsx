import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { UserContext } from '../../../StoreContext/UserContext';

const Profile = ({ onClose }) => {
    const { userRole } = useContext(UserContext);

    return (
        <div className="profile-container" onClick={onClose}>
            <div className="profile-top">
                <img src="/images/kharush.png" alt="Employee" className="profile-photo" />
                <div className="employee-info">
                    <h2 className="profile-name">MN</h2>
                    <p className="employee-number">Emp No: 12345</p>
                </div>
            </div>
            <div className="profile-divider"></div>

            <div className="profile-bottom">
                {userRole !== 'admin' ? (
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
                        <div className="profle-icon-container" onClick={onClose}>
                            <LogoutIcon className="profileMenu-icon" />
                            <span>Logout</span>
                        </div>
                    </>
                ) : null}

                {userRole === 'admin' && (
                    <div className="profle-icon-container" onClick={onClose}>
                        <LogoutIcon className="profileMenu-icon" />
                        <span>Logout</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
