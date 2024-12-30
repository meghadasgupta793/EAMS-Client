import React from 'react';
import './MyAttendanceStatus.css';

const MyAttendanceStatus = ({ Icon, title, value, onClick }) => {
    return (
        <div className='myAttendanceStatus' onClick={onClick}> {/* Trigger onClick on click */}
            <Icon className='icon' />
            {title && <h2 className='title'>{title}</h2>}
            {value && <h2 className='value'>{value}</h2>}
        </div>
    );
};

export default MyAttendanceStatus;
