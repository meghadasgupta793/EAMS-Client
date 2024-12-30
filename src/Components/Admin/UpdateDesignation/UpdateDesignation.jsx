import React from 'react'
import './updateDesignation.css'
import { useNavigate } from 'react-router-dom';
import Header from '../../Header/Header';


const UpdateDesignation = () => {


    const navigate = useNavigate();

    // Function to handle the navigation when 'Back to list' is clicked
    const handleBackToDesignationList = () => {
      navigate('/designation'); // Navigate to '/designation'
    };




  return (
    <div className='update-Designation'>
      <Header />
      <div className='update-designation-container'>
        {/* Top Section - Title */}
        <h1>Update Designation</h1>

        {/* Middle Section - Two fields side by side */}
        <div className='update-designation-form'>
          <div className='update-designation-form-group'>
            <label>Designation Code</label>
            <input type="text" />
          </div>
          <div className='update-designation-form-group'>
            <label>Designation Name</label>
            <input type="text" />
          </div>
        </div>

        {/* Bottom Section - Buttons */}
        <div className='update-designation-form-buttons'>
          <button className='back-btn' onClick={handleBackToDesignationList}>Back to list</button>
          <button className='update-btn'>Update</button>
        </div>
      </div>
    </div>
  )
}

export default UpdateDesignation
