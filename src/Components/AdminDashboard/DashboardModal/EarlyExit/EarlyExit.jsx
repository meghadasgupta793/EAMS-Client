import React from 'react';
import './EarlyExit.css'; // Create this CSS file for styling

const EarlyExit = ({ onClose, open }) => {
    if (!open) return null;

    return (
        <div className='backGround-Wrapper' onClick={onClose}>
            <div className='earlyExit-container' onClick={(e) => e.stopPropagation()}>
                <h1>Early Exit</h1>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default EarlyExit;
