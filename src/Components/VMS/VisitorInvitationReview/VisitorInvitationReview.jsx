import React, { useState } from "react";
import "./VisitorInvitationReview.css";

const VisitorInvitationReview = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    appointmentDate: "",
    host: "",
    location: "",
    purpose: "",
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleResponse = (response) => {
    setStatus(response);
    alert(`Invitation ${response}`);
  };

  return (
    <div className="visitor-invitation-review-card">
      <div className="visitor-invitation-review-card-content">
        <h2 className="visitor-invitation-review-title">Visitor Invitation</h2>
        <div className="visitor-invitation-review-form-group">
          <div className="visitor-invitation-review-input-group">
            <label htmlFor="name" className="visitor-invitation-review-label">Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="visitor-invitation-review-input" />
          </div>
          <div className="visitor-invitation-review-input-group">
            <label htmlFor="email" className="visitor-invitation-review-label">Email</label>
            <input type="text" name="email" value={formData.email} onChange={handleChange} className="visitor-invitation-review-input" />
          </div>
          <div className="visitor-invitation-review-input-group">
            <label htmlFor="phone" className="visitor-invitation-review-label">Phone</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="visitor-invitation-review-input" />
          </div>
          <div className="visitor-invitation-review-input-group">
            <label htmlFor="company" className="visitor-invitation-review-label">Company</label>
            <input type="text" name="company" value={formData.company} onChange={handleChange} className="visitor-invitation-review-input" />
          </div>
          <div className="visitor-invitation-review-input-group">
            <label htmlFor="appointmentDate" className="visitor-invitation-review-label">Appointment Date</label>
            <input type="datetime-local" name="appointmentDate" value={formData.appointmentDate} onChange={handleChange} className="visitor-invitation-review-input" />
          </div>
          <div className="visitor-invitation-review-input-group">
            <label htmlFor="host" className="visitor-invitation-review-label">Host</label>
            <input type="text" name="host" value={formData.host} onChange={handleChange} className="visitor-invitation-review-input" />
          </div>
          <div className="visitor-invitation-review-input-group">
            <label htmlFor="location" className="visitor-invitation-review-label">Location</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} className="visitor-invitation-review-input" />
          </div>
          <div className="visitor-invitation-review-input-group">
            <label htmlFor="purpose" className="visitor-invitation-review-label">Purpose</label>
            <input type="text" name="purpose" value={formData.purpose} onChange={handleChange} className="visitor-invitation-review-input" />
          </div>
        </div>
        <div className="visitor-invitation-review-button-group">
          <button className="visitor-invitation-review-button accept" onClick={() => handleResponse("Accepted")}>Accept</button>
          <button className="visitor-invitation-review-button decline" onClick={() => handleResponse("Declined")}>Decline</button>
        </div>
        {status && <p className="visitor-invitation-review-status">Invitation {status}</p>}
      </div>
    </div>
  );
};

export default VisitorInvitationReview;
