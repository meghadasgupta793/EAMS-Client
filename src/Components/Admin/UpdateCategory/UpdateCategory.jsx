import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './UpdateCategory.css'; // Ensure the correct path to CSS
import Header from '../../Header/Header';
import { useUpdateCategoryMutation, useGetCategoryByIdQuery } from '../../../Redux/api/admin/categoryApi';

const UpdateCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get category ID from URL
  const { data: categoryData, isLoading } = useGetCategoryByIdQuery(id); // Fetch category data
  const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation(); // Mutation hook for updating the category

  // State for form inputs
  const [formData, setFormData] = useState({
    Code: '',
    Name: ''
  });

  // Populate form when data is available
  useEffect(() => {
    if (categoryData?.data?.length > 0) {
      setFormData({
        Code: categoryData.data[0].Code,
        Name: categoryData.data[0].Name
      });
    }
  }, [categoryData]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle update category
  const handleUpdate = async () => {
    try {
      await updateCategory({ id, ...formData }).unwrap();
      alert('Category updated successfully');
      navigate('/category');
    } catch (err) {
      console.error('Failed to update category:', err);
      alert('Failed to update category. Please try again.');
    }
  };

  // Function to handle the navigation when 'Back to list' is clicked
  const handleBackToCategoryList = () => {
    navigate('/category'); // Navigate to '/category'
  };

  return (
    <div className='updateCategory'>
      <Header />
      <div className='update-category-container'>
        {/* Top Section - Title */}
        <h1>Update Category</h1>

        {/* Middle Section - Two fields side by side */}
        <div className='update-category-form'>
          <div className='update-category-form-group'>
            <label>Category Code</label>
            <input 
              type="text" 
              className='styled-input' 
              placeholder='Enter category code' 
              name='Code'
              value={formData.Code}
              onChange={handleChange} 
            />
          </div>
          <div className='update-category-form-group'>
            <label>Category Name</label>
            <input 
              type="text" 
              className='styled-input' 
              placeholder='Enter category name' 
              name='Name'
              value={formData.Name}
              onChange={handleChange} 
            />
          </div>
        </div>

        {/* Bottom Section - Buttons */}
        <div className='update-category-form-buttons'>
          <button className='back-btn' onClick={handleBackToCategoryList}>Back to list</button>
          <button className='update-btn' onClick={handleUpdate} disabled={isUpdating}>
            {isUpdating ? 'Updating...' : 'Update'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateCategory;
