import React from 'react';
import { useNavigate } from 'react-router-dom';
import './createHoliday.css'; // Assuming you have a CSS file for styling
import Header from '../../Header/Header';

const CreateHoliday = () => {
  const navigate = useNavigate();

  // Function to handle the navigation when 'Back to list' is clicked
  const handleBackToHolidayList = () => {
    navigate('/holiday'); // Navigate to '/holiday'
  };

  return (
    <div className='createHoliday'>
      <Header />
      <div className='create-holiday-container'>
        <h1>Create New Holiday</h1>
        <div className='holiday-form'>
          <div className='form-group'>
            <label>Festival Name</label>
            <input type="text" placeholder="Enter festival name" />
          </div>
          <div className='form-group'>
            <label>From Date</label>
            <input type="date" />
          </div>
          <div className='form-group'>
            <label>To Date</label>
            <input type="date" />
          </div>
        </div>
        <div className='form-buttons'>
          <button className='back-btn' onClick={handleBackToHolidayList}>Back to list</button>
          <button className='create-btn'>Create</button>
        </div>
      </div>
    </div>
  );
};

export default CreateHoliday;
