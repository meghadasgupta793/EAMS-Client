import React, { useState } from 'react';
import './TotalPresent.css';
import SearchIcon from '@mui/icons-material/Search';
import FileDownloadIcon from '@mui/icons-material/Download';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import Tooltip from '@mui/material/Tooltip';

const ITEMS_PER_PAGE = 3;

const TotalPresent = ({ onClose, open }) => {
  if (!open) return null; // Don't render the modal if it's not open

  // Sample data for total present employees
  const data = [
    {
      empPhoto: '/images/profile.png',
      empNo: 'E001',
      empName: 'John Doe',
      department: 'HR',
      designation: 'Manager',
      organization: 'ABC Corp',
      attendanceTime: '09:00 AM',
    },
    {
      empPhoto: '/images/kharush.png',
      empNo: 'E002',
      empName: 'Jane Smith',
      department: 'Finance',
      designation: 'Analyst',
      organization: 'XYZ Inc',
      attendanceTime: '09:05 AM',
    },
    {
      empPhoto: '/images/kharush.png',
      empNo: 'E003',
      empName: 'Jane Smith',
      department: 'Finance',
      designation: 'Analyst',
      organization: 'XYZ Inc',
      attendanceTime: '09:05 AM',
    },
    {
      empPhoto: '/images/kharush.png',
      empNo: 'E004',
      empName: 'Jane Smith',
      department: 'Finance',
      designation: 'Analyst',
      organization: 'XYZ Inc',
      attendanceTime: '09:05 AM',
    },
    {
      empPhoto: '/images/kharush.png',
      empNo: 'E005',
      empName: 'Jane Smith',
      department: 'Finance',
      designation: 'Analyst',
      organization: 'XYZ Inc',
      attendanceTime: '09:05 AM',
    },
    //
    //
    //
    // Add more employee data...
  ];

  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  const filteredData = data.filter(item =>
    item.empNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.empName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleNext = () => {
    if (endIndex < filteredData.length) {
      setPage(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage(prev => prev - 1);
    }
  };

  const handleExport = () => {
    // Implement your export logic here
    console.log("Exporting data...");
  };

  return (
    <div className='backGround-Wrapper' >
      <div className='totalPresent-container' onClick={(e) => e.stopPropagation()}>
        <div className='header-container'>
          <h1 className='heading'>Present List</h1>
          <div className='icon-container'>
            <Tooltip title="Search">
              <IconButton onClick={() => setSearchActive(!searchActive)}>
                <SearchIcon className='header-icon' />
              </IconButton>
            </Tooltip>
            <Tooltip title="Export Employee Details in Excel">
              <IconButton onClick={handleExport}>
                <FileDownloadIcon className='header-icon' />
              </IconButton>
            </Tooltip>
            <Tooltip title="Close">
              <IconButton onClick={onClose} >
                <CloseIcon className='header-icon' />
              </IconButton>
            </Tooltip>
          </div>
        </div>

        {searchActive && (
          <input
            type="text"
            placeholder="Search by Employee No or Name"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        )}

        <table className='total-present-table'>
          <thead>
            <tr>
              <th>Photo</th>
              <th>Emp No</th>
              <th>Emp Name</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Organization</th>
              <th>Attendance Time</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <tr key={index}>
                  <td><img src={item.empPhoto} className='employee-photo' alt="Employee" /></td>
                  <td>{item.empNo}</td>
                  <td>{item.empName}</td>
                  <td>{item.department}</td>
                  <td>{item.designation}</td>
                  <td>{item.organization}</td>
                  <td>{item.attendanceTime}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No employees found.</td>
              </tr>
            )}
          </tbody>
        </table>

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
  );
};

export default TotalPresent;
