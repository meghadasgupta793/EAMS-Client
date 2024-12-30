import React from 'react'
import { useNavigate } from 'react-router-dom';
import './createShift.css'
import Header from '../../Header/Header'

const CreateShift = () => {


  const navigate = useNavigate();

  // Function to handle the navigation when 'Back to list' is clicked
  const handleBackToShiftList = () => {
    navigate('/shift'); // Navigate to '/shift'
  };



  return (
    <div className='createShift'>
      <Header />
      <div className='create-shift-container'>
        <h1>Create New Shift</h1>
        <div className='shift-form'>
          <div className='form-left'>
            <div className='form-group'>
              <label>Shift Code</label>
              <input type="text" />
            </div>
            <div className='form-group'>
              <label>Start Time</label>
              <input type="time" />
            </div>
            <div className='form-group'>
              <label>Late After</label>
              <input type="time" />
            </div>
            <div className='form-group'>
              <label>Early Exit Before</label>
              <input type="time" />
            </div>
          </div>
          <div className='form-right'>
            <div className='form-group'>
              <label>Shift Name</label>
              <input type="text" />
            </div>
            <div className='form-group'>
              <label>End Time</label>
              <input type="time" />
            </div>
            <div className='form-group'>
              <label>Late Calculated From</label>
              <input type="time" />
            </div>
          </div>
        </div>
        <div className='form-buttons'>
          <button className='back-btn' onClick={handleBackToShiftList}>Back to list</button>
          <button className='create-btn'>Create</button>
        </div>
      </div>
    </div>
  )
}

export default CreateShift
