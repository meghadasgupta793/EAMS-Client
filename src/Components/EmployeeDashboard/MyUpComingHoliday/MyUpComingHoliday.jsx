import React, { useState } from 'react';
import './MyUpComingHoliday.css'; // Add your own MyUpComingHoliday CSS styling
import SearchIcon from '@mui/icons-material/Search';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { exportToExcel } from '../../../Components/Utils/excelUtils'; // Adjust the import path

const ITEMS_PER_PAGE = 4;

const MyUpcomingHoliday = () => {
    const [searchActive, setSearchActive] = useState(false);
    const [searchQueries, setSearchQueries] = useState({
        holidayName: '',
    });
    const [page, setPage] = useState(1); // Pagination state

    const data = [
        { holidayName: 'Christmas', fromDate: '2024-12-25', toDate: '2024-12-25' },
        { holidayName: 'New Year', fromDate: '2024-01-01', toDate: '2024-01-01' },
        { holidayName: 'Diwali', fromDate: '2024-11-04', toDate: '2024-11-06' },
        { holidayName: 'Independence Day', fromDate: '2024-08-15', toDate: '2024-08-15' },
        { holidayName: 'Labor Day', fromDate: '2024-05-01', toDate: '2024-05-01' },
        // Add more holiday data if needed
    ];

    const handleSearchChange = (e) => {
        setSearchQueries({ holidayName: e.target.value });
    };

    const filteredData = data.filter(item =>
        item.holidayName.toLowerCase().includes(searchQueries.holidayName.toLowerCase())
    );

    // Pagination logic
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedData = filteredData.slice(startIndex, endIndex);

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

    // Export to Excel logic
    const myTable = 'UpcomingHolidays';
    const handleExport = () => {
        exportToExcel(filteredData, myTable);
    };

    return (
        <div className='upcomingHolidays'>
            <div className='upcoming-holidays-header-container'>
                <h1 className='upcoming-holidays-heading'>My Upcoming Holidays</h1>
                <div className='upcoming-holidays-icon-container'>
                    <Tooltip title="Search">
                        <IconButton onClick={() => setSearchActive(!searchActive)}>
                            <SearchIcon className='upcoming-holidays-header-icon' />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Export Holiday List in Excel">
                        <IconButton onClick={handleExport}>
                            <FileDownloadIcon className='upcoming-holidays-header-icon' />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>

            <table className='upcoming-holidays-table'>
                <thead>
                    <tr>
                        {searchActive ? (
                            <th>
                                <input
                                    type="text"
                                    value={searchQueries.holidayName}
                                    onChange={handleSearchChange}
                                    placeholder="Search Holiday Name"
                                />
                            </th>
                        ) : (
                            <>
                                <th>Holiday Name</th>
                                <th>From Date</th>
                                <th>To Date</th>
                            </>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {filteredData.length === 0 ? (
                        <tr>
                            <td colSpan={searchActive ? 1 : 3} style={{ textAlign: 'center' }}>
                                You don't have any Upcoming Holidays
                            </td>
                        </tr>
                    ) : (
                        paginatedData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.holidayName}</td>
                                <td>{item.fromDate}</td>
                                <td>{item.toDate}</td>
                            </tr>
                        ))
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
                {endIndex < filteredData.length && (
                    <IconButton onClick={handleNext}>
                        <KeyboardDoubleArrowRightIcon className='pagination-btn' />
                    </IconButton>
                )}
            </div>
        </div>
    );
};

export default MyUpcomingHoliday;
