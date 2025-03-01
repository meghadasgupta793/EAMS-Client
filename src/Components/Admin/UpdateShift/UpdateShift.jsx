import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './updateShift.css';
import Header from '../../Header/Header';
import { useGetShiftByCodeQuery, useUpdateShiftMutation } from '../../../Redux/api/admin/shiftApi';

const UpdateShift = () => {
    const { Code } = useParams(); // Get batch ID from URL
    const { data: shiftData, isLoading } = useGetShiftByCodeQuery(Code);
    const [updateShift, { isLoading: isUpdating }] = useUpdateShiftMutation();
    const navigate = useNavigate();

    // State for form fields
    const [shiftDetails, setShiftDetails] = useState({
        shiftCode: '',
        shiftName: '',
        startTime: '',
        endTime: '',
        lateAfter: '',
        earlyExitBefore: '',
        lateCalculatedFrom: ''
    });

    // Load shift data into form fields once data is fetched
    useEffect(() => {
        if (shiftData && shiftData.data.length > 0) {
            const shift = shiftData.data[0]; // Assuming the data array contains one shift
            setShiftDetails({
                shiftCode: shift.Code || '',
                shiftName: shift.Name || '',
                startTime: shift.StartTime ? shift.StartTime.slice(11, 16) : '', // Extract time portion
                endTime: shift.EndTime ? shift.EndTime.slice(11, 16) : '', // Extract time portion
                lateAfter: shift.LateAfter ? shift.LateAfter.slice(11, 16) : '',
                earlyExitBefore: shift.EarlyExitBefore ? shift.EarlyExitBefore.slice(11, 16) : '',
                lateCalculatedFrom: shift.LateCalculatedFrom ? shift.LateCalculatedFrom.slice(11, 16) : ''
            });
        }
    }, [shiftData]);

    // Function to handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setShiftDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Function to handle form submission (update shift)
    const handleUpdateShift = async () => {
        const { shiftCode, shiftName, startTime, endTime, lateAfter, earlyExitBefore, lateCalculatedFrom } = shiftDetails;

        // Ensure all values are correctly passed to the mutation
        await updateShift({
            Code: shiftCode,
            Name: shiftName,
            StartTime: startTime,
            EndTime: endTime,
            LateAfter: lateAfter,
            EarlyExitBefore: earlyExitBefore,
            LateCalculatedFrom: lateCalculatedFrom
        });

        // Optionally, you can navigate back to the shift list or show a success message
        navigate('/shift');
    };

    // Function to handle the navigation when 'Back to list' is clicked
    const handleBackToShiftList = () => {
        navigate('/shift'); // Navigate to '/shift'
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className='update-shift'>
            <Header />
            <div className='update-shift-container'>
                <h1>Update Shift</h1>
                <div className='update-shift-form'>
                    <div className='update-shift-form-left'>
                        <div className='update-shift-form-group'>
                            <label>Shift Code</label>
                            <input
                                type="text"
                                name="shiftCode"
                                value={shiftDetails.shiftCode}
                                onChange={handleChange}
                                disabled // Optionally make this field read-only if it can't be changed
                            />
                        </div>
                        <div className='update-shift-form-group'>
                            <label>Start Time</label>
                            <input
                                type="time"
                                name="startTime"
                                value={shiftDetails.startTime}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='update-shift-form-group'>
                            <label>Late After</label>
                            <input
                                type="time"
                                name="lateAfter"
                                value={shiftDetails.lateAfter}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='update-shift-form-group'>
                            <label>Early Exit Before</label>
                            <input
                                type="time"
                                name="earlyExitBefore"
                                value={shiftDetails.earlyExitBefore}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className='update-shift-form-right'>
                        <div className='update-shift-form-group'>
                            <label>Shift Name</label>
                            <input
                                type="text"
                                name="shiftName"
                                value={shiftDetails.shiftName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='update-shift-form-group'>
                            <label>End Time</label>
                            <input
                                type="time"
                                name="endTime"
                                value={shiftDetails.endTime}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='update-shift-form-group'>
                            <label>Late Calculated From</label>
                            <input
                                type="time"
                                name="lateCalculatedFrom"
                                value={shiftDetails.lateCalculatedFrom}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
                <div className='update-shift-form-buttons'>
                    <button className='back-btn' onClick={handleBackToShiftList}>Back to list</button>
                    <button
                        className='update-btn'
                        onClick={handleUpdateShift}
                        disabled={isUpdating} // Disable the button when update is in progress
                    >
                        {isUpdating ? 'Updating...' : 'Update'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateShift;
