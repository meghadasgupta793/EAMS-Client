import React, { useState } from 'react';
import './TeamAttendance.css';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';

const ITEMS_PER_PAGE = 3;
const MAX_NAME_LENGTH = 15;

const TeamAttendance = () => {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [attendanceStatusFilter, setAttendanceStatusFilter] = useState('');

    const attendanceData = [
        { id: 49, img: "/images/kharush.png", empNo: 268, name: "NidhuRam mondal", inTime: "13:04:00", outTime: "16:04:00", workHour: "04:00:00", lateIn: "03:04:00", earlyOut: "00:00:00", oT: "00:00:00", attendanceStatus: "Lt" },
        { id: 50, img: "/images/profile.png", empNo: 269, name: "Alok Das", inTime: "13:05:00", outTime: null, workHour: null, lateIn: null, earlyOut: "00:00:00", oT: "00:00:00", attendanceStatus: "PX" },
        { id: 51, img: "/images/emp1.png", empNo: 270, name: "Megha Verma", inTime: "09:00:00", outTime: "17:00:00", workHour: "08:00:00", lateIn: "00:00:00", earlyOut: "00:00:00", oT: "00:30:00", attendanceStatus: "P" },
        { id: 52, img: "/images/profile.png", empNo: 271, name: "Rahul Gupta", inTime: "13:10:00", outTime: "16:30:00", workHour: "03:20:00", lateIn: "03:10:00", earlyOut: "00:30:00", oT: "00:00:00", attendanceStatus: "Lt" },
        { id: 53, img: "/images/profile.png", empNo: 272, name: "Aditi Jain", inTime: "08:45:00", outTime: "17:00:00", workHour: "08:15:00", lateIn: "00:00:00", earlyOut: "00:00:00", oT: "01:00:00", attendanceStatus: "P" },
        { id: 54, img: "/images/profile.png", empNo: 273, name: "Ravi Kumar", inTime: "08:30:00", outTime: "12:00:00", workHour: "03:30:00", lateIn: "00:00:00", earlyOut: "01:00:00", oT: "00:00:00", attendanceStatus: "E" },
        { id: 55, img: "/images/profile.png", empNo: 274, name: "Sonia Kaur", inTime: null, outTime: null, workHour: null, lateIn: null, earlyOut: null, oT: null, attendanceStatus: "A" },
        { id: 56, img: "/images/profile.png", empNo: 275, name: "Vivek Singh", inTime: "13:15:00", outTime: "17:00:00", workHour: "03:45:00", lateIn: "03:15:00", earlyOut: "00:00:00", oT: "00:00:00", attendanceStatus: "Lt" },
        { id: 57, img: "/images/profile.png", empNo: 276, name: "Anita Bose", inTime: "09:10:00", outTime: "18:00:00", workHour: "08:50:00", lateIn: "00:10:00", earlyOut: "00:00:00", oT: "01:30:00", attendanceStatus: "P" },
        { id: 58, img: "/images/profile.png", empNo: 277, name: "Rohit Verma", inTime: "08:50:00", outTime: "17:05:00", workHour: "08:15:00", lateIn: "00:00:00", earlyOut: "00:00:00", oT: "00:30:00", attendanceStatus: "P" },
        { id: 59, img: "/images/profile.png", empNo: 278, name: "Neha Patil", inTime: "10:00:00", outTime: "16:00:00", workHour: "06:00:00", lateIn: "01:00:00", earlyOut: "00:00:00", oT: "00:00:00", attendanceStatus: "P" },
        { id: 60, img: "/images/profile.png", empNo: 279, name: "Ajay Mehta", inTime: null, outTime: null, workHour: null, lateIn: null, earlyOut: null, oT: null, attendanceStatus: "A" },
        { id: 61, img: "/images/profile.png", empNo: 280, name: "Simran Kaur", inTime: null, outTime: null, workHour: null, lateIn: null, earlyOut: null, oT: null, attendanceStatus: "A" },
        { id: 62, img: "/images/profile.png", empNo: 281, name: "Karan Singh", inTime: "09:00:00", outTime: "17:00:00", workHour: "08:00:00", lateIn: "00:00:00", earlyOut: "00:00:00", oT: "00:00:00", attendanceStatus: "P" },
        { id: 63, img: "/images/profile.png", empNo: 282, name: "Pooja Verma", inTime: "13:00:00", outTime: "16:00:00", workHour: "03:00:00", lateIn: "03:00:00", earlyOut: "00:00:00", oT: "00:00:00", attendanceStatus: "Lt" },
        { id: 64, img: "/images/profile.png", empNo: 283, name: "Anil Joshi", inTime: "10:15:00", outTime: "18:15:00", workHour: "08:00:00", lateIn: "00:15:00", earlyOut: "00:00:00", oT: "00:00:00", attendanceStatus: "P" },
        { id: 65, img: "/images/profile.png", empNo: 284, name: "Tanvi Sharma", inTime: "09:05:00", outTime: "17:00:00", workHour: "07:55:00", lateIn: "00:05:00", earlyOut: "00:00:00", oT: "00:00:00", attendanceStatus: "P" }
    ];

    const filteredData = attendanceData.filter(item => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const matchesSearch = item.name.toLowerCase().includes(lowerCaseSearchTerm) ||
                              item.empNo.toString().includes(lowerCaseSearchTerm);
        const matchesStatus = attendanceStatusFilter ? item.attendanceStatus === attendanceStatusFilter : true;
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
                        <option value='P'>Present</option>
                        <option value='E'>Early</option>
                        <option value='Lt'>Late</option>
                        <option value='PX'>SinglePunch</option>
                        <option value='A'>Absent</option>
                    </select>
                </div>
</div>




            </div>
            <div className='attendanceList'>
                {filteredData.slice(startIndex, endIndex).map((item) => (
                    <div key={item.id} className='attendanceItem'>
                        <img src={item.img} alt={item.name} className='profileImg' />
                        <div className='employeeDetails'>
                            <p className='empNo'>Emp No: {item.empNo}</p>
                            <p className='empName'>{truncateText(item.name, MAX_NAME_LENGTH)}</p>
                            <p className='attendanceStatus'>Status: {item.attendanceStatus}</p>
                            <p className='inTime'>In Time: {item.inTime || 'N/A'}</p>
                            <p className='outTime'>Out Time: {item.outTime || 'N/A'}</p>
                        </div>
                    </div>
                ))}
            </div>
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
    );
};

export default TeamAttendance;
