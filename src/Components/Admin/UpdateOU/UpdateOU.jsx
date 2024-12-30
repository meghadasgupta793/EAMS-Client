import React, { useState, useEffect } from 'react';
import './updateOU.css';
import { useNavigate } from 'react-router-dom';
import Header from '../../Header/Header';

const UpdateOU = ({ ouData }) => {
  const navigate = useNavigate();

  // Dummy data for select fields
  const dummyData = {
    ouTypes: ['Company', 'Branch', 'Sub Branch'],
    parentOUs: ['CHENNAI', 'MUMBAI', 'HYDERABAD', 'KOLKATA'],
    ouOwners: ['John Doe', 'Jane Smith', 'Michael Johnson', 'Emily Davis']
  };

  // Initialize form state with the existing OU data (passed as props or fetched from API)
  const [formData, setFormData] = useState({
    ouCode: ouData?.ouCode || '',
    ouName: ouData?.ouName || '',
    ouType: ouData?.ouType || '',
    parentOU: ouData?.parentOU || '',
    ouOwner: ouData?.ouOwner || ''
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
    console.log('Updated OU Data:', formData);
    // Add your update logic here (e.g., make an API call to update the OU)
  };

  return (
    <div className='update-Ou'>
      <Header />
      <div className='update-Ou-container'>
        {/* Top Section - Title */}
        <h1>Update Organizational Unit (OU)</h1>

        {/* Middle Section - Fields */}
        <div className='update-Ou-form'>
          {/* OU Code */}
          <div className='update-Ou-form-group'>
            <label>OU Code</label>
            <input
              type="text"
              name="ouCode"
              value={formData.ouCode}
              onChange={handleInputChange}
              placeholder="Enter OU Code"
              disabled // Disable OU code if it shouldn't be changed
            />
          </div>

          {/* OU Name */}
          <div className='update-Ou-form-group'>
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
          <div className='update-Ou-form-group'>
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
          <div className='update-Ou-form-group'>
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
          <div className='update-Ou-form-group'>
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
        <div className='update-Ou-form-buttons'>
          <button className='back-btn' onClick={handleBackToOuList}>Back to list</button>
          <button className='create-btn' onClick={handleSubmit}>Update</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateOU;
