import React, { useState } from 'react';
import './createOU.css';
import { useNavigate } from 'react-router-dom';
import Header from '../../Header/Header';
import { useGetAllOuQuery, useGetAllOuTypeQuery, useGetAllOuOwnerQuery, useCreateOuMutation } from '../../../Redux/api/admin/ouApi';

const CreateOU = () => {
  const navigate = useNavigate();

  // Fetch the required data using RTK queries
  const { data: ouData, isLoading: isLoadingOu } = useGetAllOuQuery();
  const { data: ouTypeData, isLoading: isLoadingOuType } = useGetAllOuTypeQuery();
  const { data: ouOwnerData, isLoading: isLoadingOuOwner } = useGetAllOuOwnerQuery();
  const [createOu] = useCreateOuMutation();

  // State for form fields
  const [formData, setFormData] = useState({
    ouCode: '',
    ouName: '',
    ouType: '',
    parentOU: null, // Set default as null for Parent OU
    ouOwner: ''
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value === "" ? null : value // Convert empty string to null
    });
  };

  // Function to handle the navigation when 'Back to list' is clicked
  const handleBackToOuList = () => {
    navigate('/organization');
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    if (!formData.ouCode || !formData.ouName || !formData.ouType || !formData.ouOwner) {
      alert("All fields are required.");
      return;
    }

    const requestBody = {
      OUCode: formData.ouCode,
      OUName: formData.ouName,
      OUType: formData.ouType,
      ParentOU: formData.parentOU, // Null will be sent if no parent selected
      OwnerID: formData.ouOwner,
    };

    try {
      await createOu(requestBody).unwrap();
      alert("OU created successfully!");
      navigate("/organization");
    } catch (error) {
      console.error("Error creating OU:", error);
      alert("Failed to create OU.");
    }
  };

  // Show loading state until data is fetched
  if (isLoadingOu || isLoadingOuType || isLoadingOuOwner) {
    return <div>Loading...</div>;
  }

  return (
    <div className='create-Ou'>
      <Header />
      <div className='create-Ou-container'>
        <h1>Create New Organizational Unit (OU)</h1>

        <div className='create-Ou-form'>
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

          <div className='create-Ou-form-group'>
            <label>OU Type</label>
            <select
              name="ouType"
              value={formData.ouType}
              onChange={handleInputChange}
            >
              <option value="">Select OU Type</option>
              {ouTypeData?.data.map((ouType) => (
                <option key={ouType.ID} value={ouType.ID.toString()}>{ouType.OUType}</option>
              ))}
            </select>
          </div>

          <div className='create-Ou-form-group'>
            <label>Parent OU</label>
            <select
              name="parentOU"
              value={formData.parentOU || ""} // Default to empty string for null value
              onChange={handleInputChange}
            >
              <option value="">Select Parent OU</option>
              {ouData?.data.map((ou) => (
                <option key={ou.ID} value={ou.ID.toString()}>{ou.OUName}</option>
              ))}
            </select>
          </div>

          <div className='create-Ou-form-group'>
            <label>OU Owner</label>
            <select
              name="ouOwner"
              value={formData.ouOwner}
              onChange={handleInputChange}
            >
              <option value="">Select OU Owner</option>
              {ouOwnerData?.data.map((ouOwner) => (
                <option key={ouOwner.ID} value={ouOwner.ID.toString()}>{ouOwner.Name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className='create-Ou-form-buttons'>
          <button className='back-btn' onClick={handleBackToOuList}>Back to list</button>
          <button className='create-btn' onClick={handleSubmit}>Create</button>
        </div>
      </div>
    </div>
  );
};

export default CreateOU;
