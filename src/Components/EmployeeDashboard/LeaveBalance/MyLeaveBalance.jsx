import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Tooltip from '@mui/material/Tooltip';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import './MyLeaveBalance.css';

const ITEMS_PER_PAGE = 4;

const MyLeaveBalance = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    const [searchQueries, setSearchQueries] = useState({
        leaveType: '',
    });

    const [page, setPage] = useState(1); // Pagination state

    const data = [
        { leaveType: 'CL', available: 5, consumed: 7 },
        { leaveType: 'PL', available: 10, consumed: 5 },
        { leaveType: 'SL', available: 3, consumed: 5 },
        { leaveType: 'AL', available: 10, consumed: 0 },
        { leaveType: 'EL', available: 2, consumed: 3 },
        // Add more leave data here if needed
    ];

    const handleSearchChange = (e) => {
        setSearchQueries({ leaveType: e.target.value });
    };

    const filteredData = data.filter(item =>
        item.leaveType.toLowerCase().includes(searchQueries.leaveType.toLowerCase())
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

    const handleApplyLeaveClick = () => {
        navigate('/MyLeave'); // Navigate to /MyLeave
    };

    return (
        <div className='myLvBalance-table-container'>
            <div className='myLvBalance-header-container'>
                <h1 className='myLvBalance-heading'>Leave Balance</h1>
                <div className='myLvBalance-icon-container'>
                    <Tooltip title="Apply Leave">
                        <IconButton onClick={handleApplyLeaveClick}>
                            <AddIcon className='applyLeave-icon' />
                        </IconButton>
                    </Tooltip>

                    
                </div>
            </div>
            <table className='myLv-table'>
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Consumed</th>
                        <th>Available</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.length === 0 ? (
                        <tr>
                            <td colSpan={3} style={{ textAlign: 'center' }}>
                                You don't have any Leave
                            </td>
                        </tr>
                    ) : (
                        paginatedData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.leaveType}</td>
                                <td>{item.consumed}</td>
                                <td>{item.available}</td>
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

export default MyLeaveBalance;
