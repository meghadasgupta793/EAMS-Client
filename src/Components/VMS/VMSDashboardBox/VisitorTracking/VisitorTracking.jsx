import React, { useState } from 'react';
import { IconButton, Tooltip, Menu, MenuItem } from '@mui/material';
import { Notifications, Security, Schedule, Edit, Delete, Extension, AlarmOn, MoreVert } from '@mui/icons-material';
import './VisitorTracking.css';

const VisitorTracking = () => {
  const [activeTab, setActiveTab] = useState('extensions');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedVisitor, setSelectedVisitor] = useState(null);

  const handleMenuOpen = (event, visitor) => {
    setAnchorEl(event.currentTarget);
    setSelectedVisitor(visitor);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedVisitor(null);
  };

 // Sample Data
const visitorExtensions = [
  
  { appointmentId: '1', visitorName: 'John Doe', visitorNo: '12345', hostName: 'Sarah Lee', hostMobileNo: '9876543210', endTime: '3:30 PM', action: 'Extend Appointment' },
  { appointmentId: '2', visitorName: 'Jane Smith', visitorNo: '54321', hostName: 'David Kim', hostMobileNo: '8765432109', endTime: '4:15 PM', action: 'Extend Appointment' },
  { appointmentId: '3', visitorName: 'Alice Brown', visitorNo: '78901', hostName: 'Michael Scott', hostMobileNo: '1112233445', endTime: '5:00 PM', action: 'Extend Appointment' },
  { appointmentId: '4', visitorName: 'Bob Green', visitorNo: '98765', hostName: 'Angela Martin', hostMobileNo: '9988776655', endTime: '6:00 PM', action: 'Extend Appointment' },
];

const scheduledForLater = [
  { appointmentId: '5', visitorName: 'Michael Johnson', visitorNo: '67890', hostName: 'Sarah Lee', appointmentDate: '2025-02-05', rescheduleDate: '2025-02-07', rescheduleTime: '5:30 PM' },
  { appointmentId: '6', visitorName: 'Emily White', visitorNo: '23456', hostName: 'David Kim', appointmentDate: '2025-02-06', rescheduleDate: '2025-02-08', rescheduleTime: '6:15 PM' },
  { appointmentId: '7', visitorName: 'Chris Evans', visitorNo: '34567', hostName: 'Pam Beesly', appointmentDate: '2025-02-10', rescheduleDate: '2025-02-12', rescheduleTime: '3:00 PM' },
  { appointmentId: '8', visitorName: 'Natalie Porter', visitorNo: '45678', hostName: 'Jim Halpert', appointmentDate: '2025-02-11', rescheduleDate: '2025-02-13', rescheduleTime: '4:30 PM' },
];

const lateCheckIns = [
  { appointmentId: '9', visitorName: 'Chris Brown', visitorNo: '11223', hostName: 'Sarah Lee', appointmentTime: '2:00 PM', checkInTime: '2:30 PM', delayDuration: '30 mins' },
  { appointmentId: '10', visitorName: 'Daniel White', visitorNo: '78910', hostName: 'Michael Scott', appointmentTime: '10:00 AM', checkInTime: '10:15 AM', delayDuration: '15 mins' },
  { appointmentId: '11', visitorName: 'Evelyn Smith', visitorNo: '11234', hostName: 'Jim Halpert', appointmentTime: '11:30 AM', checkInTime: '12:00 PM', delayDuration: '30 mins' },
  { appointmentId: '12', visitorName: 'Zach Taylor', visitorNo: '22345', hostName: 'Pam Beesly', appointmentTime: '1:00 PM', checkInTime: '1:30 PM', delayDuration: '30 mins' },
];

const lateCheckOuts = [
  { appointmentId: '13', visitorName: 'Jessica Taylor', visitorNo: '55678', hostName: 'David Kim', appointmentEndTime: '4:00 PM', actualExitTime: '4:30 PM', overStayDuration: '30 mins' },
  { appointmentId: '14', visitorName: 'Tom Harris', visitorNo: '99887', hostName: 'Michael Scott', appointmentEndTime: '5:00 PM', actualExitTime: '5:20 PM', overStayDuration: '20 mins' },
  { appointmentId: '15', visitorName: 'Olivia Brown', visitorNo: '77665', hostName: 'Sarah Lee', appointmentEndTime: '6:30 PM', actualExitTime: '7:00 PM', overStayDuration: '30 mins' },
  { appointmentId: '16', visitorName: 'Luke Davis', visitorNo: '44556', hostName: 'Jim Halpert', appointmentEndTime: '3:00 PM', actualExitTime: '3:15 PM', overStayDuration: '15 mins' },
];


  // Box content based on selected tab
  const getTabDetails = () => {
    switch (activeTab) {
      case 'extensions':
        return { title: 'Extend Appointment', description: 'Track visitors who have extended their stay and notify the relevant parties.' };
      case 'scheduled':
        return { title: 'Scheduled for Later', description: 'Monitor visitors who have scheduled appointments for later and notify the hosts.' };
      case 'late':
        return { title: 'Late Check-In', description: 'Keep track of visitors who have checked in late and notify the appropriate parties.' };
      case 'lateCheckOut':
        return { title: 'Late Check-Out', description: 'Monitor visitors who have overstayed and notify relevant parties.' };
      default:
        return { title: '', description: '' };
    }
  };

  const tabDetails = getTabDetails();

  return (
    <div className="visitor-tracking-container">
      <div className="visitor-tracking-tabs">
        <div className="tabs-container">
          <Tooltip title="Extend Appointment">
            <IconButton className={activeTab === 'extensions' ? 'active' : ''} onClick={() => setActiveTab('extensions')}>
              <Extension />
            </IconButton>
          </Tooltip>
          <Tooltip title="Scheduled for Later">
            <IconButton className={activeTab === 'scheduled' ? 'active' : ''} onClick={() => setActiveTab('scheduled')}>
              <Schedule />
            </IconButton>
          </Tooltip>
          <Tooltip title="Late Check-In">
            <IconButton className={activeTab === 'late' ? 'active' : ''} onClick={() => setActiveTab('late')}>
              <AlarmOn />
            </IconButton>
          </Tooltip>
          <Tooltip title="Late Check-Out">
            <IconButton className={activeTab === 'lateCheckOut' ? 'active' : ''} onClick={() => setActiveTab('lateCheckOut')}>
              <AlarmOn />
            </IconButton>
          </Tooltip>
        </div>
        <div className="visitor-tracking-box">
          <h4>{tabDetails.title}</h4>
          <p>{tabDetails.description}</p>
        </div>
      </div>

      <div className="visitor-tracking-content">
        <div className="visitor-tracking-section">
          <div className="visitor-tracking-table-container">
            <div className="visitor-tracking-header-container">
              <h3 className="visitor-tracking-heading">{tabDetails.title} ⏳</h3>
            </div>
            <table className="visitor-tracking-table">
              <thead>
                <tr>
                  <th>Appointment ID</th>
                  <th>Visitor Name</th>
                  <th>Visitor No.</th>
                  <th>Host Name</th>
                  {activeTab === 'extensions' && <><th>End Time</th><th>Action</th></>}
                  {activeTab === 'scheduled' && <><th>Appointment Date</th><th>Reschedule Date</th><th>Reschedule Time</th></>}
                  {activeTab === 'late' && <><th>Appointment Time</th><th>Check-In Time</th><th>Delay Duration</th></>}
                  {activeTab === 'lateCheckOut' && <><th>Appointment End Time</th><th>Actual Exit Time</th><th>Overstay Duration</th></>}
                </tr>
              </thead>
              <tbody>
                {(activeTab === 'extensions' ? visitorExtensions : 
                  activeTab === 'scheduled' ? scheduledForLater : 
                  activeTab === 'late' ? lateCheckIns : 
                  lateCheckOuts).map((visitor, index) => (
                  <tr key={index}>
                    <td>{visitor.appointmentId}</td>
                    <td>{visitor.visitorName}</td>
                    <td>{visitor.visitorNo}</td>
                    <td>{visitor.hostName}</td>
                    {activeTab === 'extensions' && <><td>{visitor.endTime}</td><td>{visitor.action}</td></>}
                    {activeTab === 'scheduled' && <><td>{visitor.appointmentDate}</td><td>{visitor.rescheduleDate}</td><td>{visitor.rescheduleTime}</td></>}
                    {activeTab === 'late' && <><td>{visitor.appointmentTime}</td><td>{visitor.checkInTime}</td><td>{visitor.delayDuration}</td></>}
                    {activeTab === 'lateCheckOut' && <><td>{visitor.appointmentEndTime}</td><td>{visitor.actualExitTime}</td><td>{visitor.overStayDuration}</td></>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitorTracking;
