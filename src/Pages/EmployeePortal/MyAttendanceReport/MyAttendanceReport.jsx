import React, { useState, useContext, useEffect } from 'react';
import './MyAttendanceReport.css';
import Header from '../../../Components/Header/Header';
import { Tooltip, IconButton } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { UserContext } from '../../../StoreContext/UserContext';
import { useGetEmployeeAttendanceMutation } from '../../../Redux/api/ess/employeeAttendance';
import { format, parseISO, startOfMonth } from 'date-fns';

const MyAttendanceReport = () => {
  const { userInfo } = useContext(UserContext);
  const [getEmployeeAttendance, { data, isLoading, error }] = useGetEmployeeAttendanceMutation();

  const AttendanceStatus = [
    'Present',
    'Absent',
    'Late',
    'Early Exit',
    'Week off',
    'Leave',
    'Holiday',
    'Tour',
  ];

  const [selectedStatus, setSelectedStatus] = useState('');

  const today = new Date();
  const firstDayOfMonth = startOfMonth(today);

  const [displayFromDate, setDisplayFromDate] = useState(format(firstDayOfMonth, 'yyyy-MM-dd'));
  const [displayToDate, setDisplayToDate] = useState(format(today, 'yyyy-MM-dd'));
  const [apiFromDate, setApiFromDate] = useState(format(firstDayOfMonth, 'dd-MMM-yyyy'));
  const [apiToDate, setApiToDate] = useState(format(today, 'dd-MMM-yyyy'));

  const [filteredData, setFilteredData] = useState([]);
  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const formatDisplayDate = (dateString) => {
    try {
      return format(parseISO(dateString), 'yyyy-MM-dd');
    } catch {
      return dateString;
    }
  };

  const statusMap = {
    'PP': 'Present',
    'AA': 'Absent',
    'Lt': 'Late',
    'EE': 'Early Exit',
    'WO': 'Week off',
    'LV': 'Leave',
    'HO': 'Holiday',
    'TR': 'Tour'
  };

  useEffect(() => {
    fetchAttendanceData();
  }, [apiFromDate, apiToDate]);

  useEffect(() => {
    if (data?.attendanceData) {
      filterData();
      setCurrentPage(1);
    }
  }, [data, selectedStatus]);

  const fetchAttendanceData = async () => {
    try {
      await getEmployeeAttendance({
        EmployeeID: userInfo.EmployeeId,
        FromDate: apiFromDate,
        ToDate: apiToDate
      });
    } catch (err) {
      console.error('Error fetching attendance data:', err);
    }
  };

  const filterData = () => {
    if (!data?.attendanceData) return;

    const filtered = data.attendanceData.map(item => ({
      date: formatDisplayDate(item.date),
      inTime: item.inTime || '-',
      outTime: item.outTime || '-',
      late: item.late || '-',
      earlyExit: item.early || '-',
      workHour: item.WorkHour || '-',
      status: statusMap[item.status] || item.status,
      shift: item.shiftCode || '-'
    }));

    if (selectedStatus) {
      const statusKey = Object.keys(statusMap).find(key => statusMap[key] === selectedStatus);
      setFilteredData(filtered.filter(item => item.status === selectedStatus ||
        (statusKey && item.status === statusMap[statusKey])));
    } else {
      setFilteredData(filtered);
    }
  };

  const handleExport = () => {
    console.log('Exporting data:', filteredData);
  };

  const handleDateChange = (type, value) => {
    const date = new Date(value);
    if (type === 'from') {
      setDisplayFromDate(value);
      setApiFromDate(format(date, 'dd-MMM-yyyy'));
    } else {
      setDisplayToDate(value);
      setApiToDate(format(date, 'dd-MMM-yyyy'));
    }
  };

  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  if (isLoading) return <div className="loading">Loading attendance data...</div>;
  if (error) return <div className="error">Error loading attendance data</div>;

  return (
    <div className="MyAttendanceReport">
      <Header />
      <div className="myAttendanceReport-Container">
        <div className="myAttendanceReport-header-container">
          <h1 className="myAttendanceReport-heading">My Attendance Report</h1>
          <div className="myAttendanceReport-icon-container">
            <Tooltip title="Export in Excel">
              <IconButton onClick={handleExport}>
                <FileDownloadIcon className="myAttendanceReport-header-icon" />
              </IconButton>
            </Tooltip>
            <div className="myAttendanceReport-date-range">
              <Tooltip title="Select From Date">
                <input
                  type="date"
                  value={displayFromDate}
                  onChange={(e) => handleDateChange('from', e.target.value)}
                  className="myAttendanceReport-date-input"
                />
              </Tooltip>
              <Tooltip title="Select To Date">
                <input
                  type="date"
                  value={displayToDate}
                  onChange={(e) => handleDateChange('to', e.target.value)}
                  className="myAttendanceReport-date-input"
                />
              </Tooltip>
            </div>
            <select
              className="myAttendanceReport-filter-dropdown"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="">All Statuses</option>
              {AttendanceStatus.map((status, index) => (
                <option key={index} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        {data && (
          <div className="attendance-summary">
            <div className="summary-item"><span className="summary-label">Present:</span><span className="summary-value">{data.Present || 0}</span></div>
            <div className="summary-item"><span className="summary-label">Absent:</span><span className="summary-value">{data.Absent || 0}</span></div>
            <div className="summary-item"><span className="summary-label">Late:</span><span className="summary-value">{data.Late || 0}</span></div>
            <div className="summary-item"><span className="summary-label">Early:</span><span className="summary-value">{data.Early || 0}</span></div>
            <div className="summary-item"><span className="summary-label">Week-off:</span><span className="summary-value">{data['Week-off'] || 0}</span></div>
            <div className="summary-item"><span className="summary-label">Leave:</span><span className="summary-value">{data.Leave || 0}</span></div>
            <div className="summary-item"><span className="summary-label">Holiday:</span><span className="summary-value">{data.Holiday || 0}</span></div>
            <div className="summary-item"><span className="summary-label">Tour:</span><span className="summary-value">{data.Tour || 0}</span></div>
          </div>
        )}

        <div className="myAttendanceReport-table-container">
          <table className="myAttendanceReport-Table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Shift</th>
                <th>In Time</th>
                <th>Out Time</th>
                <th>Late</th>
                <th>Early Exit</th>
                <th>Work Hour</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.date}</td>
                    <td>{data.shift}</td>
                    <td>{data.inTime}</td>
                    <td>{data.outTime}</td>
                    <td>{data.late}</td>
                    <td>{data.earlyExit}</td>
                    <td>{data.workHour}</td>
                    <td>{data.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="no-data">
                    No attendance records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {filteredData.length > 0 && (
          <div className="pagination-controls">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAttendanceReport;