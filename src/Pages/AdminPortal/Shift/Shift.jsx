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
import { useGetAllShiftsQuery, useDeleteShiftMutation } from '../../../Redux/api/admin/shiftApi';

const ITEMS_PER_PAGE = 7;

const Shift = () => {
    const { data, error, isLoading } = useGetAllShiftsQuery();
    const [deleteShift, { isLoading: isDeleting }] = useDeleteShiftMutation();
    const [searchActive, setSearchActive] = useState(false);
    const [searchQueries, setSearchQueries] = useState({
        shiftCode: '',
        shiftName: '',
        startTime: '',
        endTime: '',
    });
    const [page, setPage] = useState(1); // Pagination state

    const handleSearchChange = (e, field) => {
        setSearchQueries(prevQueries => ({
            ...prevQueries,
            [field]: e.target.value
        }));
    };

    // Check if 'data' is valid and is an array
    const shiftData = Array.isArray(data?.data) ? data.data : [];

    const filteredData = shiftData.filter(item =>
        item.Code.toLowerCase().includes(searchQueries.shiftCode.toLowerCase()) &&
        item.Name.toLowerCase().includes(searchQueries.shiftName.toLowerCase()) &&
        item.StartTime.includes(searchQueries.startTime) &&
        item.EndTime.includes(searchQueries.endTime)
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

    const goToUpdateShift = (shiftCode) => {
        navigate(`/updateShift/${shiftCode}`); // Navigate to UpdateEmployee page
    };

 



    const handleDeleteShift = async (Code) => {
        try {
            const response = await deleteShift(Code).unwrap(); // Ensure proper handling
            alert(response.message); // Show success message
        } catch (err) {
            // Check if the error contains a response message from the API
            if (err?.data?.error) {
                alert(err.data.error); // Display specific API error message
            } else {
                alert("Error deleting shift"); // Generic fallback message
            }
        }
    };
    







    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading shifts</div>;
    }

    // Formatting time to UTC
    const timeOptions = { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' };

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
                                <td>{item.Code}</td>
                                <td>{item.Name}</td>
                                <td>{new Date(item.StartTime).toLocaleTimeString('en-US', timeOptions)}</td>
                                <td>{new Date(item.EndTime).toLocaleTimeString('en-US', timeOptions)}</td>

                                {/* Check if 'LateAfter' is null or not */}
                                {!searchActive && <td>{item.LateAfter ? new Date(item.LateAfter).toLocaleTimeString('en-US', timeOptions) : ''}</td>}

                                {/* Check if 'LateCalculatedFrom' is null or not */}
                                {!searchActive && <td>{item.LateCalculatedFrom ? new Date(item.LateCalculatedFrom).toLocaleTimeString('en-US', timeOptions) : ''}</td>}

                                {/* Check if 'EarlyExitBefore' is null or not */}
                                {!searchActive && <td>{item.EarlyExitBefore ? new Date(item.EarlyExitBefore).toLocaleTimeString('en-US', timeOptions) : ''}</td>}

                                {/* Actions column */}
                                {!searchActive && (
                                    <td>
                                        <BorderColorIcon className='action-btn update-btn' onClick={() => goToUpdateShift(item.Code)} />
                                        <DeleteForeverIcon
                                            className='action-btn delete-btn'
                                            onClick={() => handleDeleteShift(item.Code)}
                                        />
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
