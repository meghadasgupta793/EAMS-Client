import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './createDepartment.css'; // Ensure the correct path to CSS
import Header from '../../Header/Header';
import { useCreateDepartmentMutation } from '../../../Redux/api/admin/departmentApi';

const CreateDepartment = () => {
  const navigate = useNavigate();
  const [createDepartment, { isLoading, error }] = useCreateDepartmentMutation(); // Use the mutation hook

  // State to handle form data
  const [formData, setFormData] = useState({
    Code: '',
    Name: ''
  });

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make API call to create the department
      await createDepartment(formData).unwrap();
      alert('Department created successfully!');
      navigate('/department'); // Navigate to department list page
    } catch (error) {
      console.error('Failed to create department:', error);
      alert('Failed to create department. Please try again.');
    }
  };

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

        {/* Middle Section - Form Fields */}
        <div className='department-form'>
          <div className='form-group'>
            <label>Department Code</label>
            <input 
              type="text" 
              name="Code" 
              value={formData.Code}
              onChange={handleChange}
              placeholder="Enter department code" 
            />
          </div>
          <div className='form-group'>
            <label>Department Name</label>
            <input 
              type="text" 
              name="Name" 
              value={formData.Name}
              onChange={handleChange}
              placeholder="Enter department name" 
            />
          </div>
        </div>

        {/* Bottom Section - Buttons */}
        <div className='form-buttons'>
          <button className='back-btn' onClick={handleBackToDepartmentList}>Back to list</button>
          <button className='create-btn' onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create'}
          </button>
        </div>

        {/* Show error message if exists */}
        {error && <p className="error-message">{error.message}</p>}
      </div>
    </div>
  );
}

export default CreateDepartment;
