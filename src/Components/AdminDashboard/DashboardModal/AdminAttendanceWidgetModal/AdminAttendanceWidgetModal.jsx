import React, { useState } from 'react';
import './AdminAttendanceWidgetModal.css';
import SearchIcon from '@mui/icons-material/Search';
import FileDownloadIcon from '@mui/icons-material/Download';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import Tooltip from '@mui/material/Tooltip';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const ITEMS_PER_PAGE = 3;

const AdminAttendanceWidgetModal = ({ open, onClose, data, title, columns }) => {
    const [searchActive, setSearchActive] = useState(false);
    const [searchQueries, setSearchQueries] = useState({});
    const [page, setPage] = useState(1);

    // Initialize search queries based on columns (excluding 'Photo')
    const initializeSearchQueries = () => {
        const queries = {};
        columns.forEach(column => {
            if (column !== 'Photo') {
                queries[column] = '';
            }
        });
        return queries;
    };

    const [searchQueriesState, setSearchQueriesState] = useState(initializeSearchQueries());

    const handleSearchChange = (e, column) => {
        setSearchQueriesState(prevQueries => ({
            ...prevQueries,
            [column]: e.target.value
        }));
    };

    const filteredData = data.filter(item =>
        columns.every(column => {
            if (column === 'Photo') return true; // Skip the 'Photo' column
            const columnValue = item[column]?.toString().toLowerCase() || '';
            const searchQuery = searchQueriesState[column]?.toLowerCase() || '';
            return columnValue.includes(searchQuery);
        })
    );

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

    const handleExport = () => {
        console.log("Exporting data...");
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="admin-attendance-widget-modal"
            aria-describedby="modal-to-view-attendance-list"
        >
            <Box className='admin-attendance-widget-modal-container'>
                <div className='admin-attendance-widget-container'>
                    <div className='admin-attendance-widget-header-container'>
                        <h1 className='admin-attendance-widget-heading'>{title}</h1>
                        <div className='admin-attendance-widget-icon-container'>
                            <Tooltip title="Search">
                                <IconButton onClick={() => setSearchActive(!searchActive)}>
                                    <SearchIcon className='admin-attendance-widget-header-icon' />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Export Employee Details in Excel">
                                <IconButton onClick={handleExport}>
                                    <FileDownloadIcon className='admin-attendance-widget-header-icon' />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Close">
                                <IconButton onClick={onClose}>
                                    <CloseIcon className='admin-attendance-widget-header-icon' />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>

                    <table className='admin-attendance-widget-table'>
                        <thead>
                            <tr>
                                {columns.map((column, index) => (
                                    <th key={index}>
                                        {searchActive && column !== 'Photo' ? (
                                            <input
                                                type="text"
                                                placeholder={`Search ${column}`}
                                                value={searchQueriesState[column]}
                                                onChange={(e) => handleSearchChange(e, column)}
                                            />
                                        ) : (
                                            column
                                        )}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.length > 0 ? (
                                paginatedData.map((item, index) => (
                                    <tr key={index}>
                                        {columns.map((column, colIndex) => (
                                            <td key={colIndex}>
                                                {column === 'Photo' ? (
                                                    <img src={item.photo || 'default-photo.jpg'} className='employee-photo' alt="Employee" />
                                                ) : (
                                                    item[column]
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={columns.length}>No data found.</td>
                                </tr>
                            )}
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
            </Box>
        </Modal>
    );
};

export default AdminAttendanceWidgetModal;