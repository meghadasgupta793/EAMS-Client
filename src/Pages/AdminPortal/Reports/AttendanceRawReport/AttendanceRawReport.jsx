import React, { useState } from 'react';
import './AttendanceRawReport.css';
import Header from '../../../../Components/Header/Header';
import Select from 'react-select';
import { Person, Badge, Business, DateRange } from '@mui/icons-material'; // Import MUI icons
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

const ITEMS_PER_PAGE = 10; // Number of items to display per page

const AttendanceRawReport = () => {
    // Dummy data for multi-select options
    const employeeOptions = [
        { value: 'E001', label: 'John Doe' },
        { value: 'E002', label: 'Jane Smith' },
        { value: 'E003', label: 'Alice Johnson' },
        { value: 'E004', label: 'Bob Brown' },
    ];

    const employeeNoOptions = employeeOptions.map(emp => ({ value: emp.value, label: emp.value }));

    const ouOptions = [
        { value: 'OU001', label: 'Sales' },
        { value: 'OU002', label: 'Marketing' },
        { value: 'OU003', label: 'Engineering' },
        { value: 'OU004', label: 'HR' },
    ];

    // State for selected values
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const [selectedEmployeeNos, setSelectedEmployeeNos] = useState([]);
    const [selectedOU, setSelectedOU] = useState([]);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [page, setPage] = useState(1); // Pagination state

    // Dummy employee data
    const dummyEmployeeData = [
        { empNo: 'E001', name: 'John Doe', department: 'Sales', designation: 'Sales Executive', ou: 'OU001', date: '2023-10-01', inTime: '09:00 AM', outTime: '06:00 PM' },
        { empNo: 'E002', name: 'Jane Smith', department: 'Marketing', designation: 'Marketing Manager', ou: 'OU002', date: '2023-10-01', inTime: '09:15 AM', outTime: '06:15 PM' },
        { empNo: 'E003', name: 'Alice Johnson', department: 'Engineering', designation: 'Software Engineer', ou: 'OU003', date: '2023-10-01', inTime: '09:30 AM', outTime: '06:30 PM' },
        { empNo: 'E004', name: 'Bob Brown', department: 'HR', designation: 'HR Manager', ou: 'OU004', date: '2023-10-01', inTime: '09:45 AM', outTime: '06:45 PM' },
        { empNo: 'E005', name: 'Charlie White', department: 'Finance', designation: 'Accountant', ou: 'OU005', date: '2023-10-01', inTime: '08:50 AM', outTime: '05:50 PM' },
        { empNo: 'E006', name: 'David Green', department: 'IT', designation: 'System Admin', ou: 'OU006', date: '2023-10-01', inTime: '10:00 AM', outTime: '07:00 PM' },
        { empNo: 'E007', name: 'Emily Carter', department: 'Operations', designation: 'Operations Manager', ou: 'OU007', date: '2023-10-01', inTime: '08:30 AM', outTime: '05:30 PM' },
        { empNo: 'E008', name: 'Frank Adams', department: 'Customer Service', designation: 'Customer Support', ou: 'OU008', date: '2023-10-01', inTime: '09:20 AM', outTime: '06:20 PM' },
        { empNo: 'E009', name: 'Grace Hill', department: 'Engineering', designation: 'Data Scientist', ou: 'OU009', date: '2023-10-01', inTime: '10:15 AM', outTime: '07:15 PM' },
        { empNo: 'E010', name: 'Harry King', department: 'Legal', designation: 'Legal Advisor', ou: 'OU010', date: '2023-10-01', inTime: '09:10 AM', outTime: '06:10 PM' },
        { empNo: 'E011', name: 'Isabella Lopez', department: 'Marketing', designation: 'SEO Specialist', ou: 'OU011', date: '2023-10-01', inTime: '08:45 AM', outTime: '05:45 PM' },
        { empNo: 'E012', name: 'Jack Turner', department: 'IT', designation: 'Network Engineer', ou: 'OU012', date: '2023-10-01', inTime: '09:40 AM', outTime: '06:40 PM' },
        { empNo: 'E013', name: 'Katherine Evans', department: 'HR', designation: 'Recruiter', ou: 'OU013', date: '2023-10-01', inTime: '08:55 AM', outTime: '05:55 PM' },
        { empNo: 'E014', name: 'Leo Martin', department: 'Sales', designation: 'Sales Representative', ou: 'OU014', date: '2023-10-01', inTime: '09:05 AM', outTime: '06:05 PM' },
        { empNo: 'E015', name: 'Mia Scott', department: 'Operations', designation: 'Logistics Coordinator', ou: 'OU015', date: '2023-10-01', inTime: '09:35 AM', outTime: '06:35 PM' },
        { empNo: 'E016', name: 'Nathan Carter', department: 'Engineering', designation: 'DevOps Engineer', ou: 'OU016', date: '2023-10-01', inTime: '10:10 AM', outTime: '07:10 PM' },
        { empNo: 'E017', name: 'Olivia Harris', department: 'Finance', designation: 'Financial Analyst', ou: 'OU017', date: '2023-10-01', inTime: '08:40 AM', outTime: '05:40 PM' },
        { empNo: 'E018', name: 'Patrick Williams', department: 'Legal', designation: 'Paralegal', ou: 'OU018', date: '2023-10-01', inTime: '09:25 AM', outTime: '06:25 PM' },
        { empNo: 'E019', name: 'Quinn Thomas', department: 'Customer Service', designation: 'Help Desk Support', ou: 'OU019', date: '2023-10-01', inTime: '09:50 AM', outTime: '06:50 PM' },
        { empNo: 'E020', name: 'Rachel Moore', department: 'IT', designation: 'Software Tester', ou: 'OU020', date: '2023-10-01', inTime: '09:55 AM', outTime: '06:55 PM' }
    ];

    // Handle show data button click
    const handleShowData = () => {
        console.log('Selected Employee Numbers:', selectedEmployeeNos);
        console.log('Selected Employees:', selectedEmployees);
        console.log('Selected OU:', selectedOU);
        console.log('From Date:', fromDate);
        console.log('To Date:', toDate);
    };

    // Handle export button click
    const handleExport = () => {
        console.log('Exporting data...');
    };

    // Pagination logic
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedData = dummyEmployeeData.slice(startIndex, endIndex);

    const handleNext = () => {
        setPage(prev => prev + 1);
    };

    const handlePrevious = () => {
        setPage(prev => prev - 1);
    };

    return (
        <div className='AttendanceRawReport'>
            <Header />
            <div className='ARR-container'>
                {/* Search container */}
                <div className='ARR-seach-container'>
                    {/* Left Side - Filters in a Row */}
                    <div className='ARR-filters'>
                        {/* Employee Number Multi-Select */}
                        <div className='ARR-filter'>
                            <label><Badge fontSize="small" className='ARR-icon' /> Employee No</label>
                            <Select
                                isMulti
                                options={employeeNoOptions}
                                value={selectedEmployeeNos}
                                onChange={setSelectedEmployeeNos}
                                placeholder="Select Employee No"
                            />
                        </div>

                        {/* Employee Multi-Select */}
                        <div className='ARR-filter'>
                            <label><Person fontSize="small" className='ARR-icon' /> Employee Name</label>
                            <Select
                                isMulti
                                options={employeeOptions}
                                value={selectedEmployees}
                                onChange={setSelectedEmployees}
                                placeholder="Select Employees"
                            />
                        </div>

                        {/* OU Multi-Select */}
                        <div className='ARR-filter'>
                            <label><Business fontSize="small" className='ARR-icon' /> OU Name</label>
                            <Select
                                isMulti
                                options={ouOptions}
                                value={selectedOU}
                                onChange={setSelectedOU}
                                placeholder="Select OU"
                            />
                        </div>

                        {/* From Date Input */}
                        <div className='ARR-filter'>
                            <label><DateRange fontSize="small" className='ARR-icon' /> From Date</label>
                            <input
                                type="date"
                                value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)}
                            />
                        </div>

                        {/* To Date Input */}
                        <div className='ARR-filter'>
                            <label><DateRange fontSize="small" className='ARR-icon' /> To Date</label>
                            <input
                                type="date"
                                value={toDate}
                                onChange={(e) => setToDate(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Right Side - Button */}
                    <div className='ARR-button'>
                        <button onClick={handleShowData} className='ARR-show-btn'>Show Data</button>
                    </div>
                </div>

                {/* Table */}
                <div className='ARR-Table-container'>
                    <div className='ARR-header-container'>
                        <h1 className='ARR-heading'>Attendance Raw report</h1>
                        <div className='ARR-icon-container'>
                            <Tooltip title="Export Batch Details in Excel">
                                <IconButton onClick={handleExport}>
                                    <FileDownloadIcon className='ARR-header-icon' />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                    <table className='ARR-Table'>
                        <thead>
                            <tr>
                                <th>EmpNo</th>
                                <th>Name</th>
                                <th>Department</th>
                                <th>Designation</th>
                                <th>OU</th>
                                <th>Date</th>
                                <th>IN</th>
                                <th>OUT</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.length > 0 ? (
                                paginatedData.map((employee, index) => (
                                    <tr key={index}>
                                        <td>{employee.empNo}</td>
                                        <td>{employee.name}</td>
                                        <td>{employee.department}</td>
                                        <td>{employee.designation}</td>
                                        <td>{employee.ou}</td>
                                        <td>{employee.date}</td>
                                        <td>{employee.inTime}</td>
                                        <td>{employee.outTime}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" style={{ textAlign: 'center' }}>No data available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Pagination Controls */}
                    <div className='pagination-container'>
                        {page > 1 && (
                            <IconButton onClick={handlePrevious}>
                                <KeyboardDoubleArrowLeftIcon className='pagination-btn' />
                            </IconButton>
                        )}
                        <span>{page}</span>
                        {endIndex < dummyEmployeeData.length && (
                            <IconButton onClick={handleNext}>
                                <KeyboardDoubleArrowRightIcon className='pagination-btn' />
                            </IconButton>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AttendanceRawReport;