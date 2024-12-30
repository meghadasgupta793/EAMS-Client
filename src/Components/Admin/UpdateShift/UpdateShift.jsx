import React from 'react'
import { useNavigate } from 'react-router-dom';
import './updateShift.css'
import Header from '../../Header/Header'

const UpdateShift = () => {
    const navigate = useNavigate();

    // Function to handle the navigation when 'Back to list' is clicked
    const handleBackToShiftList = () => {
        navigate('/shift'); // Navigate to '/shift'
    };
    return (
        <div className='update-shift'>
            <Header />
            <div className='update-shift-container'>
                <h1>Update Shift</h1>
                <div className='update-shift-form'>
                    <div className='update-shift-form-left'>
                        <div className='update-shift-form-group'>
                            <label>Shift Code</label>
                            <input type="text" />
                        </div>
                        <div className='update-shift-form-group'>
                            <label>Start Time</label>
                            <input type="time" />
                        </div>
                        <div className='update-shift-form-group'>
                            <label>Late After</label>
                            <input type="time" />
                        </div>
                        <div className='update-shift-form-group'>
                            <label>Early Exit Before</label>
                            <input type="time" />
                        </div>
                    </div>
                    <div className='update-shift-form-right'>
                        <div className='update-shift-form-group'>
                            <label>Shift Name</label>
                            <input type="text" />
                        </div>
                        <div className='update-shift-form-group'>
                            <label>End Time</label>
                            <input type="time" />
                        </div>
                        <div className='update-shift-form-group'>
                            <label>Late Calculated From</label>
                            <input type="time" />
                        </div>
                    </div>
                </div>
                <div className='update-shift-form-buttons'>
                    <button className='back-btn' onClick={handleBackToShiftList}>Back to list</button>
                    <button className='update-btn'>Update</button>
                </div>
            </div>
        </div>
    )
}

export default UpdateShift
