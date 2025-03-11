import React, { useState, useEffect } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Extension, Schedule, AlarmOn } from '@mui/icons-material';
import './VisitorTracking.css';
import { useAppointmentAnalyticsMutation } from '../../../../Redux/api/vms/vmsApi';

const VisitorTracking = () => {
  const [activeTab, setActiveTab] = useState('extensions');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedVisitor, setSelectedVisitor] = useState(null);

  // Fetch data based on the active tab
  const [fetchAnalytics, { data, isLoading, error }] = useAppointmentAnalyticsMutation();

  // Extract data from API response
  const apiData = data?.data || [];

  // Log API response for debugging
  useEffect(() => {
    console.log('API Response:', data);
  }, [data]);

  // Derive AppointmentStatus based on OverStay and CheckOutDateTime
  const deriveAppointmentStatus = (item) => {
    if (item.OverStay < 0) {
      return 'ExtendAppointment'; // OverStay is negative, indicating an extension
    } else if (item.CheckOutDateTime === null) {
      return 'ScheduledForLater'; // No checkout time, indicating scheduled for later
    } else if (item.LateMinutes > 0) {
      return 'LateCheckIn'; // Late check-in (if LateMinutes is available)
    } else {
      return 'LateCheckOut'; // Default to late check-out
    }
  };

  // Map API data to component data structure
  const visitorExtensions = apiData
    .filter(item => deriveAppointmentStatus(item) === 'ExtendAppointment')
    .map(item => ({
      appointmentId: item.AppointmentID,
      visitorName: item.VisitorName,
      visitorNo: item.MobileNo,
      hostName: item.HostName,
      endTime: item.AppDateTo ? new Date(item.AppDateTo).toLocaleTimeString() : 'N/A',
      action: 'Extend Appointment',
    }));

  const scheduledForLater = apiData
    .filter(item => deriveAppointmentStatus(item) === 'ScheduledForLater')
    .map(item => ({
      appointmentId: item.AppointmentID,
      visitorName: item.VisitorName,
      visitorNo: item.MobileNo,
      hostName: item.HostName,
      appointmentDate: item.AppDateFrom ? new Date(item.AppDateFrom).toLocaleDateString() : 'N/A',
      rescheduleDate: item.RescheduleDate ? new Date(item.RescheduleDate).toLocaleDateString() : 'N/A',
      rescheduleTime: item.RescheduleTime ? new Date(item.RescheduleTime).toLocaleTimeString() : 'N/A',
    }));

  const lateCheckIns = apiData
    .filter(item => deriveAppointmentStatus(item) === 'LateCheckIn')
    .map(item => ({
      appointmentId: item.AppointmentID,
      visitorName: item.VisitorName,
      visitorNo: item.MobileNo,
      hostName: item.HostName,
      appointmentTime: item.AppDateFrom ? new Date(item.AppDateFrom).toLocaleTimeString() : 'N/A',
      checkInTime: item.CheckInDateTime ? new Date(item.CheckInDateTime).toLocaleTimeString() : 'N/A',
      delayDuration: item.LateMinutes ? `${item.LateMinutes} mins` : 'N/A',
    }));

  const lateCheckOuts = apiData
    .filter(item => deriveAppointmentStatus(item) === 'LateCheckOut')
    .map(item => ({
      appointmentId: item.AppointmentID,
      visitorName: item.VisitorName,
      visitorNo: item.MobileNo,
      hostName: item.HostName,
      appointmentEndTime: item.AppDateTo ? new Date(item.AppDateTo).toLocaleTimeString() : 'N/A',
      actualExitTime: item.CheckOutDateTime ? new Date(item.CheckOutDateTime).toLocaleTimeString() : 'N/A',
      overStayDuration: item.OverStay ? `${Math.abs(item.OverStay)} mins` : 'N/A',
    }));

  // Fetch data when the active tab changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchAnalytics({
          UserRole: 'Admin', // Replace with dynamic role if needed
          EmployeeId: '1', // Replace with dynamic employee ID if needed
          date: new Date().toISOString().split('T')[0], // Current date
          AppointmentStatus: activeTab === 'extensions' ? 'ExtendAppointment' :
                            activeTab === 'scheduled' ? 'ScheduledForLater' :
                            activeTab === 'late' ? 'LateCheckIn' :
                            'LateCheckOut',
        });
      } catch (err) {
        console.error('Failed to fetch analytics:', err);
      }
    };

    fetchData();
  }, [activeTab, fetchAnalytics]);

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
            <IconButton  sx={{ padding: 0, fontSize: '12px' }}
            className={activeTab === 'extensions' ? 'active' : ''} 
            onClick={() => setActiveTab('extensions')}>
              <Extension  sx={{ fontSize: '16px' }}/>
            </IconButton>
          </Tooltip>
          <Tooltip title="Scheduled for Later">
            <IconButton sx={{ padding: 0, fontSize: '12px' }}
            className={activeTab === 'scheduled' ? 'active' : ''} onClick={() => setActiveTab('scheduled')}>
              <Schedule sx={{ fontSize: '16px' }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Late Check-In">
            <IconButton sx={{ padding: 0, fontSize: '12px' }}
            className={activeTab === 'late' ? 'active' : ''} onClick={() => setActiveTab('late')}>
              <AlarmOn sx={{ fontSize: '16px' }}/>
            </IconButton>
          </Tooltip>
          <Tooltip title="Late Check-Out">
            <IconButton sx={{ padding: 0, fontSize: '12px' }}
            className={activeTab === 'lateCheckOut' ? 'active' : ''} onClick={() => setActiveTab('lateCheckOut')}>
              <AlarmOn sx={{ fontSize: '16px' }} />
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
            {isLoading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error: {error.message}</p>
            ) : (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitorTracking;