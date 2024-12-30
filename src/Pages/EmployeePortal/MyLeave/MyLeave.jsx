import React, { useState } from 'react';
import './MyLeave.css'; // Add your CSS styling
import SearchIcon from '@mui/icons-material/Search';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { exportToExcel } from '../../../Components/Utils/excelUtils'; // Adjust the import path
import Header from '../../../Components/Header/Header';

const ITEMS_PER_PAGE = 6;

const MyLeave = () => {
  const [searchActive, setSearchActive] = useState(false);
  const [searchQueries, setSearchQueries] = useState({
    leaveType: '',
    absentDate: '', // Add absentDate to the search query state
  });
  const [page, setPage] = useState(1);
  const [selectedLeaveType, setSelectedLeaveType] = useState('');

  const data = [
    { absentDate: '2024-09-04' , status:'Absent' },
    { absentDate: '2024-09-05', status:'Absent' },
    { absentDate: '2024-09-06', status:'Absent' },
    { absentDate: '2024-09-11', status:'Absent' },
    { absentDate: '2024-09-16' , status:'Absent' },
    { absentDate: '2024-09-19' , status:'Absent'},
    { absentDate: '2024-09-20', status:'Absent' },
  ];

  const leaveTypes = [
    { id: '1', leaveType: 'Sick Leave' },
    { id: '2', leaveType: 'Casual Leave' },
    { id: '3', leaveType: 'Annual Leave' },
  ];

  // Filter data based on search
  const filteredData = data.filter((item) => {
    const matchesLeaveType = searchQueries.leaveType
      ? leaveTypes.some((type) => type.leaveType === searchQueries.leaveType)
      : true;
    const matchesAbsentDate = searchQueries.absentDate
      ? item.absentDate.includes(searchQueries.absentDate)
      : true;
    return matchesLeaveType && matchesAbsentDate;
  });

  // Pagination logic
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handleNext = () => {
    if (endIndex < filteredData.length) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleExport = () => {
    exportToExcel(filteredData, 'LeaveStatusDetails');
  };

  const handleSearchChange = (e) => {
    setSearchQueries({ ...searchQueries, [e.target.name]: e.target.value });
  };

  const handleApplyLeave = () => {
    console.log('Leave applied:', { selectedLeaveType });
  };

  return (
    <div className="myLeave">
      <Header />
      <div className="myLeave-Container">
        <div className="myLeave-grids">
          {/* Left Side - Leave Table */}
          <div className="myLeave-table-container">
            <div className="myLeave-header-container">
              <h1 className="annual-leave-heading">Annual Leave Status</h1>
              <div className="leave-status-icon-container">
                <Tooltip title="Search">
                  <IconButton onClick={() => setSearchActive(!searchActive)}>
                    <SearchIcon className="leave-status-header-icon" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Export Leave Status in Excel">
                  <IconButton onClick={handleExport}>
                    <FileDownloadIcon className="leave-status-header-icon" />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
            {searchActive && (
              <div className="search-container">
                <input
                  type="text"
                  name="absentDate"
                  placeholder="Search by Absent Date (YYYY-MM-DD)"
                  value={searchQueries.absentDate}
                  onChange={handleSearchChange}
                  className="search-input"
                />
              </div>
            )}
            <table className="myLeave-status-table">
              <thead>
                <tr>
                  <th>Absent Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={1} style={{ textAlign: 'center' }}>
                      No Absent Records Found
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.absentDate}</td>
                      <td>{item.status}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <div className="pagination-container">
              {page > 1 && (
                <IconButton onClick={handlePrevious}>
                  <KeyboardDoubleArrowLeftIcon className="pagination-btn" />
                </IconButton>
              )}
              <span>{page}</span>
              {endIndex < filteredData.length && (
                <IconButton onClick={handleNext}>
                  <KeyboardDoubleArrowRightIcon className="pagination-btn" />
                </IconButton>
              )}
            </div>
          </div>
          {/* Right Side - Apply Leave */}
          <div className="apply-leave-container">
            <div className="apply-leave-header-container">
              <h1 className="apply-leave-heading">Apply Leave</h1>
            </div>
            <div className="apply-leave-form">
              <div className="apply-leave-row">
                <label htmlFor="leaveType">Select Leave Type</label>
                <select
                  id="leaveType"
                  name="leaveType"
                  className="apply-leave-dropdown"
                  value={selectedLeaveType}
                  onChange={(e) => setSelectedLeaveType(e.target.value)}
                >
                  <option value="">Select Leave Type</option>
                  {leaveTypes.map((item) => (
                    <option key={item.id} value={item.leaveType}>
                      {item.leaveType}
                    </option>
                  ))}
                </select>
              </div>
              <div className="apply-leave-row">
                <label htmlFor="fromDate">From Date</label>
                <input type="date" id="fromDate" className="apply-leave-input" />
              </div>
              <div className="apply-leave-row">
                <label htmlFor="toDate">To Date</label>
                <input type="date" id="toDate" className="apply-leave-input" />
              </div>
              <div className="apply-leave-row">
                <label htmlFor="reason">Reason</label>
                <input type="text" id="reason" className="apply-leave-input" />
              </div>
              <div className="apply-leave-button-container">
                <button
                  className="apply-leave-button"
                  onClick={handleApplyLeave}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyLeave;
