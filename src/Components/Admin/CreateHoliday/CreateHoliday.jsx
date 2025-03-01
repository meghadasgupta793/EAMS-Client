import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './createHoliday.css';
import Header from '../../Header/Header';
import { useCreateHolidayMutation } from '../../../Redux/api/admin/holidayApi';

const CreateHoliday = () => {
  const navigate = useNavigate();
  const [createHoliday, { isLoading }] = useCreateHolidayMutation();

  // Form state
  const [formData, setFormData] = useState({
    Name: '',
    StartDate: '',
    EndDate: ''
  });

  const [errorMessage, setErrorMessage] = useState('');

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleCreate = async () => {
    setErrorMessage(''); // Reset error message before validation

    if (!formData.Name || !formData.StartDate || !formData.EndDate) {
      setErrorMessage('All fields are required.');
      return;
    }
    if (formData.StartDate > formData.EndDate) {
      setErrorMessage('Start Date must be earlier than End Date.');
      return;
    }

    try {
      await createHoliday(formData).unwrap();
      alert('Holiday created successfully!');
      navigate('/holiday');
    } catch (error) {
      alert('Failed to create holiday');
    }
  };

  return (
    <div className='createHoliday'>
      <Header />
      <div className='create-holiday-container'>
        <h1>Create New Holiday</h1>
        <div className='holiday-form'>
          <div className='form-group'>
            <label>Festival Name</label>
            <input
              type="text"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              placeholder="Enter festival name"
            />
          </div>
          <div className='form-group'>
            <label>From Date</label>
            <input
              type="date"
              name="StartDate"
              value={formData.StartDate}
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <label>To Date</label>
            <input
              type="date"
              name="EndDate"
              value={formData.EndDate}
              onChange={handleChange}
            />
          </div>

          {/* Display validation error message only on form submission */}
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <div className='form-buttons'>
            <button className='back-btn' onClick={() => navigate('/holiday')}>Back to list</button>
            <button className='create-btn' onClick={handleCreate} disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateHoliday;
