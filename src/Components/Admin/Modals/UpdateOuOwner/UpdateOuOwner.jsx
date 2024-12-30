import React, { useState } from 'react';
import SaveIcon from '@mui/icons-material/Save'; // Import the Save icon
import CancelIcon from '@mui/icons-material/Cancel'; // Import the Cancel icon
import Tooltip from '@mui/material/Tooltip'; // Import Tooltip component
import './UpdateOuOwner.css'; // Ensure to create corresponding CSS

const UpdateOuOwner = ({ closeUpdateOuOwnerModal, ouOwner }) => {
    // State for each input field initialized with ownerData
    const [name, setName] = useState(ouOwner.name || '');
    const [mobileNo, setMobileNo] = useState(ouOwner.mobile || '');
    const [email, setEmail] = useState(ouOwner.email || '');
    const [secondaryEmail, setSecondaryEmail] = useState(ouOwner.secondaryEmail || '');

    const handleSave = () => {
        // Logic for saving the updated OuOwner data
        const updatedOwnerData = {
            name,
            mobileNo,
            email,
            secondaryEmail,
        };
        console.log("OuOwner updated:", updatedOwnerData);
        // You might want to call an API to persist the changes here.
        closeUpdateOuOwnerModal(); // Close modal after saving
    };

    return (
        <>
            <div className="backGround-Wrapper" onClick={closeUpdateOuOwnerModal}></div>
            <div className="updateOuOwner-container">
                <div className='updateOuOwner-header-container'>
                    <h1 className='updateOuOwner-heading'>Update OuOwner</h1>

                    {/* Tooltip for Cancel button */}
                    <Tooltip title="Back to OuOwner List" placement="top">
                        <button className="ouOwner-action-btn ouOwner-cancel-btn" onClick={closeUpdateOuOwnerModal}>
                            <CancelIcon />
                        </button>
                    </Tooltip>
                </div>

                <div className="updateOuOwner-form-container">
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
                        <button className="ouOwner-action-btn ouOwner-save-btn" onClick={handleSave}>
                            <SaveIcon />
                        </button>
                    </Tooltip>
                </div>
            </div>
        </>
    );
};

export default UpdateOuOwner;
