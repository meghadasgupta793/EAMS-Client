import React, { useContext, useState } from 'react';
import './header.css';
import { ThemeContext } from '../../ThemeContext';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Profile from '../Modal/ProfileModal/ProfileModal';


const Header = () => {
       const [isProfileVisible, setProfileVisible] = useState(false);

  

    const toggleProfile = () => {
        setProfileVisible(!isProfileVisible); // Toggle profile visibility
    };

    return (
        <header >
            <div className='tools'>
                <MessageIcon className='icon' />
                <NotificationsActiveIcon className='icon' />
                <div className='divider'></div>
               

                

                <div className='user' onClick={toggleProfile}>
                    <img src='/images/CompanyLogo.png' alt='user-img' className='profile-img' />
                </div>
            </div>

            {/* Render Profile Component conditionally */}
            {isProfileVisible && (
                <Profile onClose={toggleProfile} />
            )}
        </header>
    );
};

export default Header;
