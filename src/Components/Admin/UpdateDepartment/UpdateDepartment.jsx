import React from 'react'
import './updateDepartment.css'
import { useNavigate } from 'react-router-dom';
import Header from '../../Header/Header';

function UpdateDepartment() {
  const navigate = useNavigate();

  // Function to handle the navigation when 'Back to list' is clicked
  const handleBackToDepartmentList = () => {
    navigate('/department'); // Navigate to '/department'
  };
  return (
    <div className='update-department'>
      <Header />
      <div className='update-department-container'>
        {/* Top Section - Title */}
        <h1>Update Department</h1>

        {/* Middle Section - Two fields side by side */}
        <div className='update-department-form'>
          <div className='update-Department-form-group'>
            <label>Department Code</label>
            <input type="text" />
          </div>
          <div className='update-Department-form-group'>
            <label>Department Name</label>
            <input type="text" />
          </div>
        </div>

        {/* Bottom Section - Buttons */}
        <div className='update-department-form-buttons'>
          <button className='back-btn' onClick={handleBackToDepartmentList}>Back to list</button>
          <button className='update-btn'>Update</button>
        </div>
      </div>
    </div>
  )
}

export default UpdateDepartment
