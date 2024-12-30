import React, { useState } from 'react';
import SaveIcon from '@mui/icons-material/Save'; // Import the Save icon
import CancelIcon from '@mui/icons-material/Cancel'; // Import the Cancel icon
import Tooltip from '@mui/material/Tooltip'; // Import Tooltip component
import './UpdateOuType.css'; // Import CSS for styling

const UpdateOuType = ({ closeUpdateOuTypeModal, SelectedOuType }) => {
    const [ouType, setOuType] = useState(SelectedOuType.type || '');
    const [ouTypeId, setouTypeId] = useState(SelectedOuType.id || ''); // State to handle OuType input with initial value

    const handleUpdate = () => {
        // Logic for updating the OuType
        console.log("OuType updated:", ouType);
    };

    return (
        <>
            <div className="backGround-Wrapper" onClick={closeUpdateOuTypeModal}></div>
            <div className="updateOuType-container">
                <div className='updateOuType-header-container'>
                    <h1 className='updateOuType-heading'>Update OuType</h1>

                    {/* Tooltip for Cancel button */}
                    <Tooltip title="Back to OuType List" placement="top">
                        <button className="ouType-action-btn ouType-cancel-btn" onClick={closeUpdateOuTypeModal}>
                            <CancelIcon />
                        </button>
                    </Tooltip>
                </div>

                <div className="updateOuType-form-container">
                    <label htmlFor="ouType" className="ouType-label">OuType</label>
                    <input
                        type="text"
                        id="ouType"
                        value={ouType}
                        onChange={(e) => setOuType(e.target.value)}
                        className="ouType-input"
                        placeholder="Update OuType"
                    />
                </div>

                <div className='button-section'>
                    {/* Tooltip for Save button */}
                    <Tooltip title="Save Updated OuType" placement="top">
                        <button className="ouType-action-btn ouType-save-btn" onClick={handleUpdate}>
                            <SaveIcon />
                        </button>
                    </Tooltip>
                </div>
            </div>
        </>
    );
};

export default UpdateOuType;
