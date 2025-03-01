import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './updateDepartment.css'
import Header from '../../Header/Header';
import { useGetDepartmentByIdQuery, useUpdateDepartmentMutation } from '../../../Redux/api/admin/departmentApi';

function UpdateDepartment() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get department ID from URL

  const { data: departmentData, isLoading } = useGetDepartmentByIdQuery(id); // Fetch department data
  const [updateDepartment, { isLoading: isUpdating }] = useUpdateDepartmentMutation(); // Mutation hook for updating the department

  // State for form inputs
  const [formData, setFormData] = useState({
    Code: '',
    Name: ''
  });

  // Populate form when data is available
  useEffect(() => {
    if (departmentData?.data?.length > 0) {
      setFormData({
        Code: departmentData.data[0].Code,
        Name: departmentData.data[0].Name
      });
    }
  }, [departmentData]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDepartment({ id, ...formData }).unwrap();  // Submit updated data
      alert('Department updated successfully!');
      navigate('/department'); // Redirect to department list
    } catch (error) {
      console.error('Update failed:', error);
      alert('Failed to update department. Please try again.');
    }
  };

  // Handle back navigation
  const handleBackToDepartmentList = () => {
    navigate('/department');
  };

  if (isLoading) return <p>Loading department details...</p>;

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
            <input
              type="text"
              name="Code"
              value={formData.Code}
              onChange={handleChange} // Handle input change
            />
          </div>
          <div className='update-Department-form-group'>
            <label>Department Name</label>
            <input
              type="text"
              name="Name"
              value={formData.Name}
              onChange={handleChange} // Handle input change
            />
          </div>
        </div>

        {/* Bottom Section - Buttons */}
        <div className='update-department-form-buttons'>
          <button className='back-btn' onClick={handleBackToDepartmentList}>Back to list</button>
          <button className='update-btn' onClick={handleSubmit}>Update</button> {/* Submit form */}
        </div>
      </div>
    </div>
  );
}

export default UpdateDepartment;
