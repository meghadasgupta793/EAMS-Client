import React, { useState } from 'react';
import './MyAttendanceReport.css';

import Header from '../../../Components/Header/Header';

import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

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
    const [fromDate, setFromDate] = useState(''); // State for "From" date
    const [toDate, setToDate] = useState('');     // State for "To" date

    const attendanceData = {
        empPhoto: '/images/profile.png',
        empNo: 'E011',
        ticketNo: 'T011',
        empName: 'Megha',
        department: 'IT',
        designation: 'Developer',
        PresentDays: '6',
        AbsentDays: '1',
        LeaveDays: '1',
        Holidays: '1',
        WeekOff: '1',
        Data: [
            { date: '2024-12-01', inTime: '09:00', outTime: '17:00', late: '00:13', earlyExit: '00:10', workHour: '8:00', status: 'Absent', shift: 'GE' },
            { date: '2024-12-02', inTime: '09:15', outTime: '17:15', late: '00:10', earlyExit: '00:13', workHour: '7:75', status: 'Present', shift: 'EV' },
            { date: '2024-12-03', inTime: '09:10', outTime: '17:10', late: '', earlyExit: '', workHour: '8:00', status: 'Leave', shift: 'AB' },
            { date: '2024-12-04', inTime: '09:00', outTime: '17:00', late: '', earlyExit: '', workHour: '8:00', status: 'Holiday', shift: 'GE' },
            { date: '2024-12-05', inTime: '09:05', outTime: '17:05', late: '00:10', earlyExit: '', workHour: '8:00', status: 'WeekOff', shift: 'EV' },
            { date: '2024-12-06', inTime: '08:50', outTime: '16:50', late: '', earlyExit: '', workHour: '8:00', status: 'Present', shift: 'AB' },
            { date: '2024-12-07', inTime: '09:10', outTime: '17:10', late: '00:13', earlyExit: '', workHour: '8:00', status: 'Present', shift: 'GE' },
            { date: '2024-12-08', inTime: '09:00', outTime: '17:00', late: '', earlyExit: '', workHour: '8:00', status: 'Present', shift: 'MN' },
            { date: '2024-12-09', inTime: '09:20', outTime: '17:20', late: '00:13', earlyExit: '', workHour: '8:00', status: 'Present', shift: 'AB' },
            { date: '2024-12-10', inTime: '09:00', outTime: '17:00', late: '', earlyExit: '00:50', workHour: '8:00', status: 'Present', shift: 'GE' },
            { date: '2024-12-11', inTime: '09:05', outTime: '17:05', late: '', earlyExit: '', workHour: '8:00', status: 'Present', shift: 'EV' },
            { date: '2024-12-12', inTime: '09:10', outTime: '17:10', late: '00:05', earlyExit: '', workHour: '8:00', status: 'Present', shift: 'AB' },
            { date: '2024-12-13', inTime: '09:00', outTime: '17:00', late: '00:10', earlyExit: '00:30', workHour: '7:90', status: 'Absent', shift: 'GE' },
            { date: '2024-12-14', inTime: '08:55', outTime: '16:55', late: '', earlyExit: '', workHour: '8:00', status: 'Present', shift: 'MN' },
            { date: '2024-12-15', inTime: '09:20', outTime: '17:20', late: '00:15', earlyExit: '', workHour: '7:90', status: 'Leave', shift: 'EV' },
            { date: '2024-12-16', inTime: '09:05', outTime: '17:05', late: '', earlyExit: '', workHour: '8:00', status: 'Holiday', shift: 'AB' },
            { date: '2024-12-17', inTime: '09:00', outTime: '17:00', late: '', earlyExit: '00:20', workHour: '7:80', status: 'Present', shift: 'GE' },
            { date: '2024-12-18', inTime: '09:10', outTime: '17:10', late: '', earlyExit: '', workHour: '8:00', status: 'Present', shift: 'MN' },
            { date: '2024-12-19', inTime: '08:50', outTime: '16:50', late: '00:15', earlyExit: '', workHour: '8:00', status: 'Present', shift: 'AB' },
            { date: '2024-12-20', inTime: '09:15', outTime: '17:15', late: '', earlyExit: '', workHour: '8:00', status: 'Present', shift: 'EV' },
            { date: '2024-12-21', inTime: '09:00', outTime: '17:00', late: '', earlyExit: '', workHour: '8:00', status: 'Absent', shift: 'GE' },
            { date: '2024-12-22', inTime: '09:05', outTime: '17:05', late: '', earlyExit: '00:15', workHour: '7:85', status: 'Present', shift: 'AB' },
            { date: '2024-12-23', inTime: '09:10', outTime: '17:10', late: '00:12', earlyExit: '', workHour: '8:00', status: 'Present', shift: 'EV' },
            { date: '2024-12-24', inTime: '09:00', outTime: '17:00', late: '', earlyExit: '', workHour: '8:00', status: 'Present', shift: 'AB' },
            { date: '2024-12-25', inTime: '09:00', outTime: '17:00', late: '', earlyExit: '', workHour: '8:00', status: 'Holiday', shift: 'GE' },
            { date: '2024-12-26', inTime: '09:20', outTime: '17:20', late: '', earlyExit: '', workHour: '8:00', status: 'WeekOff', shift: 'MN' },
            { date: '2024-12-27', inTime: '09:10', outTime: '17:10', late: '', earlyExit: '', workHour: '8:00', status: 'Present', shift: 'EV' },
            { date: '2024-12-28', inTime: '09:00', outTime: '17:00', late: '', earlyExit: '00:30', workHour: '7:80', status: 'Absent', shift: 'AB' },
            { date: '2024-12-29', inTime: '09:10', outTime: '17:10', late: '00:10', earlyExit: '', workHour: '8:00', status: 'Leave', shift: 'EV' },
            { date: '2024-12-30', inTime: '09:05', outTime: '17:05', late: '', earlyExit: '', workHour: '8:00', status: 'Present', shift: 'AB' }
        ]
    };


    // Filtering the data based on selectedStatus
    const filteredData = selectedStatus
        ? attendanceData.Data.filter((data) => data.status === selectedStatus)
        : attendanceData.Data;

    return (
        <div className="MyAttendanceReport">
            <Header />
            <div className="myAttendanceReport-Container">
                <div className="myAttendanceReport-header-container">
                    <h1 className="myAttendanceReport-heading">My Attendance Report</h1>
                    <div className="myAttendanceReport-icon-container">
                        <Tooltip title="Export in Excel">
                            <IconButton>
                                <FileDownloadIcon className="myAttendanceReport-header-icon" />
                            </IconButton>
                        </Tooltip>
                        <div className="myAttendanceReport-date-range">
                            <Tooltip title="Select From Date">
                                <IconButton>
                                    <input
                                        type="date"
                                        value={fromDate}
                                        onChange={(e) => setFromDate(e.target.value)}
                                        className="myAttendanceReport-date-input"
                                    />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Select To Date">
                                <IconButton>
                                    <input
                                        type="date"
                                        value={toDate}
                                        onChange={(e) => setToDate(e.target.value)}
                                        className="myAttendanceReport-date-input"
                                    />
                                </IconButton>
                            </Tooltip>
                        </div>
                        <FormControl className="myAttendanceReport-filter-dropdown">
                            <InputLabel id="filter-label">Filter</InputLabel>
                            <Select
                                labelId="filter-label"
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
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

                {/* Employee Details Container */}
                <div className="MyAttendanceReport-Emp-deatils">
                    <div className="MyAttendanceReport-Emp-img-container">
                        <img
                            src={attendanceData.empPhoto}
                            className="employee-photo"
                            alt="Employee"
                        />
                    </div>

                    <div className="MyAttendanceReport-Emp-dept-container">
                        <div className="MyAttendanceReport-Emp-dept-container-left">
                            <div className="MyAttendanceReport-Emp-dept-container-left-top">
                                <label>EmpNo: {attendanceData.empNo}</label>
                            </div>
                            <div className="MyAttendanceReport-Emp-dept-container-left-bottom">
                                <label>Emp Name: {attendanceData.empName}</label>
                            </div>
                        </div>
                        <div className="MyAttendanceReport-Emp-dept-container-right">
                            <div className="MyAttendanceReport-Emp-dept-container-right-top">
                                <label>Designation: {attendanceData.designation}</label>
                            </div>
                            <div className="MyAttendanceReport-Emp-dept-container-right-bottom">
                                <label>Department: {attendanceData.department}</label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Attendance Table */}
                <div className="myAttendanceReport-table-container">
                    <table className="myAttendanceReport-Table">
                        <thead>
                            <tr>
                                <th>Shift</th>
                                <th>Date</th>
                                <th>In Time</th>
                                <th>Out Time</th>
                                <th>Late</th>
                                <th>Early Exit</th>
                                <th>Work Hour</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                    </table>
                </div>

                {/* Scrollable area for additional rows */}
                <div className="scrollable-table-container">
                    <table className="myAttendanceReport-Table">
                        <tbody>
                            {filteredData.slice(0).map((data, index) => (
                                <tr key={index}>
                                    <td>{data.shift}</td>
                                    <td>{data.date}</td>
                                    <td>{data.inTime}</td>
                                    <td>{data.outTime}</td>
                                    <td>{data.late}</td>
                                    <td>{data.earlyExit}</td>
                                    <td>{data.workHour}</td>
                                    <td>{data.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default MyAttendanceReport;
