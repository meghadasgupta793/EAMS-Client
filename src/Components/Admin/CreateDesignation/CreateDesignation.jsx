import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './createDesignation.css'; // Ensure the correct path to your CSS
import Header from '../../Header/Header';
import { useCreateDesignationMutation } from '../../../Redux/api/admin/designationApi'; // Import the mutation hook

const CreateDesignation = () => {
  const [designationCode, setDesignationCode] = useState('');
  const [designationName, setDesignationName] = useState('');

  const navigate = useNavigate();
  
  // Access the mutation hook
  const [createDesignation, { isLoading, isError, isSuccess }] = useCreateDesignationMutation();

  // Handle input changes
  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (designationCode && designationName) {
      try {
        await createDesignation({ Code: designationCode, Name: designationName }).unwrap();
        navigate('/designation'); // Redirect to Designation list page after successful creation
      } catch (error) {
        console.error('Failed to create designation:', error);
      }
    }
  };

  // Function to handle navigation back to Designation list
  const handleBackToDesignationList = () => {
    navigate('/designation'); // Navigate to '/designation' list page
  };

  return (
    <div className="createDesignation">
      <Header />
      <div className="create-designation-container">
        {/* Top Section - Title */}
        <h1>Create New Designation</h1>

        {/* Form Section */}
        <form className="designation-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Designation Code</label>
            <input
              type="text"
              value={designationCode}
              onChange={(e) => handleInputChange(e, setDesignationCode)}
              required
            />
          </div>
          <div className="form-group">
            <label>Designation Name</label>
            <input
              type="text"
              value={designationName}
              onChange={(e) => handleInputChange(e, setDesignationName)}
              required
            />
          </div>

          {/* Error / Success Message */}
          {isError && <p className="error-message">Failed to create designation. Please try again.</p>}
          {isSuccess && <p className="success-message">Designation created successfully!</p>}

          {/* Bottom Section - Buttons */}
          <div className="form-buttons">
            <button
              type="button"
              className="back-btn"
              onClick={handleBackToDesignationList}
            >
              Back to list
            </button>
            <button
              type="submit"
              className="create-btn"
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDesignation;
