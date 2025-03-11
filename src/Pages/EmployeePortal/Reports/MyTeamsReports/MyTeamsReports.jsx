import React, { useState, useContext, useEffect } from 'react';
import './MyTeamsReports.css';
import Header from '../../../../Components/Header/Header';
import Select from 'react-select';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import { DateRange } from '@mui/icons-material'; // Import MUI icons
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { UserContext } from '../../../../StoreContext/UserContext';
import { useMyTeamTodayQuery } from '../../../../Redux/api/admin/approvalSetupApi';
import { useEmpDateWiseReportMutation } from '../../../../Redux/api/report/attendanceReportApi';

const MyTeamsReports = () => {
    const { userInfo } = useContext(UserContext);
    const id = userInfo.EmployeeId;

    // Fetch data from the API
    const { data: employeeData, isLoading: isEmployeeLoading, error } = useMyTeamTodayQuery(id);
    const [EmpDateWiseReport, { data: AttendanceData, isLoading: isReportLoading, error: ReportError }] = useEmpDateWiseReportMutation();

    // Function to get the current date in YYYY-MM-DD format
    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // State for selected values
    const [selectedEmployeeNos, setSelectedEmployeeNos] = useState([]);
    const [fromDate, setFromDate] = useState(getCurrentDate()); // Set default to current date
    const [toDate, setToDate] = useState(getCurrentDate()); // Set default to current date
    const [employeeOptions, setEmployeeOptions] = useState([]);
    const [page, setPage] = useState(1);
    const ITEMS_PER_PAGE = 10; // Number of items per page

    // Generate employee options from API data
    useEffect(() => {
        if (employeeData && employeeData.data) {
            const options = employeeData.data.map(emp => ({
                value: emp.id, // Use id as the value
                label: `${emp.EmpNo}-${emp.EmployeeName}`, // Combine EmpNo and EmployeeName
                empNo: emp.EmpNo, // Include EmpNo for reference
                EmployeeName: emp.EmployeeName, // Include EmployeeName for reference
            }));
            setEmployeeOptions(options);
        }
    }, [employeeData]);

    // Generate employeeNoOptions from employeeOptions
    const employeeNoOptions = employeeOptions.map(emp => ({
        value: emp.value, // Use value (id) as the value
        label: `${emp.empNo}-${emp.EmployeeName}`, // Combine EmpNo and EmployeeName
    }));

    // Handle show data button click
    const handleShowData = async () => {
        try {
            // Prepare the request body
            const requestBody = {
                EmployeeId: selectedEmployeeNos.map(emp => emp.value).join(','), // Convert array of selected employee IDs to comma-separated string
                FromDate: fromDate,
                ToDate: toDate,
            };

            console.log('Request Body:', requestBody); // Log the request body for debugging

            // Call the API mutation
            const response = await EmpDateWiseReport(requestBody).unwrap();

            // Handle the response
            console.log('API Response:', response);
        } catch (error) {
            console.error('Error fetching raw attendance data:', error);
        }
    };

    // Handle export button click
    const handleExport = () => {
        console.log('Exporting data...');
    };

    // Pagination logic
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedData = AttendanceData?.data?.slice(startIndex, endIndex) || []; // Use API data if available, otherwise fallback to empty array

    const handleNext = () => {
        setPage(prev => prev + 1);
    };

    const handlePrevious = () => {
        setPage(prev => prev - 1);
    };

    return (
        <div className='MyTeamsReports'>
            <Header />
            <div className='MTR-container'>
                {/* Search container */}
                <div className='MTR-search-container'>
                    {/* Left Side - Filters in a Row */}
                    <div className='MTR-filters'>
                        {/* Employee Number Multi-Select */}
                        <div className='MTR-filter'>
                            <label><Diversity3Icon fontSize="small" className='MTR-icon' /> Employee No / Name</label>
                            <Select
                                isMulti
                                options={employeeNoOptions}
                                value={selectedEmployeeNos}
                                onChange={setSelectedEmployeeNos}
                                placeholder="Select Employee No"
                                isLoading={isEmployeeLoading}
                            />
                        </div>

                        {/* From Date Input */}
                        <div className='MTR-filter'>
                            <label><DateRange fontSize="small" className='MTR-icon' /> From Date</label>
                            <input
                                type="date"
                                value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)}
                            />
                        </div>

                        {/* To Date Input */}
                        <div className='MTR-filter'>
                            <label><DateRange fontSize="small" className='MTR-icon' /> To Date</label>
                            <input
                                type="date"
                                value={toDate}
                                onChange={(e) => setToDate(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Right Side - Button */}
                    <div className='MTR-button'>
                        <button onClick={handleShowData} className='MTR-show-btn'>Show Data</button>
                    </div>
                </div>

                {/* Table */}
                <div className='MTR-Table-container'>
                    <div className='MTR-header-container'>
                        <h1 className='MTR-heading'>My Teams Reports</h1>
                        <div className='MTR-icon-container'>
                            <Tooltip title="Export Batch Details in Excel">
                                <IconButton onClick={handleExport}>
                                    <FileDownloadIcon className='MTR-header-icon' />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                    <table className='MTR-Table'>
                        <thead>
                            <tr>
                                <th>EmpNo</th>
                                <th>Name</th>
                                <th>Designation</th>
                                <th>Date</th>
                                <th>Shift</th>
                                <th>In</th>
                                <th>Out</th>
                                <th>Work Hours</th>
                                <th>Overtime</th>
                                <th>Late</th>
                                <th>Early</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.length > 0 ? (
                                paginatedData.map((employee, index) => (
                                    <tr key={index}>
                                        <td>{employee.EmpNo}</td>
                                        <td>{employee.Name}</td>
                                        <td>{employee.Designation}</td>
                                        <td>{employee.Date}</td>
                                        <td>{employee.Shift}</td>
                                        <td>{employee.InTime}</td>
                                        <td>{employee.OutTime}</td>
                                        <td>{employee.WorkHours}</td>
                                        <td>{employee.Overtime}</td>
                                        <td>{employee.Late}</td>
                                        <td>{employee.Early}</td>
                                        <td>{employee.Status}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="12" style={{ textAlign: 'center' }}>No data available</td>
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
                        {endIndex < (AttendanceData?.data?.length || 0) && (
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

export default MyTeamsReports;