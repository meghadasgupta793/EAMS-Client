import React, { useState, useContext } from 'react';
import { useEffect } from 'react';
import './ApplyTour.css';
import SearchIcon from '@mui/icons-material/Search';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { exportToExcel } from '../../../Components/Utils/excelUtils';
import Header from '../../../Components/Header/Header';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../StoreContext/UserContext';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { 
  useCreateTourRequestMutation,
  useEmployeeAttendancebyStatusQuery, 
   
} from '../../../Redux/api/ess/requestProposalAPI';

const ITEMS_PER_PAGE = 4;

const ApplyTour = () => {
  const { userInfo } = useContext(UserContext);
  const [page, setPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reason, setReason] = useState('');

  // ✅ Correct usage for query
  const { data: attendanceData, isLoading } = useEmployeeAttendancebyStatusQuery(
    {
      EmployeeID: userInfo?.EmployeeId,
      Status: 'AA'
    },
    {
      skip: !userInfo?.EmployeeId,
    }
  );

  const [createTour, { isLoading: isCreatingTour }] = useCreateTourRequestMutation();

  const AbsentData = attendanceData?.data?.map(item => ({
    absentDate: dayjs(item.Date).format('YYYY-MM-DD'),
    status: item.status
  })) || [];

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedData = AbsentData.slice(startIndex, endIndex);

  const handleNext = () => {
    if (endIndex < AbsentData.length) {
      setPage(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage(prev => prev - 1);
    }
  };

  const handleExport = () => {
    exportToExcel(AbsentData, 'AbsentData');
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    // Automatically set ToDate same as FromDate if not set
    if (!toDate) setToDate(date);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedDate || !toDate) {
      toast.error('Please select both From Date and To Date');
      return;
    }
    
    if (new Date(toDate) < new Date(selectedDate)) {
      toast.error('To Date cannot be before From Date');
      return;
    }
    
    if (!reason) {
      toast.error('Please enter a reason for the tour');
      return;
    }

    try {
      const response = await createTour({
        EmployeeId: userInfo.EmployeeId,
        FromDate: selectedDate,
        ToDate: toDate,
        Remarks: reason
      }).unwrap();
      
      if (response.message === "Tour request saved successfully") {
        toast.success(response.message);
        // Reset form
        setSelectedDate('');
        setToDate('');
        setReason('');
      } else {
        toast.error(response.message || 'Failed to submit tour request');
      }
    } catch (err) {
      console.error('Tour request error:', err);
      toast.error(err.data?.message || 'An error occurred while submitting the tour request');
    }
  };

  return (
    <div className='applyTour'>
      <Header />
      <div className='applyTour-Container'>
        <div className='applyTour-grids'>
          <div className='applyTour-table-container'>
            <div className='applyTour-header-container'>
              <h1 className='tour-details-heading'>Absent Dates</h1>
              <div className='tour-status-icon-container'>
                <Tooltip title="Search any Absent Date">
                  <IconButton>
                    <SearchIcon className='tour-status-header-icon' />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Export to Excel">
                  <IconButton onClick={handleExport}>
                    <FileDownloadIcon className='tour-status-header-icon' />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
            <table className='applyTour-status-table'>
              <thead>
                <tr>
                  <th>Absent Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="2" style={{ textAlign: 'center' }}>
                      Loading...
                    </td>
                  </tr>
                ) : AbsentData.length === 0 ? (
                  <tr>
                    <td colSpan="2" style={{ textAlign: 'center' }}>
                      No Absent Records Found
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((item, index) => (
                    <tr key={index}>
                      <td 
                        onClick={() => handleDateClick(item.absentDate)} 
                        style={{ cursor: 'pointer', color: '#1976d2' }}
                      >
                        {item.absentDate}
                      </td>
                      <td>{item.status}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {AbsentData.length > ITEMS_PER_PAGE && (
              <div className='pagination-container'>
                <IconButton 
                  onClick={handlePrevious} 
                  disabled={page === 1}
                >
                  <KeyboardDoubleArrowLeftIcon className='pagination-btn' />
                </IconButton>
                <span>Page {page} of {Math.ceil(AbsentData.length / ITEMS_PER_PAGE)}</span>
                <IconButton 
                  onClick={handleNext} 
                  disabled={endIndex >= AbsentData.length}
                >
                  <KeyboardDoubleArrowRightIcon className='pagination-btn' />
                </IconButton>
              </div>
            )}
          </div>

          <div className='apply-tour-container'>
            <div className='apply-tour-header-container'>
              <h1 className='apply-tour-heading'>Apply Tour</h1>
            </div>

            <form className='apply-tour-form' onSubmit={handleSubmit}>
              <div className='apply-tour-row'>
                <label htmlFor='fromDate'>From Date</label>
                <input
                  type='date'
                  id='fromDate'
                  name='fromDate'
                  className='apply-tour-input'
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  required
                />
              </div>

              <div className='apply-tour-row'>
                <label htmlFor='toDate'>To Date</label>
                <input
                  type='date'
                  id='toDate'
                  name='toDate'
                  className='apply-tour-input'
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  min={selectedDate}
                  required
                />
              </div>

              <div className='apply-tour-row'>
                <label htmlFor='reason'>Reason</label>
                <textarea 
                  id='reason' 
                  name='reason' 
                  className='apply-tour-input' 
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={3}
                  maxLength={500}
                  required 
                />
              </div>

              <div className='apply-tour-button-container'>
                <button 
                  className='apply-tour-button' 
                  type='submit'
                  disabled={isCreatingTour}
                >
                  {isCreatingTour ? 'Submitting...' : 'Apply'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyTour;