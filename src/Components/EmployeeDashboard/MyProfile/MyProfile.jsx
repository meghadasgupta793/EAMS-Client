import React from 'react';
import './MyProfile.css';

const MyProfile = () => {
    return (
        <div className='myProfile'>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
                className='profile-svg'
                preserveAspectRatio="none"
                style={{ margin: 0, padding: 0, height: '100px' }}
            >
                <defs>
                    <linearGradient id="gradient" gradientTransform="rotate(90)">
                        <stop offset="0%" stopColor="rgba(29, 169, 156, 1)" />
                        <stop offset="50%" stopColor="rgba(74, 187, 131, 1)" />
                        <stop offset="100%" stopColor="rgba(125, 207, 97, 1)" />
                    </linearGradient>
                </defs>
                <path
                    fill="url(#gradient)"
                    fillOpacity="1"
                    d="M0,256L80,234.7C160,213,320,171,480,149.3C640,128,800,128,960,128C1120,128,1280,128,1360,128L1440,128L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
                />
            </svg>
            <div className='profile-info'>
                <div className='emp'>
                    <img src='/images/profile.png' alt='empImage' className='emp-photo' />
                </div>
                <div className='emp-details'>
                    <div className='detail'>
                        <span className='label'>Emp Name:</span>
                        <span className='value'>MN</span>
                    </div>
                    <div className='detail'>
                        <span className='label'>Emp No:</span>
                        <span className='value'>9999</span>
                    </div>
                    <div className='detail'>
                        <span className='label'>Mobile No:</span>
                        <span className='value'>9898989898</span>
                    </div>
                    <div className='detail'>
                        <span className='label'>Department:</span>
                        <span className='value'>Software</span>
                    </div>
                    <div className='detail'>
                        <span className='label'>Designation:</span>
                        <span className='value'>Developer</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyProfile;
