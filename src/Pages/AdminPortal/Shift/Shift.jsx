import React, { useState } from 'react';
import './Shift.css'; // Add your own Shift CSS styling
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

const ITEMS_PER_PAGE = 7;

const Shift = () => {
    const [searchActive, setSearchActive] = useState(false);
    const [searchQueries, setSearchQueries] = useState({
        shiftCode: '',
        shiftName: '',
        startTime: '',
        endTime: '',
    });
    const [page, setPage] = useState(1); // Pagination state

    const data = [
        { shiftCode: 'S1', shiftName: 'Morning Shift', startTime: '08:00', endTime: '16:00', lateAfter: '08:15', lateFrom: '08:00', earlyExitBefore: '15:45' },
        { shiftCode: 'S2', shiftName: 'Evening Shift', startTime: '16:00', endTime: '00:00', lateAfter: '16:15', lateFrom: '16:00', earlyExitBefore: '23:45' },
        { shiftCode: 'S3', shiftName: 'Night Shift', startTime: '00:00', endTime: '08:00', lateAfter: '00:15', lateFrom: '00:00', earlyExitBefore: '07:45' },
        // Add more shift data here
    ];

    const handleSearchChange = (e, field) => {
        setSearchQueries(prevQueries => ({
            ...prevQueries,
            [field]: e.target.value
        }));
    };

    const filteredData = data.filter(item =>
        item.shiftCode.toLowerCase().includes(searchQueries.shiftCode.toLowerCase()) &&
        item.shiftName.toLowerCase().includes(searchQueries.shiftName.toLowerCase()) &&
        item.startTime.includes(searchQueries.startTime) &&
        item.endTime.includes(searchQueries.endTime)
    );

    // Pagination logic
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    const handleNext = () => {
        setPage(prev => prev + 1);
    };

    const handlePrevious = () => {
        setPage(prev => prev - 1);
    };

    // Export to Excel logic
    const myTable = 'ShiftDetails';
    const handleExport = () => {
        exportToExcel(filteredData, myTable);
    };

    const navigate = useNavigate(); // Initialize useNavigate

    const goToCreateShift = () => {
        navigate('/newShift'); // Navigate to CreateEmployee page
    };

    const goToUpdateShift = () => {
        navigate('/updateShift'); // Navigate to CreateEmployee page
    };

    return (
        <div className='shift'>
            <Header />
            <div className='shift-tableContainer'>
                <div className='shift-header-container'>
                    <h1 className='shift-heading'>Shift List</h1>

                    <div className='shift-icon-container'>
                        <Tooltip title="Search">
                            <IconButton onClick={() => setSearchActive(!searchActive)}>
                                <SearchIcon className='shift-header-icon' />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Export Shift Details in Excel">
                            <IconButton onClick={handleExport}>
                                <FileDownloadIcon className='shift-header-icon' />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Download Excel Template">
                            <IconButton>
                                <CloudDownloadIcon className='shift-header-icon' />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Choose File">
                            <IconButton>
                                <CloudUploadIcon className='shift-header-icon' />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Create New Shift">
                            <IconButton onClick={goToCreateShift}>
                                <AddCircleOutlineIcon className='shift-header-icon' />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>

                <table className='shift-table'>
                    <thead>
                        <tr>
                            {searchActive ? (
                                <>
                                    <th>
                                        <input
                                            type="text"
                                            value={searchQueries.shiftCode}
                                            onChange={(e) => handleSearchChange(e, 'shiftCode')}
                                            placeholder="Search Shift Code"
                                        />
                                    </th>
                                    <th>
                                        <input
                                            type="text"
                                            value={searchQueries.shiftName}
                                            onChange={(e) => handleSearchChange(e, 'shiftName')}
                                            placeholder="Search Shift Name"
                                        />
                                    </th>
                                    <th>
                                        <input
                                            type="text"
                                            value={searchQueries.startTime}
                                            onChange={(e) => handleSearchChange(e, 'startTime')}
                                            placeholder="Search Start Time"
                                        />
                                    </th>
                                    <th>
                                        <input
                                            type="text"
                                            value={searchQueries.endTime}
                                            onChange={(e) => handleSearchChange(e, 'endTime')}
                                            placeholder="Search End Time"
                                        />
                                    </th>
                                </>
                            ) : (
                                <>
                                    <th>Shift Code</th>
                                    <th>Shift Name</th>
                                    <th>Start Time</th>
                                    <th>End Time</th>
                                    {!searchActive && <th>Late After</th>}
                                    {!searchActive && <th>Late Calculated From</th>}
                                    {!searchActive && <th>Early Exit Before</th>}
                                    {!searchActive && <th>Action</th>}
                                </>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.shiftCode}</td>
                                <td>{item.shiftName}</td>
                                <td>{item.startTime}</td>
                                <td>{item.endTime}</td>
                                {!searchActive && <td>{item.lateAfter}</td>}
                                {!searchActive && <td>{item.lateFrom}</td>}
                                {!searchActive && <td>{item.earlyExitBefore}</td>}
                                {!searchActive && (
                                    <td>
                                        <BorderColorIcon className='action-btn update-btn' onClick={goToUpdateShift} />
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

export default Shift;
