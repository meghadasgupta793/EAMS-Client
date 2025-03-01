import React, { useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import Tooltip from '@mui/material/Tooltip';
import './UpdateOuOwner.css';
import { useUpdateOuOwnerMutation } from '../../../../Redux/api/admin/ouApi';

const UpdateOuOwner = ({ closeUpdateOuOwnerModal, ouOwner }) => {
    const [updateOuOwner, { isLoading: isUpdating, error }] = useUpdateOuOwnerMutation();
    
    const [id] = useState(ouOwner.ID || '');
    const [Name, setName] = useState(ouOwner.Name || '');
    const [MobNo, setMobNo] = useState(ouOwner.MobNo || '');
    const [EmailID, setEmailID] = useState(ouOwner.EmailID || '');
    const [SecondaryEmailID, setSecondaryEmailID] = useState(ouOwner.SecondaryEmailID || '');

    const handleUpdate = async () => {
        try {
            await updateOuOwner({ id, Name, MobNo, EmailID, SecondaryEmailID }).unwrap();
            closeUpdateOuOwnerModal(); // Close modal on success
        } catch (err) {
            console.error("Failed to update OU Owner:", err);
        }
    };

    return (
        <>
            <div className="backGround-Wrapper" onClick={closeUpdateOuOwnerModal}></div>
            <div className="updateOuOwner-container">
                <div className='updateOuOwner-header-container'>
                    <h1 className='updateOuOwner-heading'>Update OuOwner</h1>

                    <Tooltip title="Back to OuOwner List" placement="top">
                        <button className="ouOwner-action-btn ouOwner-cancel-btn" onClick={closeUpdateOuOwnerModal}>
                            <CancelIcon />
                        </button>
                    </Tooltip>
                </div>

                {error && <p className="error-message">Failed to update. Try again.</p>}

                <div className="updateOuOwner-form-container">
                    <label htmlFor="name" className="ouOwner-label">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={Name}
                        onChange={(e) => setName(e.target.value)}
                        className="ouOwner-input"
                        placeholder="Enter Name"
                        disabled={isUpdating}
                    />

                    <label htmlFor="mobileNo" className="ouOwner-label">Mobile No</label>
                    <input
                        type="text"
                        id="mobileNo"
                        value={MobNo}
                        onChange={(e) => setMobNo(e.target.value)}
                        className="ouOwner-input"
                        placeholder="Enter Mobile No"
                        disabled={isUpdating}
                    />

                    <label htmlFor="email" className="ouOwner-label">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={EmailID}
                        onChange={(e) => setEmailID(e.target.value)}
                        className="ouOwner-input"
                        placeholder="Enter Email"
                        disabled={isUpdating}
                    />

                    <label htmlFor="secondaryEmail" className="ouOwner-label">Secondary Email</label>
                    <input
                        type="email"
                        id="secondaryEmail"
                        value={SecondaryEmailID}
                        onChange={(e) => setSecondaryEmailID(e.target.value)}
                        className="ouOwner-input"
                        placeholder="Enter Secondary Email"
                        disabled={isUpdating}
                    />
                </div>

                <div className='button-section'>
                    <Tooltip title="Save OuOwner" placement="top">
                        <button 
                            className="ouOwner-action-btn ouOwner-save-btn" 
                            onClick={handleUpdate} 
                            disabled={isUpdating} 
                        >
                            {isUpdating ? "Saving..." : <SaveIcon />}
                        </button>
                    </Tooltip>
                </div>
            </div>
        </>
    );
};

export default UpdateOuOwner;
