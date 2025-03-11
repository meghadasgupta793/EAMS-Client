import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyTeam.css';
import Header from '../../../Components/Header/Header';

import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import SearchIcon from '@mui/icons-material/Search';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import DescriptionIcon from '@mui/icons-material/Description'; // Icon for the report
import { UserContext } from '../../../StoreContext/UserContext';
import { useMyTeamTodayQuery } from '../../../Redux/api/admin/approvalSetupApi';
import config from '../../../secrect';

const MyTeam = () => {
    const { ImgUrl } = config;
    const { userInfo } = useContext(UserContext);
    const id = userInfo.EmployeeId;
    console.log(userInfo);

    // Fetch data from the API
    const { data: myTeamData, isLoading, error } = useMyTeamTodayQuery(id);

    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchVisible, setSearchVisible] = useState(false);

    // Use the data from the API or fallback to an empty array
    const teamData = myTeamData?.data || [];

    // Filter data based on search query
    const filteredData = teamData.filter(item =>
        item.EmpNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.EmployeeName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pagination logic
    const ITEMS_PER_PAGE = 7;
    const [page, setPage] = useState(1);
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    const handleNext = () => setPage(prev => prev + 1);
    const handlePrevious = () => setPage(prev => prev - 1);

    const handleMarkAttendance = (empNo) => {
        console.log(`Attendance marked for Employee No: ${empNo}`);
        navigate(`/my-teams-attendance/${empNo}`);
    };

    const handleViewReport = (empNo) => {
        console.log(`View report for Employee No: ${empNo}`);
        navigate(`/myTeams-report/${empNo}`); // Navigate to the desired route
    };

    const handleSearchClick = () => {
        setSearchVisible(!isSearchVisible);
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <>
            <div className='myTeam'>
                <Header />
                <div className='myTeam-container'>
                    <div className="myTeam-header-container">
                        <h1 className="myTeam-heading">My Team</h1>
                        <div className="myTeam-icon-container">
                            <div className={`search-box ${isSearchVisible ? 'active' : ''}`}>
                                {isSearchVisible && (
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search by Emp No or Name"
                                        className='search-input'
                                    />
                                )}
                                <SearchIcon className='search-icon' onClick={handleSearchClick} />
                            </div>
                        </div>
                    </div>

                    <table className='myTeam-Table'>
                        <thead>
                            <tr>
                                <th>Photo</th>
                                <th>Emp No</th>
                                <th>Name</th>
                                <th>Department</th>
                                <th>Designation</th>
                                <th>In Time</th>
                                <th>Out Time</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <img
                                            src={`${ImgUrl}/${item.PictureName}`}
                                            alt={`${item.EmpNo} Photo`}
                                            className="employee-photo"
                                        />
                                    </td>
                                    <td>{item.EmpNo}</td>
                                    <td>{item.EmployeeName}</td>
                                    <td>{item.Department}</td>
                                    <td>{item.Designation}</td>
                                    <td>{item.inTime || 'N/A'}</td>
                                    <td>{item.outTime || 'N/A'}</td>
                                    <td>
                                        <Tooltip title="Mark Attendance">
                                            <IconButton onClick={() => handleMarkAttendance(item.EmpNo)}>
                                                <SensorOccupiedIcon className='action-btn mark-attendance-btn' />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="View Report">
                                            <IconButton onClick={() => handleViewReport(item.EmpNo)}>
                                                <DescriptionIcon className='action-btn view-report-btn' />
                                            </IconButton>
                                        </Tooltip>
                                    </td>
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
            </div>
        </>
    );
};

export default MyTeam;