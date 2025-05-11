import React, { useState, useContext } from 'react';
import './TeamAttendance.css';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import { UserContext } from '../../../StoreContext/UserContext';
import { useMyTeamTodayQuery } from '../../../Redux/api/admin/approvalSetupApi';
import config from '../../../secrect';

const ITEMS_PER_PAGE = 3;
const MAX_NAME_LENGTH = 15;

const TeamAttendance = () => {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [attendanceStatusFilter, setAttendanceStatusFilter] = useState('');
    const { ImgUrl } = config;
    const { userInfo } = useContext(UserContext);
    const id = userInfo.EmployeeId;
    const { data: myTeamData, isLoading, error } = useMyTeamTodayQuery(id);

    const attendanceData = myTeamData?.data || [];

    const filteredData = attendanceData.filter(item => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const matchesSearch = item.EmployeeName.toLowerCase().includes(lowerCaseSearchTerm) ||
            item.EmpNo.toString().includes(lowerCaseSearchTerm);
        const matchesStatus = attendanceStatusFilter ? item.status === attendanceStatusFilter : true;
        return matchesSearch && matchesStatus;
    });


    const handleNext = () => {
        if (endIndex < filteredData.length) {
            setPage(prev => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (page > 1) {
            setPage(prev => prev - 1);
        }
    };

    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
    };

    const toggleSearchInput = () => {
        setIsSearchVisible(prev => !prev);
        if (isSearchVisible) {
            setSearchTerm('');
        }
    };

    const handleStatusChange = (e) => {
        setAttendanceStatusFilter(e.target.value);
        setPage(1); // Reset to first page on filter change
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setPage(1); // Reset to first page on search term change
    };

    return (
        <div className='TeamAttendance'>
            <div className='teamAttendance-header-container'>

                <h1 className='teamAttendance-heading'>Team Attendance</h1>

                <div className='teamAttendance-icon-container'>
                    {/* Search */}
                    <div className='search'>
                        {isSearchVisible && (
                            <input
                                type='text'
                                placeholder='Search by Name or Emp No.'
                                value={searchTerm}
                                onChange={handleSearchChange} // Updated here
                                className='searchInput'
                            />
                        )}
                        <span className="searchIcon">
                            <SearchIcon onClick={toggleSearchInput} />
                        </span>
                    </div>

                    {/* Attendance Status Filter */}
                    <div className='statusFilter'>
                        <select value={attendanceStatusFilter} onChange={handleStatusChange} className='statusSelect'>
                            <option value=''>All Statuses</option>
                            <option value='PP'>Present</option>
                            <option value='EE'>Early</option>
                            <option value='Lt'>Late</option>
                            <option value='P'>SinglePunch</option>
                            <option value='AA'>Absent</option>
                            <option value='WO'>weekOff</option>
                        </select>
                    </div>
                </div>




            </div>
            <div className='attendanceList'>
                {filteredData.slice(startIndex, endIndex).map((item) => (
                    <div key={item.id} className='attendanceItem'>
                        <img src={`${ImgUrl}/${item.PictureName}`} alt={item.EmployeeName} className='profileImg' />
                        <div className='employeeDetails'>
                            <p className='empNo'>Emp No: {item.EmpNo}</p>
                            <p className='empName'>{truncateText(item.EmployeeName, MAX_NAME_LENGTH)}</p>
                            <p className='attendanceStatus'>Status: {item.status}</p>
                            <p className='inTime'>In Time: {item.inTime || 'N/A'}</p>
                            <p className='outTime'>Out Time: {item.outTime || 'N/A'}</p>
                        </div>
                    </div>
                ))}

            </div>
            <div className='pagination-container'>
                {page > 1 && (
                    <IconButton onClick={handlePrevious} disabled={page === 1}>
                        <KeyboardDoubleArrowLeftIcon className='pagination-btn' />
                    </IconButton>
                )}
                <span>{page}</span>
                {endIndex < filteredData.length && (
                    <IconButton onClick={handleNext} disabled={endIndex >= filteredData.length}>
                        <KeyboardDoubleArrowRightIcon className='pagination-btn' />
                    </IconButton>
                )}
            </div>
        </div>
    );
};

export default TeamAttendance;
