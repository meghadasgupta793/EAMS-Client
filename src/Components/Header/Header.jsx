import React, { useState, useContext } from 'react';
import './header.css';
import MenuIcon from '@mui/icons-material/Menu'; // Import Menu Icon
import MessageIcon from '@mui/icons-material/Message';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Profile from '../Modal/ProfileModal/ProfileModal';
import { UserContext } from '../../StoreContext/UserContext'; // Import UserContext
import config from '../../secrect'; // Import config for ImgUrl
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '../../Redux/slice/sidebarSlice';

const Header = () => {
    const [isProfileVisible, setProfileVisible] = useState(false);
    const { userInfo } = useContext(UserContext); // Get userInfo from context
    const { ImgUrl } = config;
    const dispatch = useDispatch();

    const toggleProfile = () => {
        setProfileVisible(!isProfileVisible); // Toggle profile visibility
    };

    return (
        <header>
            {/* Sidebar Toggle Button */}
            <button className="menu-toggle" onClick={() => dispatch(toggleSidebar())}>
                <MenuIcon />
            </button>

            {/* Tools Section (Icons and User Profile) */}
            <div className='tools'>
                <MessageIcon className='icon' />
                <NotificationsActiveIcon className='icon' />
                <div className='divider'></div>
                <div className='user' onClick={toggleProfile}>
                    <img
                        src={userInfo?.Picture ? `${ImgUrl}/${userInfo.Picture}` : '/images/profile.png'}
                        alt='user-img'
                        className='profile-img'
                    />
                </div>
            </div>

            {/* Render Profile Component conditionally */}
            {isProfileVisible && <Profile onClose={toggleProfile} />}
        </header>
    );
};

export default Header;