import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import './UpComingHoliday.css';

const ITEMS_PER_PAGE = 4;

const UpComingHoliday = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);

    const data = [
        { holidayName: 'Christmas', fromDate: '2024-12-25', toDate: '2024-12-25' },
        { holidayName: 'New Year', fromDate: '2024-01-01', toDate: '2024-01-01' },
        { holidayName: 'Diwali', fromDate: '2024-11-04', toDate: '2024-11-06' },
        { holidayName: 'Independence Day', fromDate: '2024-08-15', toDate: '2024-08-15' },
        { holidayName: 'Labor Day', fromDate: '2024-05-01', toDate: '2024-05-01' },
        // Add more holiday data if needed
    ];

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredData = data.filter(item =>
        item.holidayName.toLowerCase().includes(searchQuery.toLowerCase())
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

    return (
        <div className='upcomingHoliday-table-container'>
            <div className='upcomingHoliday-header-container'>
                <h1 className='upcomingHoliday-heading'>Upcoming Holidays</h1>
                
            </div>
            <table className='upcomingHoliday-table'>
                <thead>
                    <tr>
                        <th>Holiday Name</th>
                        <th>From Date</th>
                        <th>To Date</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.length === 0 ? (
                        <tr>
                            <td colSpan={3} style={{ textAlign: 'center' }}>
                                No upcoming holidays found
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

export default UpComingHoliday;
