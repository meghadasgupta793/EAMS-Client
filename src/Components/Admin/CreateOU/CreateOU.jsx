import React, { useState } from 'react';
import './createOU.css'
import { useNavigate } from 'react-router-dom';
import Header from '../../Header/Header';

const CreateOU = () => {
  const navigate = useNavigate();

  // Dummy data for select fields
  const dummyData = {
    ouTypes: ['Company', 'Branch', 'Sub Branch'],
    parentOUs: ['CHENNAI', 'MUMBAI', 'HYDERABAD', 'KOLKATA'],
    ouOwners: ['John Doe', 'Jane Smith', 'Michael Johnson', 'Emily Davis']
  };

  // State for form fields
  const [formData, setFormData] = useState({
    ouCode: '',
    ouName: '',
    ouType: '',
    parentOU: '',
    ouOwner: ''
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Function to handle the navigation when 'Back to list' is clicked
  const handleBackToOuList = () => {
    navigate('/organization');
  };

  // Function to handle form submission (optional)
  const handleSubmit = () => {
    console.log('Form Data:', formData);
    // Add submission logic here
  };

  return (
    <div className='create-Ou'>
      <Header />
      <div className='create-Ou-container'>
        {/* Top Section - Title */}
        <h1>Create New Organizational Unit (OU)</h1>

        {/* Middle Section - Fields */}
        <div className='create-Ou-form'>
          {/* OU Code */}
          <div className='create-Ou-form-group'>
            <label>OU Code</label>
            <input
              type="text"
              name="ouCode"
              value={formData.ouCode}
              onChange={handleInputChange}
              placeholder="Enter OU Code"
            />
          </div>

          {/* OU Name */}
          <div className='create-Ou-form-group'>
            <label>OU Name</label>
            <input
              type="text"
              name="ouName"
              value={formData.ouName}
              onChange={handleInputChange}
              placeholder="Enter OU Name"
            />
          </div>

          {/* Select OuType */}
          <div className='create-Ou-form-group'>
            <label>OU Type</label>
            <select
              name="ouType"
              value={formData.ouType}
              onChange={handleInputChange}
            >
              <option value="">Select OU Type</option>
              {dummyData.ouTypes.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Select ParentOU */}
          <div className='create-Ou-form-group'>
            <label>Parent OU</label>
            <select
              name="parentOU"
              value={formData.parentOU}
              onChange={handleInputChange}
            >
              <option value="">Select Parent OU</option>
              {dummyData.parentOUs.map((parent, index) => (
                <option key={index} value={parent}>{parent}</option>
              ))}
            </select>
          </div>

          {/* Select OU Owner */}
          <div className='create-Ou-form-group'>
            <label>OU Owner</label>
            <select
              name="ouOwner"
              value={formData.ouOwner}
              onChange={handleInputChange}
            >
              <option value="">Select OU Owner</option>
              {dummyData.ouOwners.map((owner, index) => (
                <option key={index} value={owner}>{owner}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Bottom Section - Buttons */}
        <div className='create-Ou-form-buttons'>
          <button className='back-btn' onClick={handleBackToOuList}>Back to list</button>
          <button className='create-btn' onClick={handleSubmit}>Create</button>
        </div>
      </div>
    </div>
  );
};

export default CreateOU;
