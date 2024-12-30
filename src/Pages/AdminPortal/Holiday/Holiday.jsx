import React, { useState } from 'react';
import './holiday.css'; // Add your own Holiday CSS styling
import Header from '../../../Components/Header/Header';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { exportToExcel } from '../../../Components/Utils/excelUtils'; // Adjust the import path
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ITEMS_PER_PAGE = 6;

const Holiday = () => {
    const [searchActive, setSearchActive] = useState(false);
    const [searchQueries, setSearchQueries] = useState({
        festivalName: '',
        fromDate: '',
        toDate: '',
    });
    const [page, setPage] = useState(1); // Pagination state

    const data = [
        { festivalName: 'New Year', fromDate: '01-01-2024', toDate: '01-01-2024' },
        { festivalName: 'Holi', fromDate: '03-29-2024', toDate: '03-29-2024' },
        { festivalName: 'Diwali', fromDate: '11-12-2024', toDate: '11-12-2024' },
        { festivalName: 'Christmas', fromDate: '12-25-2024', toDate: '12-25-2024' },
        { festivalName: 'Independence Day', fromDate: '08-15-2024', toDate: '08-15-2024' },
        { festivalName: 'Republic Day', fromDate: '01-26-2024', toDate: '01-26-2024' },
        { festivalName: 'Durga Puja', fromDate: '09-09-2024', toDate: '09-09-2024' },
        // Add more holiday data here
    ];

    const handleSearchChange = (e, field) => {
        setSearchQueries(prevQueries => ({
            ...prevQueries,
            [field]: e.target.value
        }));
    };

    const filteredData = data.filter(item =>
        item.festivalName.toLowerCase().includes(searchQueries.festivalName.toLowerCase()) &&
        item.fromDate.includes(searchQueries.fromDate) &&
        item.toDate.includes(searchQueries.toDate)
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
    const myTable = 'HolidayDetails';
    const handleExport = () => {
        exportToExcel(filteredData, myTable);
    };

    const navigate = useNavigate(); // Initialize useNavigate

    const goToCreateHoliday = () => {
        navigate('/newHoliday'); // Navigate to create new Holiday page
    };

    const goToUpdateHoliday = () => {
        navigate('/updateHoliday'); // Navigate to update Holiday page
    };

    return (
        <div className='holiday'>
            <Header />
            <div className='holiday-tableConatiner'>
                <div className='holiday-header-container'>
                    <h1 className='holiday-heading'>Holiday List</h1>
                    <div className='holiday-icon-container'>
                        <Tooltip title="Search">
                            <IconButton onClick={() => setSearchActive(!searchActive)}>
                                <SearchIcon className='holiday-header-icon' />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Export Holiday Details in Excel">
                            <IconButton onClick={handleExport}>
                                <FileDownloadIcon className='holiday-header-icon' />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Download Excel Template">
                            <IconButton>
                                <CloudDownloadIcon className='holiday-header-icon' />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Choose File">
                            <IconButton>
                                <CloudUploadIcon className='holiday-header-icon' />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Create New Holiday">
                            <IconButton onClick={goToCreateHoliday}>
                                <AddCircleOutlineIcon className='holiday-header-icon' />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>

                <table className='holiday-table'>
                    <thead>
                        <tr>
                            {searchActive ? (
                                <>
                                    <th>
                                        <input
                                            type="text"
                                            value={searchQueries.festivalName}
                                            onChange={(e) => handleSearchChange(e, 'festivalName')}
                                            placeholder="Search Festival Name"
                                        />
                                    </th>
                                    <th>
                                        <input
                                            type="text"
                                            value={searchQueries.fromDate}
                                            onChange={(e) => handleSearchChange(e, 'fromDate')}
                                            placeholder="Search From Date"
                                        />
                                    </th>
                                    <th>
                                        <input
                                            type="text"
                                            value={searchQueries.toDate}
                                            onChange={(e) => handleSearchChange(e, 'toDate')}
                                            placeholder="Search To Date"
                                        />
                                    </th>
                                </>
                            ) : (
                                <>
                                    <th>Name of the Festival</th>
                                    <th>From Date</th>
                                    <th>To Date</th>
                                </>
                            )}
                            {/* Only show Action column if search is not active */}
                            {!searchActive && <th>Action</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.festivalName}</td>
                                <td>{item.fromDate}</td>
                                <td>{item.toDate}</td>
                                {/* Only render Action column if search is not active */}
                                {!searchActive && (
                                    <td>
                                        <BorderColorIcon className='action-btn update-btn' onClick={goToUpdateHoliday} />
                                        <DeleteForeverIcon className='action-btn delete-btn' />
                                    </td>
                                )}
                            </tr>
                        ))}
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
        </div>
    );
};

export default Holiday;
