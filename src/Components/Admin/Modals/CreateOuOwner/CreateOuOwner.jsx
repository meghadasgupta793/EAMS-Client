import React, { useState } from 'react';
import SaveIcon from '@mui/icons-material/Save'; // Import the Save icon
import CancelIcon from '@mui/icons-material/Cancel'; // Import the Cancel icon
import Tooltip from '@mui/material/Tooltip'; // Import Tooltip component
import './CreateOuOwner.css'; // Ensure to create corresponding CSS
import { useCreateOuOwnerMutation } from '../../../../Redux/api/admin/ouApi';

const CreateOuOwner = ({ closeOuOwnerModal }) => {
    // State for each input field
    const [name, setName] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [email, setEmail] = useState('');
    const [secondaryEmail, setSecondaryEmail] = useState('');
    
    // Mutation hook
    const [createOuOwner, { isLoading, error }] = useCreateOuOwnerMutation();

    const handleSave = async () => {
        const ownerData = {
            Name: name,
            MobNo: mobileNo,
            EmailID: email,
            SecondaryEmailID: secondaryEmail,
        };

        try {
            await createOuOwner(ownerData).unwrap();
            // After successful save, close modal
            closeOuOwnerModal();
        } catch (err) {
            console.error("Error creating OuOwner:", err);
        }
    };

    const handleCancel = () => {
        // Reset the form state when the modal is closed
        setName('');
        setMobileNo('');
        setEmail('');
        setSecondaryEmail('');
        closeOuOwnerModal();
    };

    return (
        <>
            <div className="backGround-Wrapper" onClick={handleCancel}></div>
            <div className="addOuOwner-container">
                <div className='addOuOwner-header-container'>
                    <h1 className='addOuOwner-heading'>Create OuOwner</h1>

                    {/* Tooltip for Cancel button */}
                    <Tooltip title="Back to OuOwner List" placement="top">
                        <button className="ouOwner-action-btn ouOwner-cancel-btn" onClick={handleCancel}>
                            <CancelIcon />
                        </button>
                    </Tooltip>
                </div>

                <div className="addOuOwner-form-container">
                    <label htmlFor="name" className="ouOwner-label">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="ouOwner-input"
                        placeholder="Enter Name"
                    />

                    <label htmlFor="mobileNo" className="ouOwner-label">Mobile No</label>
                    <input
                        type="text"
                        id="mobileNo"
                        value={mobileNo}
                        onChange={(e) => setMobileNo(e.target.value)}
                        className="ouOwner-input"
                        placeholder="Enter Mobile No"
                    />

                    <label htmlFor="email" className="ouOwner-label">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="ouOwner-input"
                        placeholder="Enter Email"
                    />

                    <label htmlFor="secondaryEmail" className="ouOwner-label">Secondary Email</label>
                    <input
                        type="email"
                        id="secondaryEmail"
                        value={secondaryEmail}
                        onChange={(e) => setSecondaryEmail(e.target.value)}
                        className="ouOwner-input"
                        placeholder="Enter Secondary Email"
                    />
                </div>

                <div className='button-section'>
                    {/* Tooltip for Save button */}
                    <Tooltip title="Save OuOwner" placement="top">
                        <button
                            className="ouOwner-action-btn ouOwner-save-btn"
                            onClick={handleSave}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Saving...' : <SaveIcon />}
                        </button>
                    </Tooltip>
                </div>

                {/* Error message */}
                {error && <p className="error-message">Error: {error.message}</p>}
            </div>
        </>
    );
};

export default CreateOuOwner;
