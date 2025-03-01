import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './updateHoliday.css';
import Header from '../../Header/Header';
import { useGetHolidayByIdQuery, useUpdateHolidayMutation } from '../../../Redux/api/admin/holidayApi';

const UpdateHoliday = () => {
    const { id } = useParams(); // Get holiday ID from URL
    console.log("Holiday ID from URL:", id); // Debugging ID

    const { data: holidayData, isLoading, error } = useGetHolidayByIdQuery(id); // Fetch holiday data
    console.log("API Response:", holidayData); // Debugging API response

    const [updateHoliday, { isLoading: isUpdating }] = useUpdateHolidayMutation();
    const navigate = useNavigate();

    // Extract holiday object from the array
    const holiday = holidayData?.data?.[0] || {};

    // Form state
    const [formData, setFormData] = useState({
        Name: '',
        StartDate: '',
        EndDate: ''
    });

    const [errorMessage, setErrorMessage] = useState(''); // Validation error state

    // Populate form with existing data when available
    useEffect(() => {
        if (holiday?.ID) {
            setFormData({
                Name: holiday.Name || '',
                StartDate: holiday.StartDate?.split('T')[0] || '',
                EndDate: holiday.EndDate?.split('T')[0] || ''
            });
        }
    }, [holiday]);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handle form submission
    const handleUpdate = async () => {
        setErrorMessage(""); // Reset error message before validation

        if (!formData.Name || !formData.StartDate || !formData.EndDate) {
            setErrorMessage("All fields are required.");
            return;
        }
        if (formData.StartDate > formData.EndDate) {
            setErrorMessage("Start Date must be earlier than End Date.");
            return;
        }

        try {
            await updateHoliday({ id, ...formData }).unwrap();
            alert('Holiday updated successfully!');
            navigate('/holiday');
        } catch (error) {
            alert('Failed to update holiday');
        }
    };

    return (
        <div className='update-holiday'>
            <Header />
            <div className='update-holiday-container'>
                <h1>Update Holiday</h1>

                {isLoading ? (
                    <p>Loading holiday details...</p>
                ) : error ? (
                    <p>Error fetching holiday details!</p>
                ) : (
                    <div className='update-holiday-form'>
                        <div className='update-holiday-form-group'>
                            <label>Festival Name</label>
                            <input
                                type="text"
                                name="Name"
                                value={formData.Name}
                                onChange={handleChange}
                                placeholder="Enter festival name"
                            />
                        </div>
                        <div className='update-holiday-form-group'>
                            <label>From Date</label>
                            <input
                                type="date"
                                name="StartDate"
                                value={formData.StartDate}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='update-holiday-form-group'>
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

                        <div className='update-holiday-form-buttons'>
                            <button className='back-btn' onClick={() => navigate('/holiday')}>Back to list</button>
                            <button className='update-btn' onClick={handleUpdate} disabled={isUpdating}>
                                {isUpdating ? 'Updating...' : 'Update'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UpdateHoliday;
