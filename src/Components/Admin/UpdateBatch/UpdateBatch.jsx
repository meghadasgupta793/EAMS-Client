import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './UpdateBatch.css'; // Ensure the correct path to CSS
import Header from '../../Header/Header';
import { useGetBatchByIdQuery, useUpdateBatchMutation } from '../../../Redux/api/admin/bacthApi';

const UpdateBatch = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get batch ID from URL
  const { data: batchData, isLoading } = useGetBatchByIdQuery(id); // Fetch batch data
  const [updateBatch, { isLoading: isUpdating }] = useUpdateBatchMutation(); // Mutation hook for updating the batch
  
  // State for form inputs
  const [formData, setFormData] = useState({
    Code: '',
    Name: ''
  });

  // Populate form when data is available
  useEffect(() => {
    if (batchData?.data?.length > 0) {
      setFormData({
        Code: batchData.data[0].Code,
        Name: batchData.data[0].Name
      });
    }
  }, [batchData]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle update batch
  const handleUpdate = async () => {
    try {
      await updateBatch({ id, ...formData }).unwrap();
      alert('Batch updated successfully');
      navigate('/batch');
    } catch (err) {
      console.error('Failed to update Batch:', err);
      alert('Failed to update Batch. Please try again.');
    }
  };

  // Function to handle the navigation when 'Back to list' is clicked
  const handleBackToBatchList = () => {
    navigate('/batch'); // Navigate to '/batch'
  };

  return (
    <div className='updateBatch'>
      <Header />
      <div className='update-batch-container'>
        {/* Top Section - Title */}
        <h1>Update Batch</h1>

        {/* Middle Section - Two fields side by side */}
        <div className='updateBatch-form'>
          <div className='updateBatch-form-group'>
            <label>Batch Code</label>
            <input
              type="text"
              className='styled-input'
              name="Code"
              value={formData.Code} // Bind the value to formData.Code
              onChange={handleChange}
              placeholder='Enter batch code'
            />
          </div>
          <div className='updateBatch-form-group'>
            <label>Batch Name</label>
            <input
              type="text"
              className='styled-input'
              name="Name"
              value={formData.Name} // Bind the value to formData.Name
              onChange={handleChange}
              placeholder='Enter batch name'
            />
          </div>
        </div>

        {/* Bottom Section - Buttons */}
        <div className='updateBatch-form-buttons'>
          <button className='back-btn' onClick={handleBackToBatchList}>Back to list</button>
          <button
            className='update-btn'
            onClick={handleUpdate} // Call the handleUpdate function when clicked
            disabled={isUpdating} // Disable the button while updating
          >
            {isUpdating ? 'Updating...' : 'Update'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateBatch;
