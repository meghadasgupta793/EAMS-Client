import React from 'react';
import { useNavigate } from 'react-router-dom';
import './createDesignation.css'; // You can use the same CSS or create a new one for Designation
import Header from '../../Header/Header';

const CreateDesignation = () => {

  const navigate = useNavigate();

  // Function to handle the navigation when 'Back to list' is clicked
  const handleBackToDesignationList = () => {
    navigate('/designation'); // Navigate to '/designation'
  };

  return (
    <div className='createDesignation'>
      <Header />
      <div className='create-designation-container'>
        {/* Top Section - Title */}
        <h1>Create New Designation</h1>

        {/* Middle Section - Two fields side by side */}
        <div className='designation-form'>
          <div className='form-group'>
            <label>Designation Code</label>
            <input type="text" />
          </div>
          <div className='form-group'>
            <label>Designation Name</label>
            <input type="text" />
          </div>
        </div>

        {/* Bottom Section - Buttons */}
        <div className='form-buttons'>
          <button className='back-btn' onClick={handleBackToDesignationList}>Back to list</button>
          <button className='create-btn'>Create</button>
        </div>
      </div>
    </div>
  );
}

export default CreateDesignation;
