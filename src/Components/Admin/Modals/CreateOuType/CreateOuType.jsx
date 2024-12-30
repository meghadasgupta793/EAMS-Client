import React, { useState } from 'react';
import SaveIcon from '@mui/icons-material/Save'; // Import the Save icon
import CancelIcon from '@mui/icons-material/Cancel'; // Import the Cancel icon
import Tooltip from '@mui/material/Tooltip'; // Import Tooltip component
import './CreateOuType.css';

const CreateOuType = ({ closeOuTypeModal }) => {
    const [ouType, setOuType] = useState(''); // State to handle OuType input

    const handleSave = () => {
        // Logic for saving the OuType
        console.log("OuType saved:", ouType);
    };

    return (
        <>
            <div className="backGround-Wrapper" onClick={closeOuTypeModal}></div>
            <div className="addOuType-container">
                <div className='addOuType-header-container'>
                    <h1 className='addOuType-heading'>Create OuType</h1>

                    {/* Tooltip for Cancel button */}
                    <Tooltip title="Back to OuType List" placement="top">
                        <button className="ouType-action-btn ouType-cancel-btn" onClick={closeOuTypeModal}>
                            <CancelIcon />
                        </button>
                    </Tooltip>
                </div>

                <div className="addOuType-form-container">
                    <label htmlFor="ouType" className="ouType-label">OuType</label>
                    <input
                        type="text"
                        id="ouType"
                        value={ouType}
                        onChange={(e) => setOuType(e.target.value)}
                        className="ouType-input"
                        placeholder="Enter OuType"
                    />
                </div>

                <div className='button-section'>
                    {/* Tooltip for Save button */}
                    <Tooltip title="Save OuType" placement="top">
                        <button className="ouType-action-btn ouType-save-btn" onClick={handleSave}>
                            <SaveIcon />
                        </button>
                    </Tooltip>
                </div>
            </div>
        </>
    );
};

export default CreateOuType;
