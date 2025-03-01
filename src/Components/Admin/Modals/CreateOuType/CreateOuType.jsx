import React, { useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import Tooltip from '@mui/material/Tooltip';
import './CreateOuType.css';
import { useCreateOuTypeMutation } from '../../../../Redux/api/admin/ouApi';

const CreateOuType = ({ closeOuTypeModal }) => {
    const [ouType, setOuType] = useState(''); // State to handle OuType input
    const [createOuType, { isLoading, error }] = useCreateOuTypeMutation(); 

    // Handle input change
    const handleChange = (e) => {
        setOuType(e.target.value);
    };

    // Handle save button click
    const handleSave = async () => {
        if (!ouType.trim()) {
            alert("OuType cannot be empty!"); 
            return;
        }

        try {
            await createOuType({ OUType: ouType }).unwrap();
            closeOuTypeModal(); // Close modal on success
        } catch (err) {
            console.error("Failed to create OuType:", err);
        }
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
                        className="ouType-input"
                        placeholder="Enter OuType"
                        value={ouType}
                        onChange={handleChange}
                    />
                    {error && <p className="error-message">Failed to create OuType</p>}
                </div>

                <div className='button-section'>
                    {/* Tooltip for Save button */}
                    <Tooltip title="Save OuType" placement="top">
                        <button 
                            className="ouType-action-btn ouType-save-btn" 
                            onClick={handleSave}
                            disabled={isLoading}
                        >
                            {isLoading ? "Saving..." : <SaveIcon />}
                        </button>
                    </Tooltip>
                </div>
            </div>
        </>
    );
};

export default CreateOuType;
