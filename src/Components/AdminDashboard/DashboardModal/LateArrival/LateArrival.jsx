import React from 'react';
import './LateArrival.css'; // Create this CSS file for styling

const LateArrival = ({ onClose, open }) => {
    if (!open) return null;

    return (
        <div className='backGround-Wrapper' onClick={onClose}>
            <div className='lateArrival-container' onClick={(e) => e.stopPropagation()}>
                <h1>Late Arrival</h1>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default LateArrival;
