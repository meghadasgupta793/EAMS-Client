import React, { useState } from 'react';
import './Batch.css';
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
import { useDeleteBatchMutation, useGetAllBatchQuery } from '../../../Redux/api/admin/bacthApi';

const ITEMS_PER_PAGE = 7;

const Batch = () => {
    const { data, error, isLoading } = useGetAllBatchQuery();
    const [deleteBatch] = useDeleteBatchMutation();

    const [searchActive, setSearchActive] = useState(false);
    const [searchQueries, setSearchQueries] = useState({
        batchCode: '',
        batchName: '',
    });
    const [page, setPage] = useState(1); // Pagination state

    const batches = data?.data || [];

    const handleSearchChange = (e, field) => {
        setSearchQueries(prevQueries => ({
            ...prevQueries,
            [field]: e.target.value
        }));
    };

    const filteredData = batches.filter(item =>
        (item.Code && item.Code.toLowerCase().includes(searchQueries.batchCode.toLowerCase())) &&
        (item.Name && item.Name.toLowerCase().includes(searchQueries.batchName.toLowerCase()))
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
    const handleExport = () => {
        exportToExcel(filteredData, 'BatchDetails');
    };

    const navigate = useNavigate(); // Initialize useNavigate

    const goToCreateBatch = () => {
        navigate('/newBatch'); // Navigate to CreateBatch page
    };

    const goToUpdateBatch = (batchId) => {
        navigate(`/updateBatch/${batchId}`); // Navigate to UpdateBatch page with batch ID
    };

    const handleDeleteBatch = (batchId) => {
        deleteBatch(batchId); // Perform delete operation
    };

    return (
        <div className='batch'>
            <Header />
            <div className='batch-table-container'>
                <div className='batch-header-container'>
                    <h1 className='batch-heading'>Batch List</h1>
                    <div className='batch-icon-container'>
                        <Tooltip title="Search">
                            <IconButton onClick={() => setSearchActive(!searchActive)}>
                                <SearchIcon className='batch-header-icon' />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Export Batch Details in Excel">
                            <IconButton onClick={handleExport}>
                                <FileDownloadIcon className='batch-header-icon' />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Download Excel Template">
                            <IconButton>
                                <CloudDownloadIcon className='batch-header-icon' />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Choose File">
                            <IconButton>
                                <CloudUploadIcon className='batch-header-icon' />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Create New Batch">
                            <IconButton onClick={goToCreateBatch}>
                                <AddCircleOutlineIcon className='batch-header-icon' />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>

                <table className='batch-table'>
                    <thead>
                        <tr>
                            {searchActive ? (
                                <>
                                    <th>
                                        <input
                                            type="text"
                                            value={searchQueries.batchCode}
                                            onChange={(e) => handleSearchChange(e, 'batchCode')}
                                            placeholder="Search Batch Code"
                                        />
                                    </th>
                                    <th>
                                        <input
                                            type="text"
                                            value={searchQueries.batchName}
                                            onChange={(e) => handleSearchChange(e, 'batchName')}
                                            placeholder="Search Batch Name"
                                        />
                                    </th>
                                    <th>Action</th>
                                </>
                            ) : (
                                <>
                                    <th>Batch Code</th>
                                    <th>Batch Name</th>
                                    <th>Action</th>
                                </>
                            )}
                        </tr>
                    </thead>
                    <tbody>
    {paginatedData.length > 0 ? (
        paginatedData.map((item, index) => (
            <tr key={index}>
                <td>{item.Code}</td> {/* Displaying the correct field */}
                <td>{item.Name}</td> {/* Displaying the correct field */}
                <td>
                    <BorderColorIcon
                        className='action-btn update-btn'
                        onClick={() => goToUpdateBatch(item.ID)} // Pass batch ID
                    />
                    <DeleteForeverIcon
                        className='action-btn delete-btn'
                        onClick={() => handleDeleteBatch(item.ID)} // Pass batch ID for deletion
                    />
                </td>
            </tr>
        ))
    ) : (
        <tr>
            <td colSpan="3">No data available</td>
        </tr>
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
        </div>
    );
};

export default Batch;
