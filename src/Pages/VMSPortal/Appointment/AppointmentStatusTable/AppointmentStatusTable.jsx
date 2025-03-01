import React, { useState, useContext, useCallback, useEffect } from 'react';
import './AppointmentStatusTable.css';
import { assets } from '../../../../assets/assets';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';  // Import CircularProgress
import Header from '../../../../Components/Header/Header';
import { UserContext } from '../../../../StoreContext/UserContext';
import { useAppointmentDetailsByDateRangeMutation } from '../../../../Redux/api/vms/vmsApi';
import config from '../../../../secrect';

const ITEMS_PER_PAGE = 5;

const AppointmentStatusTable = () => {
  const [appointmentDetailsByDateRange] = useAppointmentDetailsByDateRangeMutation();
  const { userInfo } = useContext(UserContext);
  const { UserRole, EmployeeId, userId: id } = userInfo || {};
  const { VisitorImgUrl } = config;

  const [data,setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchActive, setSearchActive] = useState(false);
  const [searchQueries, setSearchQueries] = useState({
    visitorName: '',
    mobileNo: '',
    visitWith: '',
    department: '',
    appointmentDate: '',
    status: '',
  });
  const [page, setPage] = useState(1);
 
  const handleSearchChange = (e, field) => {
    setSearchQueries(prevQueries => ({
      ...prevQueries,
      [field]: e.target.value,
    }));
  };

  const filteredData = data.filter(item =>
    item.visitorName.toLowerCase().includes(searchQueries.visitorName.toLowerCase()) &&
    item.mobileNo.toLowerCase().includes(searchQueries.mobileNo.toLowerCase()) &&
    item.visitWith.toLowerCase().includes(searchQueries.visitWith.toLowerCase()) &&
    item.department.toLowerCase().includes(searchQueries.department.toLowerCase()) &&
    item.appointmentDate.toLowerCase().includes(searchQueries.appointmentDate.toLowerCase()) &&
    item.status.toLowerCase().includes(searchQueries.status.toLowerCase())
  );

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handleNext = () => {
    setPage(prev => prev + 1);
  };

  const handlePrevious = () => {
    setPage(prev => prev - 1);
  };

  const [StartDate, setStartDate] = useState(new Date(new Date().setDate(new Date().getDate() - 7)).toLocaleDateString('en-CA'));
  const [EndDate, setEndDate] = useState(new Date().toLocaleDateString('en-CA'));

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true); // Set loading to true before fetching data
      const response = await appointmentDetailsByDateRange({ UserRole, EmployeeId, StartDate, EndDate }).unwrap();
      
      const responseData = response.data.map(item => ({
        id: item.AppointmentId, // Use AppointmentId as the key
        visitorImg: `${VisitorImgUrl}/${item.VisitorPhoto}`, // Assuming image is available at this URL
        visitorName: item.VisitorName,
        mobileNo: item.MobileNo,
        visitWith: item.EmployeeName, // Assuming EmployeeName is equivalent to "Visit With"
        department: item.Department || 'N/A', // Default to 'N/A' if Department is null
        appointmentDate: item.AppointmentDate,
        startTime: item.StartTime,
        endTime: item.EndTime,
        status: item.AppointmentStatus,
      }));
      setData(responseData);
   
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch dashboard status details', error);
      setError(error);
      setLoading(false);
    }
  }, [UserRole, EmployeeId, StartDate, EndDate, appointmentDetailsByDateRange]);

  useEffect(() => {
    handleSubmit();
  }, [handleSubmit]);


  return (
    <div className='as-status'>
      <Header />
      <div className='as-container'>
        <div className='as-table-container'>
          <div className='as-header-container'>
            <h1 className='as-heading'>Appointment Status</h1>

            <div className='as-icon-container'>
              {/* From date input */}
              <div className="date-field">
                <label htmlFor="StartDate" className="date-label">From Date</label>
                <input
                  id="StartDate"
                  type="date"
                  value={StartDate} // Set the default value
                  onChange={(e) => setStartDate(e.target.value)}
                  className="date-input"
                />
              </div>

              {/* To date input */}
              <div className="date-field">
                <label htmlFor="EndDate" className="date-label">To Date</label>
                <input
                  id="EndDate"
                  type="date"
                  value={EndDate} // Set the default value
                  onChange={(e) => setEndDate(e.target.value)}
                  className="date-input"
                />
              </div>

              <Tooltip title="Download in excel">
                <IconButton >
                  <CloudDownloadIcon className='as-header-icon' />
                </IconButton>
              </Tooltip>

              <Tooltip title="Search">
                <IconButton onClick={() => setSearchActive(!searchActive)}>
                  <SearchIcon className='as-header-icon' />
                </IconButton>
              </Tooltip>
            </div>
          </div>

          {/* Table */}
          <table className='as-table'>
            <thead>
              <tr>
                {searchActive ? (
                  <>
                    <th><input type="text" value={searchQueries.visitorName} onChange={(e) => handleSearchChange(e, 'visitorName')} placeholder="Search Visitor Name" /></th>
                    <th><input type="text" value={searchQueries.mobileNo} onChange={(e) => handleSearchChange(e, 'mobileNo')} placeholder="Search Mobile No" /></th>
                    <th><input type="text" value={searchQueries.visitWith} onChange={(e) => handleSearchChange(e, 'visitWith')} placeholder="Search Visit With" /></th>
                    <th><input type="text" value={searchQueries.department} onChange={(e) => handleSearchChange(e, 'department')} placeholder="Search Department" /></th>
                    <th><input type="text" value={searchQueries.appointmentDate} onChange={(e) => handleSearchChange(e, 'appointmentDate')} placeholder="Search Appointment Date" /></th>
                    <th><input type="text" value={searchQueries.status} onChange={(e) => handleSearchChange(e, 'status')} placeholder="Search Status" /></th>
                  </>
                ) : (
                  <>
                    <th>Id</th>
                    <th>Visitor Photo</th>
                    <th>Visitor Name</th>
                    <th>Mobile No</th>
                    <th>Visit With</th>
                    <th>Department</th>
                    <th>Appointment Date</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Status</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="10" className="loading"><CircularProgress /></td></tr>
              ) : data.length === 0 ? (
                <tr><td colSpan="10" className="no-data">No data available</td></tr>
              ) : (
                paginatedData.map((item) => (
                  <tr key={item.id}>
                    {searchActive ? (
                      <>
                        <td>{item.visitorName}</td>
                        <td>{item.mobileNo}</td>
                        <td>{item.visitWith}</td>
                        <td>{item.department}</td>
                        <td>{item.appointmentDate}</td>
                        <td>{item.status}</td>
                      </>
                    ) : (
                      <>
                        <td>{item.id}</td>
                        <td><img src={item.visitorImg} className='visitor-img'  /></td>
                        <td>{item.visitorName}</td>
                        <td>{item.mobileNo}</td>
                        <td>{item.visitWith}</td>
                        <td>{item.department}</td>
                        <td>{item.appointmentDate}</td>
                        <td>{item.startTime}</td>
                        <td>{item.endTime}</td>
                        <td>{item.status}</td>
                      </>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className='pagination-container'>
            {page > 1 && (
              <IconButton onClick={handlePrevious}>
                <KeyboardDoubleArrowLeftIcon className='pagination-btn' />
              </IconButton>
            )}
            <span>{page}</span>
            {endIndex < filteredData.length && (
              <IconButton onClick={handleNext}>
                <KeyboardDoubleArrowRightIcon className='pagination-btn' />
              </IconButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentStatusTable;
