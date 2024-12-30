import React, { useState } from 'react';
import './MyApprovalHierarchy.css';
import Header from '../../../Components/Header/Header';
import SearchIcon from '@mui/icons-material/Search';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const ITEMS_PER_PAGE = 5;

const reportingToList = [
    { empPhoto: '/images/kharush.png', name: 'Nidhu Ram Mondal', empNo: 'EMP001', designation: 'Manager', department: 'HR', level: 'Level 1' },
    { empPhoto: '/images/kharush.png', name: 'Alice Brown', empNo: 'EMP002', designation: 'Accountant', department: 'Finance', level: 'Level 2' },
    { empPhoto: '/images/kharush.png', name: 'Alice Brown', empNo: 'EMP003', designation: 'Accountant', department: 'Finance', level: 'Level 3' },
    { empPhoto: '/images/kharush.png', name: 'Alice Brown', empNo: 'EMP004', designation: 'Accountant', department: 'Finance', level: 'Level 4' },
    { empPhoto: '/images/kharush.png', name: 'Alice Brown', empNo: 'EMP005', designation: 'Accountant', department: 'Finance', level: 'Level 5' },
];

const reportingByList = [
    { empPhoto: '/images/kharush.png', name: 'Mark Davis', empNo: 'EMP003', designation: 'Developer', department: 'IT', level: 'Level 1' },
    { empPhoto: '/images/kharush.png', name: 'Emma Johnson', empNo: 'EMP004', designation: 'Marketing Specialist', department: 'Marketing', level: 'Level 2' },
    { empPhoto: '/images/kharush.png', name: 'Mark Davis', empNo: 'EMP005', designation: 'Developer', department: 'IT', level: 'Level 3' },
    { empPhoto: '/images/kharush.png', name: 'Emma Johnson', empNo: 'EMP006', designation: 'Marketing Specialist', department: 'Marketing', level: 'Level 4' },
    { empPhoto: '/images/kharush.png', name: 'Mark Davis', empNo: 'EMP007', designation: 'Developer', department: 'IT', level: 'Level 5' },
    { empPhoto: '/images/kharush.png', name: 'Emma Johnson', empNo: 'EMP008', designation: 'Marketing Specialist', department: 'Marketing', level: 'Level 6' },
];


const MyApprovalHierarchy = () => {
    const [searchTo, setSearchTo] = useState('');
    const [searchBy, setSearchBy] = useState('');
    const [pageTo, setPageTo] = useState(1);
    const [pageBy, setPageBy] = useState(1);

    // Filtered lists
    const filteredReportingToList = reportingToList.filter((employee) =>
        employee.name.toLowerCase().includes(searchTo.toLowerCase())
    );

    const filteredReportingByList = reportingByList.filter((employee) =>
        employee.name.toLowerCase().includes(searchBy.toLowerCase())
    );

    // Pagination for "Reporting To"
    const startIndexTo = (pageTo - 1) * ITEMS_PER_PAGE;
    const paginatedDataTo = filteredReportingToList.slice(startIndexTo, startIndexTo + ITEMS_PER_PAGE);

    // Pagination for "Reported By"
    const startIndexBy = (pageBy - 1) * ITEMS_PER_PAGE;
    const paginatedDataBy = filteredReportingByList.slice(startIndexBy, startIndexBy + ITEMS_PER_PAGE);

    // Pagination Handlers
    const handleNextTo = () => {
        if (startIndexTo + ITEMS_PER_PAGE < filteredReportingToList.length) {
            setPageTo(pageTo + 1);
        }
    };

    const handlePreviousTo = () => {
        if (pageTo > 1) {
            setPageTo(pageTo - 1);
        }
    };

    const handleNextBy = () => {
        if (startIndexBy + ITEMS_PER_PAGE < filteredReportingByList.length) {
            setPageBy(pageBy + 1);
        }
    };

    const handlePreviousBy = () => {
        if (pageBy > 1) {
            setPageBy(pageBy - 1);
        }
    };

    return (
        <div className="myApprovalHierarchy">
            <Header />
            <div className="myApprovalHierarchy-Container">
                <div className="myApprovalHierarchy-grids">
                    {/* Reporting To Section */}
                    <div className="myApprovalHierarchy-repotedTo-table-container">
                        <div className="myApprovalHierarchy-repotedTo-header-container">
                            <h1 className="myApprovalHierarchy-repotedTo-heading">Reported To</h1>
                            <div className="myApprovalHierarchy-repotedTo-icon-container">
                                <Tooltip title="Search">
                                    <IconButton>
                                        <SearchIcon className="myApprovalHierarchy-repotedTo-header-icon" />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Export Leave Status in Excel">
                                    <IconButton>
                                        <FileDownloadIcon className="myApprovalHierarchy-repotedTo-header-icon" />
                                    </IconButton>
                                </Tooltip>
                                {/*
                                <Tooltip title="Add Reporting to">
                                    <IconButton>
                                        <AddIcon className="myApprovalHierarchy-repotedTo-header-icon" />
                                    </IconButton>
                                </Tooltip>
                               */}
                            </div>
                        </div>

                        
                        <table className="myApprovalHierarchy-repotedTo-table">
                            <thead>
                                <tr>
                                    <th>Photo</th>
                                    <th>Name</th>
                                    <th>EmpNo</th>
                                    <th>Designation</th>
                                    <th>Department</th>
                                    <th>Level</th>
                                    {/* <th>Action</th>*/}
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedDataTo.map((employee) => (
                                    <tr key={employee.empNo}>
                                        <td>
                                            <img src={employee.empPhoto} className="employee-photo" alt="Employee" />
                                        </td>
                                        <td>{employee.name}</td>
                                        <td>{employee.empNo}</td>
                                        <td>{employee.designation}</td>
                                        <td>{employee.department}</td>
                                        <td>{employee.level}</td>
                                        {/*
                                        <td>
                                            <DeleteForeverIcon className="delete-btn" />
                                        </td>
                                        */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="pagination-container">
                            {pageTo > 1 && (
                                <IconButton onClick={handlePreviousTo}>
                                    <KeyboardDoubleArrowLeftIcon className="pagination-btn" />
                                </IconButton>
                            )}
                            <span>{pageTo}</span>
                            {startIndexTo + ITEMS_PER_PAGE < filteredReportingToList.length && (
                                <IconButton onClick={handleNextTo}>
                                    <KeyboardDoubleArrowRightIcon className="pagination-btn" />
                                </IconButton>
                            )}
                        </div>
                    </div>

                    {/* Reported By Section */}
                    <div className="myApprovalHierarchy-repotedby-table-container">
                        <div className="myApprovalHierarchy-repotedBy-header-container">
                            <h1 className="myApprovalHierarchy-repotedBy-heading">Reported By</h1>
                            <div className="myApprovalHierarchy-repotedBy-icon-container">
                                <Tooltip title="Search">
                                    <IconButton>
                                        <SearchIcon className="myApprovalHierarchy-repotedBy-header-icon" />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Export Details in Excel">
                                    <IconButton>
                                        <FileDownloadIcon className="myApprovalHierarchy-repotedBy-header-icon" />
                                    </IconButton>
                                </Tooltip>
                                {/*
                                <Tooltip title="Add Reported By">
                                    <IconButton>
                                        <AddIcon className="myApprovalHierarchy-repotedBy-header-icon" />
                                    </IconButton>
                                </Tooltip>
                                */}
                            </div>
                        </div>
                        <table className="myApprovalHierarchy-repotedBy-table">
                            <thead>
                                <tr>
                                    <th>Photo</th>
                                    <th>Name</th>
                                    <th>EmpNo</th>
                                    <th>Designation</th>
                                    <th>Department</th>
                                    <th>Level</th>
                                    {/* <th>Action</th>*/}

                                </tr>
                            </thead>
                            <tbody>
                                {paginatedDataBy.map((employee) => (
                                    <tr key={employee.empNo}>
                                        <td>
                                            <img src={employee.empPhoto} className="employee-photo" alt="Employee" />
                                        </td>
                                        <td>{employee.name}</td>
                                        <td>{employee.empNo}</td>
                                        <td>{employee.designation}</td>
                                        <td>{employee.department}</td>
                                        <td>{employee.level}</td>
                                        {/*
                                     <td>
                                            <DeleteForeverIcon className="delete-btn" />
                                        </td>
                                     
                                     */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="pagination-container">
                            {pageBy > 1 && (
                                <IconButton onClick={handlePreviousBy}>
                                    <KeyboardDoubleArrowLeftIcon className="pagination-btn" />
                                </IconButton>
                            )}
                            <span>{pageBy}</span>
                            {startIndexBy + ITEMS_PER_PAGE < filteredReportingByList.length && (
                                <IconButton onClick={handleNextBy}>
                                    <KeyboardDoubleArrowRightIcon className="pagination-btn" />
                                </IconButton>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyApprovalHierarchy;
