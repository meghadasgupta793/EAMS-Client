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


const ITEMS_PER_PAGE = 5;

const EmployeeOneMonthStatus = ({ status, onClose }) => {
  const [page, setPage] = useState(1);

  const data = [
    { date: '2024-11-01', inTime: '9:00 AM', outTime: '6:00 PM', workHour: 8, late: 0, early: 0, status: 'Present' },
    { date: '2024-11-02', inTime: '9:00 AM', outTime: '6:00 PM', workHour: 8, late: 0, early: 0, status: 'Present' },
    { date: '2024-11-04', inTime: '9:30 AM', outTime: '6:00 PM', workHour: 7.5, late: 0.5, early: 0, status: 'Absent' },
    { date: '2024-11-04', inTime: '9:30 AM', outTime: '6:00 PM', workHour: 7.5, late: 0.5, early: 0, status: 'Absent' },
    { date: '2024-11-02', inTime: '9:15 AM', outTime: '6:00 PM', workHour: 7.75, late: 0.25, early: 0, status: 'Late' },
    { date: '2024-11-02', inTime: '9:15 AM', outTime: '6:00 PM', workHour: 7.75, late: 0.25, early: 0, status: 'Late' },
    { date: '2024-11-05', inTime: '9:00 AM', outTime: '6:00 PM', workHour: 8, late: 0, early: 0, status: 'Early' },
    { date: '2024-11-05', inTime: '9:00 AM', outTime: '6:00 PM', workHour: 8, late: 0, early: 0, status: 'Early' },
    { date: '2024-11-08', inTime: null, outTime: null, workHour: '0:00', late: '00:00', early: '00:00', status: 'Holiday' },
    { date: '2024-11-09', inTime: null, outTime: null, workHour: '0:00', late: '00:00', early: '00:00', status: 'Tour' },
    { date: '2024-11-10', inTime: null, outTime: null, workHour: '0:00', late: '00:00', early: '00:00', status: 'WeekOff' }
  ];

  const handleNext = () => setPage((prev) => prev + 1);
  const handlePrevious = () => setPage((prev) => prev - 1);

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedData = data.slice(startIndex, endIndex);

  // Determine action icons based on status
  const getActionIcons = (status) => {
    switch (status) {
      case 'Absent':
        return (
          <>
            <Tooltip title="Apply Tour">
              <IconButton onClick={() => navigate('/ApplyTour')}>
              <EventAvailableIcon className="action-icon apply-tour-icon" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Apply Leave">
              <IconButton onClick={() => navigate('/MyLeave')}>
              <AddIcon className="action-icon apply-leave-icon" /></IconButton>
            </Tooltip>
          </>
        );
      case 'Late':
        return (
          <Tooltip title="Late Regularized">
            <IconButton onClick={() => navigate('/my-Late-Regularization')}>
            <ScheduleIcon className="action-icon late-regularize-icon" /></IconButton>
          </Tooltip>
        );
      case 'Early':
        return (
          <Tooltip title="Early Regularized">
            <IconButton onClick={() => navigate('/my-Early-Regularization')}>
            <ScheduleIcon className="action-icon early-regularize-icon" /></IconButton>
          </Tooltip>
        );
      default:
        return null;
    }
  };


  const navigate = useNavigate();


  return (
    <div className="employeeOneMonthStatus-table-container">
      <div className="employeeOneMonthStatus-header-container">
        <h1 className="employeeOneMonthStatus-heading">Employee Monthly {status} Status</h1>
        <div className="employeeOneMonthStatus-icon-container">
          <Tooltip title="Export Status in Excel">
            <IconButton>
              <FileDownloadIcon className="employeeOneMonthStatus-header-icon" />
            </IconButton>
          </Tooltip>
          <Tooltip title="View All">
            <IconButton>
              <VisibilityIcon className="employeeOneMonthStatus-header-icon" />
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
            <th>InTime</th>
            <th>OutTime</th>
            <th>WorkHour</th>
            <th>Late</th>
            <th>Early</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item, index) => (
            <tr key={index}>
              <td>{item.date}</td>
              <td>{item.inTime}</td>
              <td>{item.outTime}</td>
              <td>{item.workHour}</td>
              <td>{item.late}</td>
              <td>{item.early}</td>
              <td>{item.status}</td>
              <td>{getActionIcons(item.status)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination-container">
        {page > 1 && (
          <IconButton onClick={handlePrevious}>
            <KeyboardDoubleArrowLeftIcon className="pagination-btn" />
          </IconButton>
        )}
        <span>{page}</span>
        {endIndex < data.length && (
          <IconButton onClick={handleNext}>
            <KeyboardDoubleArrowRightIcon className="pagination-btn" />
          </IconButton>
        )}
      </div>
    </div>
  );
};

export default EmployeeOneMonthStatus;
