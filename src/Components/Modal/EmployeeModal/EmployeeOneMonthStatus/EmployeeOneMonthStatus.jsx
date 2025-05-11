import React, { useState } from 'react';
import './EmployeeOneMonthStatus.css';
import { Typography, IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import CancelIcon from '@mui/icons-material/Cancel';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';

const ITEMS_PER_PAGE = 5;

const EmployeeOneMonthStatus = ({ status, onClose, attendanceData = [] }) => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  // Status mapping to display text
  const statusDisplayMap = {
    'PP': 'Present',
    'AA': 'Absent',
    'Lt': 'Late',
    'EE': 'Early',
    'WO': 'Week-off',
    'HO': 'Holiday',
    'LV': 'Leave',
    'TR': 'Tour'
  };

  // Filter data based on selected status
  const filteredData = attendanceData
    .filter(item => {
      const statusKey = Object.keys(statusDisplayMap).find(
        key => statusDisplayMap[key] === status
      );
      return item.status === statusKey;
    })
    .map(item => ({
      date: format(parseISO(item.date), 'yyyy-MM-dd'),
      inTime: item.inTime || '-',
      outTime: item.outTime || '-',
      workHour: item.WorkHour || '00:00:00',
      late: item.late || '00:00:00',
      early: item.early || '00:00:00',
      status: statusDisplayMap[item.status] || item.status,
      rawStatus: item.status,
      shiftCode: item.shiftCode || '-'
    }));

  const handleNext = () => setPage(prev => Math.min(prev + 1, totalPages));
  const handlePrevious = () => setPage(prev => Math.max(prev - 1, 1));

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedData = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Action icons based on status
  const getActionIcons = (rawStatus, date) => {
    const day = new Date(date).getDay(); // 0 = Sunday, 6 = Saturday
    const isWeekend = day === 0 || day === 6;

    switch (rawStatus) {
      case 'AA': // Absent
        return (
          <>
            {!isWeekend && (
              <Tooltip title="Apply Tour">
                <IconButton onClick={() => navigate('/ApplyTour')}>
                  <EventAvailableIcon className="action-icon apply-tour-icon" />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title="Apply Leave">
              <IconButton onClick={() => navigate('/MyLeave')}>
                <AddIcon className="action-icon apply-leave-icon" />
              </IconButton>
            </Tooltip>
          </>
        );
      case 'Lt': // Late
        return (
          <Tooltip title="Late Regularized">
            <IconButton onClick={() => navigate('/my-Late-Regularization')}>
              <ScheduleIcon className="action-icon late-regularize-icon" />
            </IconButton>
          </Tooltip>
        );
      case 'EE': // Early
        return (
          <Tooltip title="Early Regularized">
            <IconButton onClick={() => navigate('/my-Early-Regularization')}>
              <ScheduleIcon className="action-icon early-regularize-icon" />
            </IconButton>
          </Tooltip>
        );
      default:
        return null;
    }
  };

  const handleExport = () => {
    // Implement export functionality here
    console.log('Exporting data:', filteredData);
  };

  return (
    <div className="employeeOneMonthStatus-table-container">
      <div className="employeeOneMonthStatus-header-container">
        <h1 className="employeeOneMonthStatus-heading">
          {status} Records ({totalItems})
        </h1>
        <div className="employeeOneMonthStatus-icon-container">
          <Tooltip title="Export Status in Excel">
            <IconButton onClick={handleExport}>
              <FileDownloadIcon className="employeeOneMonthStatus-header-icon" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Close">
            <IconButton onClick={onClose}>
              <CancelIcon className="employeeOneMonthStatus-header-icon" />
            </IconButton>
          </Tooltip>
        </div>
      </div>

      <table className="employeeOneMonthStatus-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Shift</th>
            <th>In Time</th>
            <th>Out Time</th>
            <th>Work Hours</th>
            <th>Late</th>
            <th>Early</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((item, index) => (
              <tr key={`${item.date}-${index}`}>
                <td>{item.date}</td>
                <td>{item.shiftCode}</td>
                <td>{item.inTime}</td>
                <td>{item.outTime}</td>
                <td>{item.workHour}</td>
                <td>{item.late}</td>
                <td>{item.early}</td>
                <td>{item.status}</td>
                <td>{getActionIcons(item.rawStatus, item.date)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="no-records">
                No {status.toLowerCase()} records found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="pagination-container">
          <IconButton 
            onClick={handlePrevious} 
            disabled={page === 1}
          >
            <KeyboardDoubleArrowLeftIcon className="pagination-btn" />
          </IconButton>
          
          <span>Page {page} of {totalPages}</span>
          
          <IconButton 
            onClick={handleNext} 
            disabled={page === totalPages}
          >
            <KeyboardDoubleArrowRightIcon className="pagination-btn" />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default EmployeeOneMonthStatus;