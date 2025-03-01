import React, { useState } from 'react';
import './TotalPresent.css';
import SearchIcon from '@mui/icons-material/Search';
import FileDownloadIcon from '@mui/icons-material/Download';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import Tooltip from '@mui/material/Tooltip';
import Modal from '@mui/material/Modal'; // Import Modal component
import Box from '@mui/material/Box'; // Box to help with styling and centering

const ITEMS_PER_PAGE = 3;

const TotalPresent = ({ open, onClose, data }) => {
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  const filteredData = data.filter(item =>
    (item.EmpNo && item.EmpNo.toString().toLowerCase().includes(searchQuery.toLowerCase())) ||
    (item.EmpName && item.EmpName.toLowerCase().includes(searchQuery.toLowerCase()))
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
    console.log("Exporting data...");
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="total-present-modal"
      aria-describedby="modal-to-view-present-list"
    >
      <Box className='total-present-modal-container'>
        <div className='totalPresent-container'>
          <div className='total-present-header-container'>
            <h1 className='total-present-heading'>Present List</h1>
            <div className='total-present-icon-container'>
              <Tooltip title="Search">
                <IconButton onClick={() => setSearchActive(!searchActive)}>
                  <SearchIcon className='total-present-header-icon' />
                </IconButton>
              </Tooltip>
              <Tooltip title="Export Employee Details in Excel">
                <IconButton onClick={handleExport}>
                  <FileDownloadIcon className='total-present-header-icon' />
                </IconButton>
              </Tooltip>
              <Tooltip title="Close">
                <IconButton onClick={onClose}>
                  <CloseIcon className='total-present-header-icon' />
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
                <th>Date</th>
                <th>InTime</th>
                <th>OutTime</th>
                <th>WorkHour</th>
                <th>Remark</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <img src={item.photo || 'default-photo.jpg'} className='employee-photo' alt="Employee" />
                    </td>
                    <td>{item.EmpNo}</td>
                    <td>{item.EmpName}</td>
                    <td>{item.Department}</td>
                    <td>{item.Designation}</td>
                    <td>{item.Organization}</td>
                    <td>{item.Date}</td>
                    <td>{item.InTime}</td>
                    <td>{item.OutTime}</td>
                    <td>{item.WorkHour}</td>
                    <td>{item.Remark}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11">No employees found.</td>
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
      </Box>
    </Modal>
  );
};

export default TotalPresent;
