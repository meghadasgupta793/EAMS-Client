import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateCategory.css'; // Ensure the correct path to CSS
import Header from '../../Header/Header';
import { useCreateCategoryMutation } from '../../../Redux/api/admin/categoryApi';

const CreateCategory = () => {
  const [createCategory, { isLoading }] = useCreateCategoryMutation(); 
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
      await createCategory(formData).unwrap();
      alert('Category created successfully!');
      navigate('/category'); // Navigate to category list page
    } catch (error) {
      console.error('Failed to create Category:', error);
      alert('Failed to create Category. Please try again.');
    }
  };

  // Handle navigation when 'Back to list' is clicked
  const handleBackToCategoryList = () => {
    navigate('/category'); // Navigate to '/category'
  };

  return (
    <div className='createCategory'>
      <Header />
      <div className='create-category-container'>
        <h1>Create New Category</h1>

        <form className='category-form' onSubmit={handleSubmit}>
          <div className='form-group'>
            <label>Category Code</label>
            <input 
              type="text" 
              name="Code"
              className='styled-input' 
              placeholder='Enter category code'
              value={formData.Code}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group'>
            <label>Category Name</label>
            <input 
              type="text" 
              name="Name"
              className='styled-input' 
              placeholder='Enter category name'
              value={formData.Name}
              onChange={handleChange}
              required
            />
          </div>

          <div className='form-buttons'>
            <button type="button" className='back-btn' onClick={handleBackToCategoryList}>Back to list</button>
            <button type="submit" className='create-btn' disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCategory;
