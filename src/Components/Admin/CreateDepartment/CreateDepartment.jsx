import React from 'react';
import { useNavigate } from 'react-router-dom';
import './createDepartment.css'; // Ensure the correct path to CSS
import Header from '../../Header/Header';

const CreateDepartment = () => {

  const navigate = useNavigate();

  // Function to handle the navigation when 'Back to list' is clicked
  const handleBackToDepartmentList = () => {
    navigate('/department'); // Navigate to '/department'
  };

  return (
    <div className='createDepartment'>
      <Header />
      <div className='create-department-container'>
        {/* Top Section - Title */}
        <h1>Create New Department</h1>

        {/* Middle Section - Two fields side by side */}
        <div className='department-form'>
          <div className='form-group'>
            <label>Department Code</label>
            <input type="text" />
          </div>
          <div className='form-group'>
            <label>Department Name</label>
            <input type="text" />
          </div>
        </div>

        {/* Bottom Section - Buttons */}
        <div className='form-buttons'>
          <button className='back-btn' onClick={handleBackToDepartmentList}>Back to list</button>
          <button className='create-btn'>Create</button>
        </div>
      </div>
    </div>
  );
}

export default CreateDepartment;
