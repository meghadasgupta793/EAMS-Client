import React, { useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import Tooltip from '@mui/material/Tooltip';
import './UpdateOuType.css';
import { useUpdateOuTypeMutation } from '../../../../Redux/api/admin/ouApi';

const UpdateOuType = ({ closeUpdateOuTypeModal, SelectedOuType }) => {
    const [updateOuType, { isLoading: isUpdating, error }] = useUpdateOuTypeMutation(); 
    
    const [ouType, setOuType] = useState(SelectedOuType.OUType || '');
    const [ouTypeId] = useState(SelectedOuType.ID || ''); // Keep ID fixed

    const handleUpdate = async () => {
        try {
            await updateOuType({ id: ouTypeId, OUType: ouType }).unwrap();
            closeUpdateOuTypeModal(); // Close modal on success
        } catch (err) {
            console.error("Failed to update OU Type:", err);
        }
    };

    return (
        <>
            <div className="backGround-Wrapper" onClick={closeUpdateOuTypeModal}></div>
            <div className="updateOuType-container">
                <div className='updateOuType-header-container'>
                    <h1 className='updateOuType-heading'>Update OuType</h1>

                    <Tooltip title="Back to OuType List" placement="top">
                        <button className="ouType-action-btn ouType-cancel-btn" onClick={closeUpdateOuTypeModal}>
                            <CancelIcon />
                        </button>
                    </Tooltip>
                </div>

                {error && <p className="error-message">Failed to update. Try again.</p>}

                <div className="updateOuType-form-container">
                    <label htmlFor="ouType" className="ouType-label">OuType</label>
                    <input
                        type="text"
                        id="ouType"
                        value={ouType}
                        onChange={(e) => setOuType(e.target.value)}
                        className="ouType-input"
                        placeholder="Update OuType"
                        disabled={isUpdating} // Disable input while updating
                    />
                </div>

                <div className='button-section'>
                    <Tooltip title="Save Updated OuType" placement="top">
                        <button 
                            className="ouType-action-btn ouType-save-btn" 
                            onClick={handleUpdate} 
                            disabled={isUpdating} // Disable button while updating
                        >
                            {isUpdating ? "Saving..." : <SaveIcon />}
                        </button>
                    </Tooltip>
                </div>
            </div>
        </>
    );
};

export default UpdateOuType;
