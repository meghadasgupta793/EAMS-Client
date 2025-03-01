import React, { useState, useEffect } from 'react';
import './updateDesignation.css';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../Header/Header';
import { useGetDesignationByIdQuery, useUpdateDesignationMutation } from '../../../Redux/api/admin/designationApi';

const UpdateDesignation = () => {
    const { id } = useParams(); // Get the ID from the URL parameters
    const navigate = useNavigate();

    // Fetch the designation data for the specific ID
    const { data: designationData, isLoading, isError } = useGetDesignationByIdQuery(id);
    const [updateDesignation, { isLoading: isUpdating }] = useUpdateDesignationMutation();

    // State for the form fields
    const [designation, setDesignation] = useState({
        Code: '',
        Name: '',
    });

    // UseEffect to populate the form fields when data is fetched
    useEffect(() => {
        if (designationData && designationData.data && designationData.data.length > 0) {
            const { Code, Name } = designationData.data[0]; // Get the first designation from the array
            setDesignation({
                Code,
                Name,
            });
        }
    }, [designationData]);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDesignation((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle form submission to update the designation
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateDesignation({ id, ...designation }).unwrap();
            navigate('/designation'); // Redirect to the designation list after successful update
        } catch (err) {
            console.error('Failed to update designation', err);
        }
    };

    // Function to handle the navigation when 'Back to list' is clicked
    const handleBackToDesignationList = () => {
        navigate('/designation'); // Navigate to '/designation'
    };

    // Show loading or error message if data is being fetched or if there's an error
    if (isLoading) return <p>Loading designation...</p>;
    if (isError) return <p>Error loading designation data.</p>;

    return (
        <div className='update-Designation'>
            <Header />
            <div className='update-designation-container'>
                {/* Top Section - Title */}
                <h1>Update Designation</h1>

                {/* Middle Section - Two fields side by side */}
                <form onSubmit={handleSubmit} className='update-designation-form'>
                    <div className='update-designation-form-group'>
                        <label>Designation Code</label>
                        <input
                            type="text"
                            name="Code"
                            value={designation.Code}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className='update-designation-form-group'>
                        <label>Designation Name</label>
                        <input
                            type="text"
                            name="Name"
                            value={designation.Name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    {/* Bottom Section - Buttons */}
                    <div className='update-designation-form-buttons'>
                        <button className='back-btn' onClick={handleBackToDesignationList}>Back to list</button>
                        <button
                            type="submit"
                            className='update-btn'
                            disabled={isUpdating}
                        >
                            {isUpdating ? 'Updating...' : 'Update'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateDesignation;
