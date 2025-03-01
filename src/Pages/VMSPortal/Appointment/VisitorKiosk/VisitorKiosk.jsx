import React, { useState } from 'react';
import './VisitorKiosk.css';
import Select from 'react-select';

const VisitorKiosk = () => {
  const [isPreRegistered, setIsPreRegistered] = useState(null);
  const [verificationMethod, setVerificationMethod] = useState(null);
  const [formData, setFormData] = useState({
    visitorName: '',
    mobileNumber: '',
    email: '',
    address: '',
    identityType: 'Aadhar',
    identityNo: '',
    visitPurpose: 'Personal',
    cameFrom: 'Individual',
    company: '',
    personalReason: '',
    fromDate: '',
    toDate: '',
    fromTime: '',
    toTime: '',
  });
  const [image, setImage] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const employees = [
    { id: 1, EmployeeName: 'John Doe', Department: 'HR' },
    { id: 2, EmployeeName: 'Jane Smith', Department: 'Finance' },
    { id: 3, EmployeeName: 'Mike Johnson', Department: 'IT' },
  ];

  const filteredEmployees = employees.map(employee => ({
    label: employee.EmployeeName,
    value: employee.id,
    EmployeeName: employee.EmployeeName,
    Department: employee.Department,
  }));

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEmployeeChange = (selectedOption) => {
    setSelectedEmployee(selectedOption);
    setFormData({
      ...formData,
      employeeDepartment: selectedOption ? selectedOption.Department : '',
    });
  };

  const handlePreRegisteredClick = () => {
    setIsPreRegistered(true);
    setVerificationMethod(null); // Reset the verification method
  };

  const handleNewVisitorClick = () => {
    setIsPreRegistered(false);
  };

  const handleVerificationMethodSelect = (method) => {
    setVerificationMethod(method);
  };

  return (
    <div className="visitor-kiosk-container">
      {/* Welcome Screen */}
      {!isPreRegistered && (
        <div className="visitor-kiosk-welcome-screen">
          <h1>Welcome to Visitor Kiosk</h1>
          <p>Select an option to get started:</p>
          <div className="visitor-kiosk-options">
            <button className="visitor-kiosk-option-btn" onClick={handlePreRegisteredClick}>
              Pre-Registered
            </button>
            <button className="visitor-kiosk-option-btn" onClick={handleNewVisitorClick}>
              New Visitor
            </button>
          </div>
        </div>
      )}

      {/* Pre-Registered Check-In Section */}
      {isPreRegistered === true && verificationMethod === null && (
        <div className="visitor-kiosk-pre-registered-section">
          <h2>Pre-Registered Check-In</h2>
          <p>Please select your verification method:</p>
          <div className="visitor-kiosk-verification-methods">
            <button
              className="visitor-kiosk-verification-btn"
              onClick={() => handleVerificationMethodSelect('QR Code')}
            >
              QR Code Scan
            </button>
            <button
              className="visitor-kiosk-verification-btn"
              onClick={() => handleVerificationMethodSelect('Face Recognition')}
            >
              Face Recognition
            </button>
          </div>
        </div>
      )}

      {/* QR Code Scan or Face Recognition Verification */}
      {verificationMethod === 'QR Code' && (
        <div className="visitor-kiosk-verification-section">
          <h2>QR Code Scan</h2>
          <p>Please scan your QR code:</p>
          <div className="visitor-kiosk-scan-frame">
            <div className="scan-frame-content">
              <p>Scan your QR code here</p>
            </div>
          </div>
          <button className="visitor-kiosk-submit-btn">Scan QR Code</button>
        </div>
      )}

      {verificationMethod === 'Face Recognition' && (
        <div className="visitor-kiosk-verification-section">
          <h2>Face Recognition</h2>
          <p>Please position yourself in front of the camera:</p>
          <div className="visitor-kiosk-scan-frame">
            <div className="scan-frame-content">
              <p>Align your face inside the frame</p>
            </div>
          </div>
          <button className="visitor-kiosk-submit-btn">Start Face Recognition</button>
        </div>
      )}

      {/* New Visitor Registration */}
      {isPreRegistered === false && (
        <div className="visitor-kiosk-new-visitor-section">
          <h2>New Visitor Registration</h2>
          
          {/* Image Upload Section */}
          <div className="direct-appointment-image-upload-frame">
            {image ? (
              <img src={image} alt="Visitor" className="direct-appointment-uploaded-image" />
            ) : (
              <label className="upload-label">
                Click to Upload Image
                <input type="file" accept="image/*" onChange={handleImageChange} hidden />
              </label>
            )}
          </div>

          {/* Visitor Personal Info */}
          <fieldset>
            <legend>Visitor Personal Info</legend>
            <div className="direct-appointment-form-row">
              <input
                type="text"
                name="visitorName"
                value={formData.visitorName}
                onChange={handleInputChange}
                placeholder="Visitor Name"
                required
              />
              <input
                type="text"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                placeholder="Visitor Mobile Number"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Visitor Email"
                required
              />
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Visitor Address"
                required
              />
            </div>
          </fieldset>

          {/* Visit Purpose and Came From */}
          <fieldset>
            <legend>Visit Purpose and Came From</legend>
            <div className="direct-appointment-form-row">
              <select
                name="visitPurpose"
                value={formData.visitPurpose}
                onChange={handleInputChange}
              >
                <option value="Personal">Personal</option>
                <option value="Official">Official</option>
                <option value="Other">Other</option>
              </select>
              <select
                name="cameFrom"
                value={formData.cameFrom}
                onChange={handleInputChange}
              >
                <option value="Individual">Individual</option>
                <option value="Company">Company</option>
              </select>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Enter Company Name"
              />
              <input
                type="text"
                name="personalReason"
                value={formData.personalReason}
                onChange={handleInputChange}
                placeholder="Enter Personal Reason"
              />
            </div>
          </fieldset>

          {/* Appointment Duration */}
          <fieldset>
            <legend>Appointment Duration</legend>
            <div className="direct-appointment-form-row">
              <input
                type="date"
                name="fromDate"
                value={formData.fromDate}
                onChange={handleInputChange}
              />
              <input
                type="date"
                name="toDate"
                value={formData.toDate}
                onChange={handleInputChange}
              />
              <input
                type="time"
                name="fromTime"
                value={formData.fromTime}
                onChange={handleInputChange}
              />
              <input
                type="time"
                name="toTime"
                value={formData.toTime}
                onChange={handleInputChange}
              />
            </div>
          </fieldset>

          {/* Visit With */}
          <fieldset>
            <legend>Visit With</legend>
            <div className="direct-appointment-form-row">
              <Select
                options={filteredEmployees}
                value={selectedEmployee}
                onChange={handleEmployeeChange}
                getOptionLabel={(option) => option.EmployeeName}
                getOptionValue={(option) => option.value}
                className="react-select-container"
                classNamePrefix="react-select"
                placeholder="Search Employee Name"
              />
              <input
                type="text"
                value={selectedEmployee?.Department || ''}
                readOnly
                placeholder="Employee Department"
              />
            </div>
          </fieldset>

          {/* Submit Button */}
          <div className="direct-appointment-btn-container">
            <button type="submit" className="create-appointment-btn">
              Create Appointment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisitorKiosk;
