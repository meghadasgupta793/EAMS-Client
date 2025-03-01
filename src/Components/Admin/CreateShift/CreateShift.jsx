import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './createShift.css';
import Header from '../../Header/Header';
import { useCreateShiftMutation } from '../../../Redux/api/admin/shiftApi';

const CreateShift = () => {
  const navigate = useNavigate();
  const [createShift, { isLoading, isError }] = useCreateShiftMutation();

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

  // Function to handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setShiftDetails((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Function to handle form submission (create shift)
  const handleCreateShift = async () => {
    const { shiftCode, shiftName, startTime, endTime, lateAfter, earlyExitBefore, lateCalculatedFrom } = shiftDetails;

    // Ensure all values are correctly passed to the mutation
    try {
      await createShift({
        Code: shiftCode,
        Name: shiftName,
        StartTime: startTime,
        EndTime: endTime,
        LateAfter: lateAfter,
        EarlyExitBefore: earlyExitBefore,
        LateCalculatedFrom: lateCalculatedFrom
      }).unwrap();

      // Navigate to the shift list after successful creation
      navigate('/shift');
    } catch (err) {
      console.error('Failed to create shift:', err);
    }
  };

  // Function to handle the navigation when 'Back to list' is clicked
  const handleBackToShiftList = () => {
    navigate('/shift'); // Navigate to '/shift'
  };

  return (
    <div className="createShift">
      <Header />
      <div className="create-shift-container">
        <h1>Create New Shift</h1>
        <div className="shift-form">
          <div className="form-left">
            <div className="form-group">
              <label>Shift Code</label>
              <input
                type="text"
                name="shiftCode"
                value={shiftDetails.shiftCode}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Start Time</label>
              <input
                type="time"
                name="startTime"
                value={shiftDetails.startTime}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Late After</label>
              <input
                type="time"
                name="lateAfter"
                value={shiftDetails.lateAfter}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Early Exit Before</label>
              <input
                type="time"
                name="earlyExitBefore"
                value={shiftDetails.earlyExitBefore}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-right">
            <div className="form-group">
              <label>Shift Name</label>
              <input
                type="text"
                name="shiftName"
                value={shiftDetails.shiftName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>End Time</label>
              <input
                type="time"
                name="endTime"
                value={shiftDetails.endTime}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
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
        <div className="form-buttons">
          <button className="back-btn" onClick={handleBackToShiftList}>Back to list</button>
          <button
            className="create-btn"
            onClick={handleCreateShift}
            disabled={isLoading} // Disable the button while creating the shift
          >
            {isLoading ? 'Creating...' : 'Create'}
          </button>
        </div>
        {isError && <div className="error-message">Failed to create shift. Please try again.</div>}
      </div>
    </div>
  );
};

export default CreateShift;
