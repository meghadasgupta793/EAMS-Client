import React, { useState } from 'react';
import './MyAttendanceReport.css';

import Header from '../../../Components/Header/Header';

import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

const MyAttendanceReport = () => {
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
    const [page, setPage] = useState(1);

    const ITEMS_PER_PAGE = 5;

    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
        setPage(1); // Reset to first page on filter change
    };

    const attendanceData = [
        { empPhoto: '/images/profile.png', empNo: 'E011', ticketNo: 'T011', empName: 'Megha', department: 'IT', designation: 'Developer', organization: 'ABC Corp', date: '2024-12-01', inTime: '09:00', outTime: '17:00', late: 'No', earlyExit: 'No', workHour: '8', weeklyOff: 'No', leave: 'No', holiday: 'No', shift: 'GE' },
        { empPhoto: '/images/profile.png', empNo: 'E011', ticketNo: 'T011', empName: 'Megha', department: 'IT', designation: 'Developer', organization: 'ABC Corp', date: '2024-12-02', inTime: '09:15', outTime: '17:15', late: 'Yes', earlyExit: 'No', workHour: '7.75', weeklyOff: 'No', leave: 'No', holiday: 'No', shift: 'EV' },
        { empPhoto: '/images/profile.png', empNo: 'E011', ticketNo: 'T011', empName: 'Megha', department: 'IT', designation: 'Developer', organization: 'ABC Corp', date: '2024-12-03', inTime: '09:10', outTime: '17:10', late: 'Yes', earlyExit: 'No', workHour: '8', weeklyOff: 'No', leave: 'No', holiday: 'No', shift: 'AB' },
        { empPhoto: '/images/profile.png', empNo: 'E011', ticketNo: 'T011', empName: 'Megha', department: 'IT', designation: 'Developer', organization: 'ABC Corp', date: '2024-12-04', inTime: '09:00', outTime: '17:00', late: 'No', earlyExit: 'No', workHour: '8', weeklyOff: 'No', leave: 'No', holiday: 'No', shift: 'GE' },
        { empPhoto: '/images/profile.png', empNo: 'E011', ticketNo: 'T011', empName: 'Megha', department: 'IT', designation: 'Developer', organization: 'ABC Corp', date: '2024-12-05', inTime: '09:05', outTime: '17:05', late: 'No', earlyExit: 'No', workHour: '8', weeklyOff: 'No', leave: 'No', holiday: 'No', shift: 'EV' },
        { empPhoto: '/images/profile.png', empNo: 'E011', ticketNo: 'T011', empName: 'Megha', department: 'IT', designation: 'Developer', organization: 'ABC Corp', date: '2024-12-06', inTime: '08:50', outTime: '16:50', late: 'No', earlyExit: 'No', workHour: '8', weeklyOff: 'No', leave: 'No', holiday: 'No', shift: 'AB' },
        { empPhoto: '/images/profile.png', empNo: 'E011', ticketNo: 'T011', empName: 'Megha', department: 'IT', designation: 'Developer', organization: 'ABC Corp', date: '2024-12-07', inTime: '09:10', outTime: '17:10', late: 'Yes', earlyExit: 'No', workHour: '8', weeklyOff: 'No', leave: 'No', holiday: 'No', shift: 'GE' },
        { empPhoto: '/images/profile.png', empNo: 'E011', ticketNo: 'T011', empName: 'Megha', department: 'IT', designation: 'Developer', organization: 'ABC Corp', date: '2024-12-08', inTime: '09:00', outTime: '17:00', late: 'No', earlyExit: 'No', workHour: '8', weeklyOff: 'Yes', leave: 'No', holiday: 'No', shift: 'MN' },
        { empPhoto: '/images/profile.png', empNo: 'E011', ticketNo: 'T011', empName: 'Megha', department: 'IT', designation: 'Developer', organization: 'ABC Corp', date: '2024-12-09', inTime: '09:20', outTime: '17:20', late: 'Yes', earlyExit: 'No', workHour: '8', weeklyOff: 'No', leave: 'No', holiday: 'No', shift: 'AB' },
        { empPhoto: '/images/profile.png', empNo: 'E011', ticketNo: 'T011', empName: 'Megha', department: 'IT', designation: 'Developer', organization: 'ABC Corp', date: '2024-12-10', inTime: '09:00', outTime: '17:00', late: 'No', earlyExit: 'No', workHour: '8', weeklyOff: 'No', leave: 'No', holiday: 'No', shift: 'GE' }
    ];
    
    
    
    
    // Filtering the data based on selectedStatus
    const filteredData = selectedStatus
        ? attendanceData.filter((data) => data.late === (selectedStatus === 'Late' ? 'Yes' : 'No'))
        : attendanceData;

    // Paginate the filtered data
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    const handleNext = () => {
        setPage((prev) => prev + 1);
    };

    const handlePrevious = () => {
        setPage((prev) => prev - 1);
    };

    return (
        <>
            <div className="MyAttendanceReport">
                <Header />
                <div className="myAttendanceReport-Container">
                    <div className="myAttendanceReport-header-container">
                        <h1 className="myAttendanceReport-heading">My Attendance Report</h1>
                        <div className="myAttendanceReport-icon-container">
                            <Tooltip title="Search">
                                <IconButton>
                                    <SearchIcon className="myAttendanceReport-header-icon" />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Export in Excel">
                                <IconButton>
                                    <FileDownloadIcon className="myAttendanceReport-header-icon" />
                                </IconButton>
                            </Tooltip>
                            <FormControl className="myAttendanceReport-filter-dropdown">
                                <InputLabel id="filter-label">Filter</InputLabel>
                                <Select
                                    labelId="filter-label"
                                    value={selectedStatus}
                                    onChange={handleStatusChange}
                                    className="myAttendanceReport-filter-select"
                                >
                                    {AttendanceStatus.map((status, index) => (
                                        <MenuItem key={index} value={status}>
                                            {status}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                    </div>

                    {/* Attendance Table */}
                    <table className="myAttendanceReport-Table">
                        <thead>
                            <tr>
                                <th>Photo</th>
                                <th>Emp No</th>
                                <th>Emp Name</th>
                                <th>Department</th>
                                <th>Designation</th>
                                <th>Organization</th>
                                <th>Shift</th>
                                <th>Date</th>
                                <th>In Time</th>
                                <th>Out Time</th>
                                <th>Late</th>
                                <th>Early Exit</th>
                                <th>Work Hour</th>
                                <th>Weekly Off</th>
                                <th>Leave</th>
                                <th>Holiday</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map((data, index) => (
                                <tr key={index}>
                                    <td>
                                        <img
                                            src={data.empPhoto}
                                            className="employee-photo"
                                            alt="Employee"
                                        />
                                    </td>
                                    <td>{data.empNo}</td>
                                    <td>{data.empName}</td>
                                    <td>{data.department}</td>
                                    <td>{data.designation}</td>
                                    <td>{data.organization}</td>
                                    <td>{data.shift}</td>
                                    <td>{data.date}</td>
                                    <td>{data.inTime}</td>
                                    <td>{data.outTime}</td>
                                    <td>{data.late}</td>
                                    <td>{data.earlyExit}</td>
                                    <td>{data.workHour}</td>
                                    <td>{data.weeklyOff}</td>
                                    <td>{data.leave}</td>
                                    <td>{data.holiday}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
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
            </div>
        </>
    );
};

export default MyAttendanceReport;
