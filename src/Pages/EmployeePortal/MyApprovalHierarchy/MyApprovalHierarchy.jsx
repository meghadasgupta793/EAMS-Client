import React, { useState, useContext } from 'react';
import './MyApprovalHierarchy.css';
import Header from '../../../Components/Header/Header';
import SearchIcon from '@mui/icons-material/Search';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { UserContext } from '../../../StoreContext/UserContext';
import { useGetReportingListsQuery } from '../../../Redux/api/admin/approvalSetupApi';
import config from '../../../secrect';

const ITEMS_PER_PAGE = 5;

const MyApprovalHierarchy = () => {
    const { userInfo } = useContext(UserContext);
    const id = userInfo.EmployeeId;
    const { data, error, isLoading } = useGetReportingListsQuery(id);
    const { ImgUrl } = config;

    const reportingToList = data?.reportingToList || [];
    const reportingByList = data?.reportingByList || [];

    const [searchTo, setSearchTo] = useState('');
    const [searchBy, setSearchBy] = useState('');
    const [pageTo, setPageTo] = useState(1);
    const [pageBy, setPageBy] = useState(1);
    const [showSearchTo, setShowSearchTo] = useState(false); // State for showing search input for "Reporting To"
    const [showSearchBy, setShowSearchBy] = useState(false); // State for showing search input for "Reported By"

    // Filtering logic for "Reporting To"
    const filteredReportingToList = reportingToList.filter(employee =>
        employee.name.toLowerCase().includes(searchTo.toLowerCase()) ||
        employee.empNo.toLowerCase().includes(searchTo.toLowerCase())
    );

    // Filtering logic for "Reported By"
    const filteredReportingByList = reportingByList.filter(employee =>
        employee.name.toLowerCase().includes(searchBy.toLowerCase()) ||
        employee.empNo.toLowerCase().includes(searchBy.toLowerCase())
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
                                    <div className="search-container">
                                        {showSearchTo && (
                                            <input
                                                type="text"
                                                placeholder="Search by Name or EmpNo"
                                                value={searchTo}
                                                onChange={(e) => setSearchTo(e.target.value)}
                                                className="search-input active"
                                            />
                                        )}
                                        <IconButton onClick={(e) => {
                                            e.stopPropagation(); // Prevents event bubbling
                                            setShowSearchTo(prev => !prev); // Toggles only "Reported To"
                                            setShowSearchBy(false); // Ensures "Reported By" is closed
                                        }}>
                                            <SearchIcon className="search-icon" />
                                        </IconButton>
                                    </div>
                                </Tooltip>

                                <Tooltip title="Export Leave Status in Excel">
                                    <IconButton>
                                        <FileDownloadIcon className="myApprovalHierarchy-repotedTo-header-icon" />
                                    </IconButton>
                                </Tooltip>
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
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedDataTo.map((employee) => (
                                    <tr key={employee.empNo}>
                                        <td>
                                            <img
                                                src={employee.empPhoto ? `${ImgUrl}/${employee.empPhoto}` : '/images/default.png'}
                                                className="employee-photo"
                                                alt="Employee"
                                            />
                                        </td>
                                        <td>{employee.name}</td>
                                        <td>{employee.empNo}</td>
                                        <td>{employee.designation}</td>
                                        <td>{employee.department}</td>
                                        <td>{employee.level}</td>
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
                                    <div className="search-container">
                                        {showSearchBy && (
                                            <input
                                                type="text"
                                                placeholder="Search by Name or EmpNo"
                                                value={searchBy}
                                                onChange={(e) => setSearchBy(e.target.value)}
                                                className="search-input active"
                                            />
                                        )}
                                        <IconButton onClick={(e) => {
                                            e.stopPropagation();
                                            setShowSearchBy(prev => !prev); // Toggles only "Reported By"
                                            setShowSearchTo(false); // Ensures "Reported To" is closed
                                        }}>
                                            <SearchIcon className="search-icon" />
                                        </IconButton>
                                    </div>
                                </Tooltip>


                                <Tooltip title="Export Details in Excel">
                                    <IconButton>
                                        <FileDownloadIcon className="myApprovalHierarchy-repotedBy-header-icon" />
                                    </IconButton>
                                </Tooltip>
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
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedDataBy.map((employee) => (
                                    <tr key={employee.empNo}>
                                        <td>
                                            <img
                                                src={employee.empPhoto ? `${ImgUrl}/${employee.empPhoto}` : '/images/default.png'}
                                                className="employee-photo"
                                                alt="Employee"
                                            />
                                        </td>
                                        <td>{employee.name}</td>
                                        <td>{employee.empNo}</td>
                                        <td>{employee.designation}</td>
                                        <td>{employee.department}</td>
                                        <td>{employee.level}</td>
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