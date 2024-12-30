import React, { useState } from 'react';
import './EmployeeDataTable.css';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import SearchIcon from '@mui/icons-material/Search';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { exportToExcel } from '../../Utils/excelUtils';
import { useNavigate } from 'react-router-dom';

const ITEMS_PER_PAGE = 7;

const EmployeeDataTable = () => {
    const [searchActive, setSearchActive] = useState(false);
    const [searchQueries, setSearchQueries] = useState({
        empNo: '',
        empName: '',
        department: '',
        designation: '',
        organization: '',
    });
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    const goToCreateEmployee = () => {
        navigate('/newEmployee');
    };

    const goToUpdateEmployee = () => {
        navigate('/updateEmployee');
    };

    const goToApprovalSetup = () => {
        navigate('/approvalSetup');
    };

    const data = [
        {
            empPhoto: '/images/profile.png',
            empNo: 'E001',
            ticketNo: 'T001',
            empName: 'John Doe',
            department: 'HR',
            designation: 'Manager',
            organization: 'ABC Corp',
        },
        {
            empPhoto: '/images/profile.png',
            empNo: 'E002',
            ticketNo: 'T002',
            empName: 'Jane Smith',
            department: 'Finance',
            designation: 'Analyst',
            organization: 'XYZ Inc',
        },
        {
            empPhoto: '/images/kharush.png',
            empNo: 'E002',
            ticketNo: 'T002',
            empName: 'Jane Smith',
            department: 'Finance',
            designation: 'Analyst',
            organization: 'XYZ Inc',
        },
        {
            empPhoto: '/images/profile.png',
            empNo: 'E002',
            ticketNo: 'T002',
            empName: 'Jane Smith',
            department: 'Finance',
            designation: 'Analyst',
            organization: 'XYZ Inc',
        },
        {
            empPhoto: '/images/profile.png',
            empNo: 'E002',
            ticketNo: 'T002',
            empName: 'Jane Smith',
            department: 'Finance',
            designation: 'Analyst',
            organization: 'XYZ Inc',
        },
        {
            empPhoto: '/images/profile.png',
            empNo: 'E002',
            ticketNo: 'T002',
            empName: 'Jane Smith',
            department: 'Finance',
            designation: 'Analyst',
            organization: 'XYZ Inc',
        },
        {
            empPhoto: '/images/profile.png',
            empNo: 'E002',
            ticketNo: 'T002',
            empName: 'Jane Smith',
            department: 'Finance',
            designation: 'Analyst',
            organization: 'XYZ Inc',
        },
        {
            empPhoto: '/images/kharush.png',
            empNo: 'E002',
            ticketNo: 'T002',
            empName: 'Jane Smith',
            department: 'Finance',
            designation: 'Analyst',
            organization: 'XYZ Inc',
        },
        {
            empPhoto: '/images/profile.png',
            empNo: 'E002',
            ticketNo: 'T002',
            empName: 'Jane Smith',
            department: 'Finance',
            designation: 'Analyst',
            organization: 'XYZ Inc',
        },
        // Add more employee data
    ];

    const handleSearchChange = (e, field) => {
        setSearchQueries(prevQueries => ({
            ...prevQueries,
            [field]: e.target.value,
        }));
    };

    const filteredData = data.filter(item =>
        item.empNo.toLowerCase().includes(searchQueries.empNo.toLowerCase()) &&
        item.empName.toLowerCase().includes(searchQueries.empName.toLowerCase()) &&
        item.department.toLowerCase().includes(searchQueries.department.toLowerCase()) &&
        item.designation.toLowerCase().includes(searchQueries.designation.toLowerCase()) &&
        item.organization.toLowerCase().includes(searchQueries.organization.toLowerCase())
    );

    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    const handleNext = () => {
        setPage(prev => prev + 1);
    };

    const handlePrevious = () => {
        setPage(prev => prev - 1);
    };

    const myTable = 'EmployeeDetails';
    const handleExport = () => {
        exportToExcel(filteredData, myTable);
    };

    return (
        <>
            <div className='table-container'>
                <div className='header-container'>
                    <h1 className='heading'>Employee List</h1>
                    <div className='icon-container'>
                        <Tooltip title="Search">
                            <IconButton onClick={() => setSearchActive(!searchActive)}>
                                <SearchIcon className='header-icon' />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Export Employee Details in Excel">
                            <IconButton onClick={handleExport}>
                                <FileDownloadIcon className='header-icon' />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Download Excel Template To Import Employee">
                            <IconButton>
                                <CloudDownloadIcon className='header-icon' />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Choose File">
                            <IconButton>
                                <CloudUploadIcon className='header-icon' />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Create New Employee">
                            <IconButton onClick={goToCreateEmployee}>
                                <GroupAddIcon className='header-icon' />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
                

                <table className='employee-table'>
                    <thead>
                        <tr>
                            {searchActive ? (
                                <>
                                    <th>
                                        <input
                                            type="text"
                                            value={searchQueries.empNo}
                                            onChange={(e) => handleSearchChange(e, 'empNo')}
                                            placeholder="Search Emp No"
                                        />
                                    </th>
                                    <th>
                                        <input
                                            type="text"
                                            value={searchQueries.empName}
                                            onChange={(e) => handleSearchChange(e, 'empName')}
                                            placeholder="Search Emp Name"
                                        />
                                    </th>
                                    <th>
                                        <input
                                            type="text"
                                            value={searchQueries.department}
                                            onChange={(e) => handleSearchChange(e, 'department')}
                                            placeholder="Search Department"
                                        />
                                    </th>
                                    <th>
                                        <input
                                            type="text"
                                            value={searchQueries.designation}
                                            onChange={(e) => handleSearchChange(e, 'designation')}
                                            placeholder="Search Designation"
                                        />
                                    </th>
                                    <th>
                                        <input
                                            type="text"
                                            value={searchQueries.organization}
                                            onChange={(e) => handleSearchChange(e, 'organization')}
                                            placeholder="Search Organization"
                                        />
                                    </th>
                                </>
                            ) : (
                                <>
                                    <th>Photo</th>
                                    <th>Emp No</th>
                                    <th>Emp Name</th>
                                    <th>Department</th>
                                    <th>Designation</th>
                                    <th>Organization</th>
                                    <th>Action</th>
                                </>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((item, index) => (
                            <tr key={index}>
                                {searchActive ? (
                                    <>
                                        <td>{item.empNo}</td>
                                        <td>{item.empName}</td>
                                        <td>{item.department}</td>
                                        <td>{item.designation}</td>
                                        <td>{item.organization}</td>
                                    </>
                                ) : (
                                    <>
                                        <td><img src={item.empPhoto} className='employee-photo' alt="Employee" /></td>
                                        <td>{item.empNo}</td>
                                        <td>{item.empName}</td>
                                        <td>{item.department}</td>
                                        <td>{item.designation}</td>
                                        <td>{item.organization}</td>
                                        <td>
                                            <BorderColorIcon className='action-btn update-btn' onClick={goToUpdateEmployee} />
                                            <DeleteForeverIcon className='action-btn delete-btn' />
                                            <AccountTreeIcon className='action-btn update-btn' onClick={goToApprovalSetup} />
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className='pagination-container'>
                    {page > 1 && (
                        <IconButton onClick={handlePrevious}>
                            <KeyboardDoubleArrowLeftIcon className='pagination-btn' />
                        </IconButton>
                    )}
                    <span>{page}</span>
                    {endIndex < filteredData.length && (
                        <IconButton onClick={handleNext}>
                            <KeyboardDoubleArrowRightIcon className='pagination-btn' />
                        </IconButton>
                    )}
                </div>
            </div>
        </>
    );
};

export default EmployeeDataTable;
