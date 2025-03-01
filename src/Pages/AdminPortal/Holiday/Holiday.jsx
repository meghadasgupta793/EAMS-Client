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
import { useDeleteHolidayMutation, useGetAllHolidaysQuery } from '../../../Redux/api/admin/holidayApi';

const ITEMS_PER_PAGE = 6;

const Holiday = () => {
    const { data, error, isLoading } = useGetAllHolidaysQuery();
    const [deleteHoliday] = useDeleteHolidayMutation();

    const [searchActive, setSearchActive] = useState(false);
    const [searchQueries, setSearchQueries] = useState({
        festivalName: '',
        fromDate: '',
        toDate: '',
    });
    const [page, setPage] = useState(1); // Pagination state

    const handleSearchChange = (e, field) => {
        setSearchQueries(prevQueries => ({
            ...prevQueries,
            [field]: e.target.value
        }));
    };

    // Make sure data exists before calling filter
    const filteredData = (data?.data || []).filter(item =>
        item.Name.toLowerCase().includes(searchQueries.festivalName.toLowerCase()) &&
        item.StartDate.includes(searchQueries.fromDate) &&
        item.EndDate.includes(searchQueries.toDate)
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

    const goToUpdateHoliday = (id) => {
        navigate(`/updateHoliday/${id}`); // Navigate to update Holiday page with the holiday id
    };

    const handleDeleteHoliday = async (id) => {
        try {
            await deleteHoliday(id);
            alert('Holiday deleted successfully');
        } catch (err) {
            alert('Error deleting holiday');
        }
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

                {isLoading ? (
                    <p>Loading holidays...</p>
                ) : error ? (
                    <p>Error loading holidays.</p>
                ) : (
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
                                    <td>{item.Name}</td>
                                    <td>{new Date(item.StartDate).toLocaleDateString()}</td>
                                    <td>{new Date(item.EndDate).toLocaleDateString()}</td>
                                    {/* Only render Action column if search is not active */}
                                    {!searchActive && (
                                        <td>
                                            <BorderColorIcon
                                                className='action-btn update-btn'
                                                onClick={() => goToUpdateHoliday(item.ID)} // Pass the holiday ID to the update function
                                            />
                                            <DeleteForeverIcon
                                                className='action-btn delete-btn'
                                                onClick={() => handleDeleteHoliday(item.ID)} // Pass item ID to deleteHoliday
                                            />
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

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
