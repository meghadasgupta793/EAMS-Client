import React from 'react';
import './OnLeave.css'; // Create this CSS file for styling

const OnLeave = ({ onClose, open }) => {
    if (!open) return null;

    return (
        <div className='backGround-Wrapper' onClick={onClose}>
            <div className='onLeave-container' onClick={(e) => e.stopPropagation()}>
                <h1>On Leave</h1>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default OnLeave;
