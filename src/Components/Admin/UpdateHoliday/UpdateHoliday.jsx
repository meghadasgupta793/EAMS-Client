import React from 'react'
import { useNavigate } from 'react-router-dom';
import './updateHoliday.css'; // Assuming you have a CSS file for styling
import Header from '../../Header/Header';

const UpdateHoliday = () => {

    const navigate = useNavigate();

    // Function to handle the navigation when 'Back to list' is clicked
    const handleBackToHolidayList = () => {
      navigate('/holiday'); // Navigate to '/holiday'
    };
  
  return (
    <div className='update-holiday'>
      <Header />
      <div className='update-holiday-container'>
        <h1>Update Holiday</h1>
        <div className='update-holiday-form'>
          <div className='update-holiday-form-group'>
            <label>Festival Name</label>
            <input type="text" placeholder="Enter festival name" />
          </div>
          <div className='update-holiday-form-group'>
            <label>Date</label>
            <input type="date" />
          </div>
        </div>
        <div className='update-holiday-form-buttons'>
          <button className='back-btn' onClick={handleBackToHolidayList}>Back to list</button>
          <button className='update-btn'>Update</button>
        </div>
      </div>
    </div>
  )
}

export default UpdateHoliday
