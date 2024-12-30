import React from 'react';
import './TotalAbsent.css'; // Create this CSS file for styling

const TotalAbsent = ({ onClose, open }) => {
    if (!open) return null;

    return (
        <div className='backGround-Wrapper' onClick={onClose}>
            <div className='totalAbsent-container' onClick={(e) => e.stopPropagation()}>
                <h1>Total Absent</h1>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default TotalAbsent;
