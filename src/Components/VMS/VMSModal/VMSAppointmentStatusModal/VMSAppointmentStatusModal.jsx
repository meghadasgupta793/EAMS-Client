import React, { useState, useContext, useCallback, useEffect } from 'react';
import './VMSAppointmentStatusModal.css';
import { useDashBoardAppointmentStatusDetailsMutation, useApprovedAppointmentMutation, useCheckOutAppointmentMutation } from "../../../../Redux/api/vms/vmsApi";
import { UserContext } from '../../../../StoreContext/UserContext';
import { IconButton, Tooltip } from '@mui/material';
import {
  KeyboardDoubleArrowLeft as KeyboardDoubleArrowLeftIcon,
  KeyboardDoubleArrowRight as KeyboardDoubleArrowRightIcon,
  CloudDownload as CloudDownloadIcon,
  Close as CloseIcon,
  Search as SearchIcon,
  Check,
  CheckCircle,
  RemoveRedEye,
  Logout as LogoutIcon
} from '@mui/icons-material';
import BadgeIcon from '@mui/icons-material/Badge';
import config from '../../../../secrect';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const VMSAppointmentStatusModal = ({ title, onClose }) => {
  const [DashBoardAppointmentStatusDetails] = useDashBoardAppointmentStatusDetailsMutation();
  const [approvedAppointment] = useApprovedAppointmentMutation();
  const [checkOutAppointment] = useCheckOutAppointmentMutation();

  const { userInfo } = useContext(UserContext);
  const { UserRole, EmployeeId, id } = userInfo || {};
  const date = new Date().toLocaleDateString('en-CA'); // Get current date in YYYY-MM-DD format
  const { VisitorImgUrl } = config;
  const navigate = useNavigate();

  // State for managing data, loading, and error
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  // State for search functionality
  const [searchActive, setSearchActive] = useState(false);
  const [searchQueries, setSearchQueries] = useState({
    visitorName: '',
    contactNo: '',
    appointeeName: '',
    appointeeDepartment: '',
    startDate: '',
    endDate: '',
  });

  // Fetch appointment status details
  const handleSubmit = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await DashBoardAppointmentStatusDetails({
        UserRole,
        EmployeeId,
        date,
        AppointmentStatus: title
      }).unwrap();
      setData(response.data || []); // Set fetched data
    } catch (error) {
      console.error('Failed to fetch dashboard status details', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [DashBoardAppointmentStatusDetails, UserRole, EmployeeId, date, title]);

  // Fetch data on component mount or when title changes
  useEffect(() => {
    handleSubmit();
  }, [handleSubmit]);

  // Handle approval of an appointment
  const handleApproveAppointment = async (AppointmentId) => {
    try {
      const response = await approvedAppointment({
        ID: AppointmentId,
        ApprovedByUserId: id
      }).unwrap();

      toast.success('Appointment approved successfully!');
      handleSubmit(); // Refresh data after approval
    } catch (error) {
      console.error('Failed to approve appointment:', error);
      toast.error('Failed to approve appointment. Please try again.');
    }
  };

  // Handle navigation to CheckIn page
  const handleCheckIn = (AppointmentId) => {
    navigate(`/vms/appointment/checkIn/${AppointmentId}`);
  };

   // Handle approval of an appointment
   const handleCheckOutAppointment = async (AppointmentId) => {
    try {
      // Ensure `id` is available
      if (!id) {
        throw new Error('User ID is missing. Please log in again.');
      }
  
      // Log the payload for debugging
      const payload = {
        AppointmentID: AppointmentId,
        CheckOutByUserID: id,
      };
      console.log('Checkout Payload:', payload);
  
      const response = await checkOutAppointment(payload).unwrap();
  
      console.log('Checkout Response:', response); // Debugging log
      toast.success('Appointment checked out successfully!');
      handleSubmit(); // Refresh data after checkout
    } catch (error) {
      console.error('Failed to check out appointment:', error); // Debugging log
      toast.error('Failed to check out appointment. Please try again.');
    }
  };

  // Filter data based on search queries
  const filteredData = data.filter(item => {
    // Always include rows with AppointmentStatus: "CheckedIn"
    if (item.AppointmentStatus === "CheckedIn") {
      return true;
    }

    // Apply search queries to other rows
    return (
      item.VisitorName?.toLowerCase().includes(searchQueries.visitorName.toLowerCase()) &&
      item.MobileNo?.includes(searchQueries.contactNo) &&
      item.EmployeeName?.toLowerCase().includes(searchQueries.appointeeName.toLowerCase()) &&
      (item.Department?.toLowerCase().includes(searchQueries.appointeeDepartment.toLowerCase()) || 'N/A') &&
      item.StartTime?.includes(searchQueries.startDate) &&
      item.EndTime?.includes(searchQueries.endDate)
    );
  });

  // Pagination logic
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  // Handle next page
  const handleNext = () => {
    setCurrentPage(prev => prev + 1);
  };

  // Handle previous page
  const handlePrevious = () => {
    setCurrentPage(prev => prev - 1);
  };


 // Function to handle opening VisitorPass in a new tab
const handleVisitorPass = (appointmentId) => {
  // Open a new tab with the VisitorPass route
  window.open(`/visitor-pass/${appointmentId}`, '_blank');
};








  // Render action buttons based on appointment status
  const renderButtons = (title, value, tableMeta) => {
    const AppointmentId = tableMeta.rowData[0];

    switch (title) {
      case 'Pending':
        return (
          <div style={{ display: 'flex', gap: '8px' }}>
            <Tooltip title="Approve Appointment">
              <IconButton onClick={() => handleApproveAppointment(AppointmentId)}>
                <Check />
              </IconButton>
            </Tooltip>
            <Tooltip title="Cancel Appointment">
              <IconButton>
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </div>
        );
      case 'Confirmed':
        return (
          <div style={{ display: 'flex', gap: '8px' }}>
            <Tooltip title="Check In">
              <IconButton onClick={() => handleCheckIn(AppointmentId)}>
                <CheckCircle />
              </IconButton>
            </Tooltip>
          </div>
        );
      case 'CheckedIn':
        return (
          <div style={{ display: 'flex', gap: '8px' }}>
            <Tooltip title="Visitor Pass">
            <IconButton onClick={() => handleVisitorPass(AppointmentId)}>
                <BadgeIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Check Out">
              <IconButton onClick={() => handleCheckOutAppointment(AppointmentId)}>
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </div>
        );
      case 'Completed':
        return (
          <div style={{ display: 'flex', gap: '8px' }}>
            <Tooltip title="View Details">
              <IconButton onClick={() => handleViewCard(AppointmentId)}>
                <RemoveRedEye />
              </IconButton>
            </Tooltip>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="VMSAppointmentStatusModal-overlay">
      <div className="VMSAppointmentStatusModal-content">
        {/* Header Section */}
        <div className="VMSAppointmentStatusModal-header-container">
          <h1 className="VMSAppointmentStatusModal-heading">{title} Visitors</h1>
          <div className="VMSAppointmentStatusModal-icon-container">
            <Tooltip title="Search">
              <IconButton onClick={() => setSearchActive(!searchActive)}>
                <SearchIcon className="VMSAppointmentStatusModal-header-icon" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Download in Excel">
              <IconButton>
                <CloudDownloadIcon className="VMSAppointmentStatusModal-header-icon" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Close">
              <IconButton onClick={onClose}>  {/* Call onClose when the close button is clicked */}
                <CloseIcon className="VMSAppointmentStatusModal-header-icon" />
              </IconButton>
            </Tooltip>
          </div>
        </div>

        {/* Loading and Error Handling */}
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error?.message || "Something went wrong"}</p>}

        {/* Table Section */}
        <table className="VMSAppointmentStatusModal-table">
          <thead>
            <tr>
              <th>Appointment ID</th>
              <th>Visitor Photo</th>
              <th>Visitor Name</th>
              <th>Contact No.</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Appointee Name</th>
              <th>Appointee Department</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map(item => (
              <tr key={item.AppointmentId}>
                <td>{item.AppointmentId}</td>
                <td>
                  <img
                    src={item.VisitorPhoto ? `${VisitorImgUrl}/${item.VisitorPhoto.trim()}` : 'images/profile.png'}
                    className="visitor-img"
                    alt="Visitor"
                  />
                </td>
                <td>{item.VisitorName}</td>
                <td>{item.MobileNo}</td>
                <td>{item.StartTime}</td>
                <td>{item.EndTime}</td>
                <td>{item.EmployeeName || "N/A"}</td>
                <td>{item.Department || "N/A"}</td>
                <td>{renderButtons(title, item, { rowData: [item.AppointmentId] })}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className='pagination-container'>
          {currentPage > 1 && (
            <IconButton onClick={handlePrevious}>
              <KeyboardDoubleArrowLeftIcon className='pagination-btn' />
            </IconButton>
          )}
          <span>{currentPage}</span>
          {endIndex < filteredData.length && (
            <IconButton onClick={handleNext}>
              <KeyboardDoubleArrowRightIcon className='pagination-btn' />
            </IconButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default VMSAppointmentStatusModal;