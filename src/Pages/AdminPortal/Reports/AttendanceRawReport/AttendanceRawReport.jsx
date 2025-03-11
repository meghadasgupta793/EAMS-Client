import React, { useState, useEffect } from 'react';
import './AttendanceRawReport.css';
import Header from '../../../../Components/Header/Header';
import Select from 'react-select';
import { Person, Badge, Business, DateRange } from '@mui/icons-material'; // Import MUI icons
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useGetAllEmpInfoQuery } from '../../../../Redux/api/admin/employeeApi';
import { useGetAllOuQuery } from '../../../../Redux/api/admin/ouApi';
import { useGetAllDepartmentQuery } from '../../../../Redux/api/admin/departmentApi';
import { useGetAttendanceRawDataMutation } from '../../../../Redux/api/report/rawReportApi';

const ITEMS_PER_PAGE = 10; // Number of items to display per page

const AttendanceRawReport = () => {
    // Fetch employee data using the API hook
    const { data: employeeData, error: employeeError, isLoading: isEmployeeLoading } = useGetAllEmpInfoQuery();

    // Fetch OU data using the API hook
    const { data: ouData, error: ouError, isLoading: isOULoading } = useGetAllOuQuery();

    // Fetch Department data using the API hook
    const { data: departmentData, departmenterror, isdepartmentLoading } = useGetAllDepartmentQuery();

    // API mutation for fetching raw attendance data
    const [getAttendanceRawData, { data: rawData, isLoading: isRawDataLoading, error: rawDataError }] = useGetAttendanceRawDataMutation();

    // State for employee options
    const [employeeOptions, setEmployeeOptions] = useState([]);

    // State for OU options
    const [ouOptions, setOUOptions] = useState([]);

    // State for Department options
    const [departmentOptions, setDepartmentOptions] = useState([]);

    // Function to get the current date in YYYY-MM-DD format
    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // State for selected values
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const [selectedEmployeeNos, setSelectedEmployeeNos] = useState([]);
    const [selectedOU, setSelectedOU] = useState([]);
    const [selectedDepartments, setSelectedDepartments] = useState([]);
    const [fromDate, setFromDate] = useState(getCurrentDate()); // Set default to current date
    const [toDate, setToDate] = useState(getCurrentDate()); // Set default to current date
    const [page, setPage] = useState(1); // Pagination state

    // Map API data to employeeOptions when data is fetched
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

    // Map API data to ouOptions when data is fetched
    useEffect(() => {
        if (ouData && ouData.data) {
            const options = ouData.data.map(ou => ({
                value: ou.id, // Use id as the value
                label: ou.OUName, // Use OUName as the label
            }));
            setOUOptions(options);
        }
    }, [ouData]);

    // Map API data to departmentOptions when data is fetched
    useEffect(() => {
        if (departmentData && departmentData.data) {
            const options = departmentData.data.map(dept => ({
                value: dept.ID, // Use ID as the value
                label: dept.Name, // Use Name as the label
            }));
            setDepartmentOptions(options);
        }
    }, [departmentData]);

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
                OuId: selectedOU.map(ou => ou.value).join(','), // Convert array of selected OU IDs to comma-separated string
                DepartmentId: selectedDepartments.map(dept => dept.value).join(','), // Convert array of selected department IDs to comma-separated string
                EmployeeId: selectedEmployeeNos.map(emp => emp.value).join(','), // Convert array of selected employee IDs to comma-separated string
                FromDate: fromDate,
                ToDate: toDate,
            };

            console.log('Request Body:', requestBody); // Log the request body for debugging

            // Call the API mutation
            const response = await getAttendanceRawData(requestBody).unwrap();

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
    const paginatedData = rawData?.data || []; // Use API data if available, otherwise fallback to empty array

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
                            <label><Badge fontSize="small" className='ARR-icon' /> Employee No / Name</label>
                            <Select
                                isMulti
                                options={employeeNoOptions}
                                value={selectedEmployeeNos}
                                onChange={setSelectedEmployeeNos}
                                placeholder="Select Employee No"
                                isLoading={isEmployeeLoading}
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
                                isLoading={isOULoading}
                            />
                        </div>

                        {/* Department Multi-Select */}
                        <div className='ARR-filter'>
                            <label><Business fontSize="small" className='ARR-icon' /> Department</label>
                            <Select
                                isMulti
                                options={departmentOptions}
                                value={selectedDepartments}
                                onChange={setSelectedDepartments}
                                placeholder="Select Department"
                                isLoading={isdepartmentLoading}
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
                        <h1 className='ARR-heading'>Attendance Raw Report</h1>
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
                                <th>Punch Date & Time</th>
                                <th>IN/OUT</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.length > 0 ? (
                                paginatedData.map((employee) => (
                                    <tr key={employee.ID}>
                                        <td>{employee.EmpNo}</td>
                                        <td>{employee.EmployeeName}</td>
                                        <td>{employee.DepartmentName}</td>
                                        <td>{employee.Designation}</td>
                                        <td>{employee.OUName}</td>
                                        <td>{employee.PunchTime}</td>
                                        <td>{employee.InOutMode}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" style={{ textAlign: 'center' }}>No data available</td>
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
                        {endIndex < paginatedData.length && (
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