import React, { useState } from 'react';
import './AccessLocation.css';
import { assets } from '../../../../assets/assets';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import CloseIcon from '@mui/icons-material/Close';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import SearchIcon from '@mui/icons-material/Search';
import Header from '../../../../Components/Header/Header';

const AccessLocation = ({ title, onClose }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchActive, setSearchActive] = useState(false);
  const [searchQueries, setSearchQueries] = useState({
    locationName: '',
    department: '',
    assignedBiometric: '',
  });

  const data = [
    { "LocationId": "101", "Location": "Main Office", "Department": "Admin", "AssignedBiometric": "Device 1" },
    { "LocationId": "102", "Location": "Branch Office", "Department": "IT", "AssignedBiometric": "Device 2" },
    { "LocationId": "103", "Location": "Warehouse", "Department": "Operations", "AssignedBiometric": "Device 3" },
    { "LocationId": "104", "Location": "Headquarters", "Department": "Marketing", "AssignedBiometric": "Device 4" },
    { "LocationId": "105", "Location": "R&D Center", "Department": "Engineering", "AssignedBiometric": "Device 5" },
  ];

  const handleSearchChange = (e, field) => {
    setSearchQueries(prevQueries => ({
      ...prevQueries,
      [field]: e.target.value,
    }));
  };

  const filteredData = data.filter(item =>
    item.Location.toLowerCase().includes(searchQueries.locationName.toLowerCase()) &&
    item.Department.toLowerCase().includes(searchQueries.department.toLowerCase()) &&
    item.AssignedBiometric.toLowerCase().includes(searchQueries.assignedBiometric.toLowerCase())
  );

  // Pagination logic
  const ITEMS_PER_PAGE = 5;
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleCreateLocation = () => {
    // Add logic to open a modal or redirect to create location page
    console.log('Create Location Clicked');
  };

  return (
    <div className="AccessLocation">
      <Header />
      <div className="AccessLocation-Table-container">
        <div className="AccessLocation-header-container">
          <h1 className="AccessLocation-heading"> Locations</h1>
          <div className="AccessLocation-icon-container">
            <Tooltip title="Search">
              <IconButton onClick={() => setSearchActive(!searchActive)}>
                <SearchIcon className="AccessLocation-header-icon" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Create Location">
              <IconButton onClick={handleCreateLocation}>
                <AssignmentIndIcon className="AccessLocation-header-icon" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Download in Excel">
              <IconButton>
                <CloudDownloadIcon className="AccessLocation-header-icon" />
              </IconButton>
            </Tooltip>
         
          </div>
        </div>

        <table className="AccessLocation-table">
          <thead>
            <tr>
              {searchActive ? (
                <>
                  <th>
                    <input
                      type="text"
                      placeholder="Search Location"
                      value={searchQueries.locationName}
                      onChange={(e) => handleSearchChange(e, 'locationName')}
                    />
                  </th>
                  <th>
                    <input
                      type="text"
                      placeholder="Search Department"
                      value={searchQueries.department}
                      onChange={(e) => handleSearchChange(e, 'department')}
                    />
                  </th>
                  <th>
                    <input
                      type="text"
                      placeholder="Search Assigned Biometric"
                      value={searchQueries.assignedBiometric}
                      onChange={(e) => handleSearchChange(e, 'assignedBiometric')}
                    />
                  </th>
                </>
              ) : (
                <>
                  <th>Location ID</th>
                  <th>Location</th>
                  <th>Department</th>
                  <th>Assigned Biometric</th>
                  <th>Action</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item) => (
              <tr key={item.LocationId}>
                {searchActive ? (
                  <>
                    <td>{item.Location}</td>
                    <td>{item.Department}</td>
                    <td>{item.AssignedBiometric}</td>
                  </>
                ) : (
                  <>
                    <td>{item.LocationId}</td>
                    <td>{item.Location}</td>
                    <td>{item.Department}</td>
                    <td>{item.AssignedBiometric}</td>
                  </>
                )}

                {!searchActive && (
                  <td>
                    <div className="action-btn-container">
                      <Tooltip title="Edit Location">
                        <IconButton className="action-btn update-btn">
                          <BorderColorIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Location">
                        <IconButton className="action-btn delete-btn">
                          <DeleteForeverIcon />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="pagination-container">
          {currentPage > 1 && (
            <IconButton onClick={handlePrevious}>
              <KeyboardDoubleArrowLeftIcon className="pagination-btn" />
            </IconButton>
          )}
          <span>{currentPage}</span>
          {currentPage < totalPages && (
            <IconButton onClick={handleNext}>
              <KeyboardDoubleArrowRightIcon className="pagination-btn" />
            </IconButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccessLocation;
