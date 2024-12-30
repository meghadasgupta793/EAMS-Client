import React from 'react';
import './WeeklyOff.css'; // Create this CSS file for styling

const WeeklyOff = ({ onClose, open }) => {
    if (!open) return null;

    return (
        <div className='backGround-Wrapper' onClick={onClose}>
            <div className='weeklyOff-container' onClick={(e) => e.stopPropagation()}>
                <h1>Weekly Off</h1>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default WeeklyOff;
