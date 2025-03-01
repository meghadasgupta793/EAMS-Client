import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './updateOU.css';
import Header from '../../Header/Header';
import { useGetAllOuQuery, useUpdateOuMutation, useGetAllOuTypeQuery, useGetAllOuOwnerQuery } from '../../../Redux/api/admin/ouApi';

const UpdateOU = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get OU ID from URL

  // Fetch all OUs
  const { data: ouData, isLoading } = useGetAllOuQuery();
  const [updateOu, { isLoading: isUpdating }] = useUpdateOuMutation();

  // Fetch OU Type and OU Owner data from respective APIs
  const { data: ouTypeData, isLoading: isLoadingOuType, error: ouTypeError } = useGetAllOuTypeQuery();
  const { data: ouOwnerData, isLoading: isLoadingOuOwner, error: ouOwnerError } = useGetAllOuOwnerQuery();

  // State for form data
  const [formData, setFormData] = useState({
    ouCode: '',
    ouName: '',
    ouType: '', // Will hold the OU Type ID for submission
    parentOU: '', // Will hold the Parent OU ID for submission
    ouOwner: '' // Will hold the OU Owner ID for submission
  });

  // State for Parent OU names for the dropdown
  const [parentOUs, setParentOUs] = useState([]);

  // Load OU details into the form when data is available
  useEffect(() => {
    if (ouData?.data) {
      const selectedOU = ouData.data.find((ou) => ou.ID.toString() === id);
      if (selectedOU) {
        setFormData({
          ouCode: selectedOU.OUCode || '',
          ouName: selectedOU.OUName || '',
          ouType: selectedOU.OUType?.toString() || '', // Store ID, not name
          parentOU: selectedOU.ParentOU?.toString() || '', // Store ID
          ouOwner: selectedOU.OwnerID?.toString() || '', // Store ID
        });
      }

      // Populate the Parent OU dropdown with all OUs except itself
      setParentOUs(ouData.data.filter((ou) => ou.ID.toString() !== id));
    }
  }, [ouData, id]);


  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!formData.ouCode || !formData.ouName || !formData.ouType || !formData.parentOU || !formData.ouOwner) {
      alert("All fields are required.");
      return;
    }

    // Ensure the form values are mapped correctly
    const requestBody = {
      id, // Retrieved from URL
      OUCode: formData.ouCode,
      OUName: formData.ouName,
      OUType: formData.ouType, // Directly using the selected ID
      ParentOU: formData.parentOU !== '' ? formData.parentOU : null, // Convert empty to null
      OwnerID: formData.ouOwner !== '' ? formData.ouOwner : null, // Convert empty to null
    };

    console.log("Final Request Body:", requestBody); // Debugging

    try {
      const response = await updateOu(requestBody).unwrap();
      console.log("API Response:", response);
      alert("OU updated successfully!");
      navigate("/organization");
    } catch (error) {
      console.error("Error updating OU:", error);
      alert("Failed to update OU.");
    }
  };




  return (
    <div className='update-Ou'>
      <Header />
      <div className='update-Ou-container'>
        <h1>Update Organizational Unit (OU)</h1>

        <div className='update-Ou-form'>
          {/* OU Code */}
          <div className='update-Ou-form-group'>
            <label>OU Code</label>
            <input
              type="text"
              name="ouCode"
              value={formData.ouCode}
              onChange={handleInputChange}
              disabled
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
            />
          </div>

          {/* OU Type */}
          <div className='update-Ou-form-group'>
            <label>OU Type</label>
            <select name="ouType" value={formData.ouType} onChange={handleInputChange}>
              <option value="">Select OU Type</option>
              {ouTypeData?.data.map((ouType) => (
                <option key={ouType.ID} value={ouType.ID.toString()}>{ouType.OUType}</option>
              ))}
            </select>
          </div>

          {/* Parent OU */}
          <div className='update-Ou-form-group'>
            <label>Parent OU</label>
            <select name="parentOU" value={formData.parentOU} onChange={handleInputChange}>
              <option value="">Select Parent OU</option>
              {parentOUs.map((ou) => (
                <option key={ou.ID} value={ou.ID.toString()}>{ou.OUName}</option>
              ))}
            </select>
          </div>

          {/* OU Owner */}
          <div className='update-Ou-form-group'>
            <label>OU Owner</label>
            <select name="ouOwner" value={formData.ouOwner} onChange={handleInputChange}>
              <option value="">Select OU Owner</option>
              {ouOwnerData?.data.map((ouOwner) => (
                <option key={ouOwner.ID} value={ouOwner.ID.toString()}>{ouOwner.Name}</option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className='update-Ou-form-buttons'>
            <button className='back-btn' onClick={() => navigate('/organization')}>
              Back to list
            </button>
            <button className='create-btn' onClick={handleSubmit} disabled={isUpdating}>
              {isUpdating ? 'Updating...' : 'Update'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateOU;
