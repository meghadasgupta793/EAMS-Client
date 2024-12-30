import React, { useRef } from 'react';
import './MyProfileUpdate.css';
import Header from '../../../Components/Header/Header';

const MyProfileUpdate = () => {
    const fileInputRef = useRef(null);

    const handlePhotoClick = () => {
        fileInputRef.current.click();
    };

    const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Process the file (e.g., upload or display a preview)
            console.log("Selected file:", file);
        }
    };

    return (
        <div className='myProfileUpdate'>
            <Header />
            <div className='myProfileUpdate-container'>
                <h1>My Profile Update</h1>
                <div className='myProfileUpdate-photo'>
                    <div className='myProfileUpdate-photo-frame' onClick={handlePhotoClick}>
                        <img src="/images/kharush.png" alt="Employee" className="myProfileUpdate-profile-photo" />
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handlePhotoChange}
                            style={{ display: 'none' }}
                        />
                    </div>
                </div>

                <div className='myProfileUpdate-form-section'>
                    <div className='myProfileUpdate-form-row'>
                        <div className='myProfileUpdate-form-group'><label>Full Name</label><input type='text' /></div>
                        <div className='myProfileUpdate-form-group'><label>Email ID</label><input type='email' /></div>
                        <div className='myProfileUpdate-form-group'><label>Mobile No</label><input type='tel' /></div>
                        <div className='myProfileUpdate-form-group'><label>Alternate Mobile No</label><input type='tel' /></div>
                        <div className='myProfileUpdate-form-group'><label>Date of Birth</label><input type='date' /></div>
                        <div className='myProfileUpdate-form-group'><label>Father's Name</label><input type='text' /></div>
                    </div>

                    <div className='myProfileUpdate-form-row'>
                        <div className='myProfileUpdate-form-group'><label>Aadhaar No</label><input type='text' /></div>
                        <div className='myProfileUpdate-form-group'><label>PAN No</label><input type='text' /></div>
                        <div className='myProfileUpdate-form-group'><label>Voter ID</label><input type='text' /></div>
                        <div className='myProfileUpdate-form-group'><label>UAN</label><input type='text' /></div>
                        <div className='myProfileUpdate-form-group'><label>PF No</label><input type='text' /></div>
                        <div className='myProfileUpdate-form-group'><label>ESI No</label><input type='text' /></div>
                    </div>

                    <div className='myProfileUpdate-form-row'>
                        <div className='myProfileUpdate-form-group myProfileUpdate-full-width'><label>Address 1</label><input type='text' /></div>
                        <div className='myProfileUpdate-form-group myProfileUpdate-full-width'><label>Address 2</label><input type='text' /></div>
                        <div className='myProfileUpdate-form-group'><label>Country</label><input type='text' /></div>
                        <div className='myProfileUpdate-form-group'><label>State</label><input type='text' /></div>
                        <div className='myProfileUpdate-form-group'><label>City</label><input type='text' /></div>
                        <div className='myProfileUpdate-form-group'><label>Zip</label><input type='text' /></div>
                    </div>
                    <div className='myProfileUpdate-button-container'>
                        <button>Update</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyProfileUpdate;
