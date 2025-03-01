import React from 'react';
import './VisitorPass.css';
import config from '../../../secrect';
import { useParams } from 'react-router-dom';
import { useAppointmentDetailsByidQuery } from '../../../Redux/api/vms/vmsApi'; // Corrected import

const VisitorPass = () => {
  const { appointmentId } = useParams(); // Get appointmentId from the URL
  const { data, isLoading, isError } = useAppointmentDetailsByidQuery(appointmentId); // Corrected hook usage

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching visitor details.</p>;

  // Extract the first appointment from the data array
  const appointment = data?.data?.[0];

  const { VisitorImgUrl } = config;

  // Construct the visitor photo URL (only if VisitorPhoto is available)
  const visitorPhoto = appointment?.VisitorPhoto
    ? `${VisitorImgUrl}/${appointment.VisitorPhoto.trim()}`
    : null; // No default image

  return (
    <div className="visitorpass">
      {/* Visitor Photo (only render if visitorPhoto is available) */}
      {visitorPhoto && (
        <div className="visitorpass-photo">
          <img
            src={visitorPhoto} // Directly use the constructed URL
            alt="Visitor"
            className="visitorpass-photo-img"
            onError={(e) => {
              // Hide the image if it fails to load
              e.target.style.display = 'none';
            }}
          />
        </div>
      )}

      {/* Visitor and Host Details */}
      <div className="visitorpass-details">
        <div className="visitorpass-detail-item">
          <span className="visitorpass-label">Visitor Name:</span>
          <span className="visitorpass-value">{appointment?.VisitorName || 'N/A'}</span>
        </div>
        <div className="visitorpass-detail-item">
          <span className="visitorpass-label">Visitor Contact No:</span>
          <span className="visitorpass-value">{appointment?.MobileNo || 'N/A'}</span>
        </div>
        <div className="visitorpass-detail-item">
          <span className="visitorpass-label">Host Name:</span>
          <span className="visitorpass-value">{appointment?.EmployeeName || 'N/A'}</span>
        </div>
        <div className="visitorpass-detail-item">
          <span className="visitorpass-label">Host Contact No:</span>
          <span className="visitorpass-value">{appointment?.PhoneNo || 'N/A'}</span>
        </div>
        <div className="visitorpass-detail-item">
          <span className="visitorpass-label">Appointment Date:</span>
          <span className="visitorpass-value">
            {appointment?.StartTime ? new Date(appointment.StartTime).toLocaleDateString() : 'N/A'}
          </span>
        </div>
        <div className="visitorpass-detail-item">
          <span className="visitorpass-label">Appointment Time:</span>
          <span className="visitorpass-value">
            {appointment?.StartTime ? new Date(appointment.StartTime).toLocaleTimeString() : 'N/A'}
          </span>
        </div>
      </div>

      {/* QR Code Section */}
      <div className="visitorpass-qrcode">
        <img
          src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=AppointmentID-${appointmentId}`}
          alt="QR Code"
          className="visitorpass-qrcode-img"
        />
        <p className="visitorpass-qrcode-label">Scan for Biometric Access</p>
      </div>

      {/* Signatures Section */}
      <div className="visitorpass-signatures">
        <div className="visitorpass-signature">
          <span className="visitorpass-label">Host Signature:</span>
          <div className="visitorpass-signature-box"></div>
        </div>
        <div className="visitorpass-signature">
          <span className="visitorpass-label">Visitor Signature:</span>
          <div className="visitorpass-signature-box"></div>
        </div>
      </div>
    </div>
  );
};

export default VisitorPass;