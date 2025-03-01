import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateBatch.css'; // Ensure the correct path to CSS
import Header from '../../Header/Header';
import { useCreateBatchMutation } from '../../../Redux/api/admin/bacthApi';

const CreateBatch = () => {
  const [createBatch, { isLoading }] = useCreateBatchMutation(); 

  const navigate = useNavigate();
  
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
      await createBatch(formData).unwrap(); // Send the form data to the API
      alert('Batch created successfully!');
      navigate('/batch'); // Navigate to the batch list page after successful creation
    } catch (error) {
      console.error('Failed to create Batch:', error);
      alert('Failed to create Batch. Please try again.');
    }
  };

  // Function to handle the navigation when 'Back to list' is clicked
  const handleBackToBatchList = () => {
    navigate('/batch'); // Navigate to '/batch'
  };

  return (
    <div className='createBatch'>
      <Header />
      <div className='create-batch-container'>
        {/* Top Section - Title */}
        <h1>Create New Batch</h1>

        {/* Middle Section - Form with fields */}
        <form className='createBatch-form' onSubmit={handleSubmit}>
          <div className='createBatch-form-group'>
            <label>Batch Code</label>
            <input
              type="text"
              className='styled-input'
              name="Code" // Bind to 'Code' in formData
              value={formData.Code} // Bind the value of the input to formData.Code
              onChange={handleChange} // Update formData when the user types
              placeholder='Enter batch code'
            />
          </div>
          <div className='createBatch-form-group'>
            <label>Batch Name</label>
            <input
              type="text"
              className='styled-input'
              name="Name" // Bind to 'Name' in formData
              value={formData.Name} // Bind the value of the input to formData.Name
              onChange={handleChange} // Update formData when the user types
              placeholder='Enter batch name'
            />
          </div>

          {/* Bottom Section - Buttons */}
          <div className='createBatch-form-buttons'>
            <button type="button" className='back-btn' onClick={handleBackToBatchList}>Back to list</button>
            <button type="submit" className='create-btn' disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBatch;
