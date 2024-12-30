import React, { useState, useContext } from 'react';
import './department.css';
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

const Department = () => {
    const [searchActive, setSearchActive] = useState(false);
    const [searchQueries, setSearchQueries] = useState({
        departmentCode: '',
        departmentName: '',
    });
    const [page, setPage] = useState(1); // Pagination state

    const data = [
        { departmentCode: 'D1', departmentName: 'Human Resources' },
        { departmentCode: 'D2', departmentName: 'Finance' },
        { departmentCode: 'D3', departmentName: 'IT' },
        // Add more department data here
    ];

    const handleSearchChange = (e, field) => {
        setSearchQueries(prevQueries => ({
            ...prevQueries,
            [field]: e.target.value
        }));
    };

    const filteredData = data.filter(item =>
        item.departmentCode.toLowerCase().includes(searchQueries.departmentCode.toLowerCase()) &&
        item.departmentName.toLowerCase().includes(searchQueries.departmentName.toLowerCase())
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
        exportToExcel(filteredData, 'DepartmentDetails');
    };

    const navigate = useNavigate(); // Initialize useNavigate

    const goToCreateDepartment = () => {
        navigate('/newDepartment'); // Navigate to CreateDepartment page
    };

    const goToUpdateDepartment = () => {
        navigate('/updateDepartment'); // Navigate to CreateDepartment page
    };



    return (
        <div className='department'>
            <Header />
            <div className='department-table-container'>
                <div className='department-header-container'>
                    <h1 className='department-heading'>Department List</h1>
                    <div className='department-icon-container'>
                        <Tooltip title="Search">
                            <IconButton onClick={() => setSearchActive(!searchActive)}>
                                <SearchIcon className='department-header-icon' />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Export Department Details in Excel">
                            <IconButton onClick={handleExport}>
                                <FileDownloadIcon className='department-header-icon' />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Download Excel Template">
                            <IconButton>
                                <CloudDownloadIcon className='department-header-icon' />
                            </IconButton>
                        </Tooltip> 

                        <Tooltip title="Choose File">
                            <IconButton>
                                <CloudUploadIcon className='department-header-icon' />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Create New Department">
                            <IconButton onClick={goToCreateDepartment}>
                                <AddCircleOutlineIcon className='department-header-icon' />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>

                <table className='department-table'>
                    <thead>
                        <tr>
                            {searchActive ? (
                                <>
                                    <th>
                                        <input
                                            type="text"
                                            value={searchQueries.departmentCode}
                                            onChange={(e) => handleSearchChange(e, 'departmentCode')}
                                            placeholder="Search Department Code"
                                        />
                                    </th>
                                    <th>
                                        <input
                                            type="text"
                                            value={searchQueries.departmentName}
                                            onChange={(e) => handleSearchChange(e, 'departmentName')}
                                            placeholder="Search Department Name"
                                        />
                                    </th>
                                    <th>Action</th>
                                </>
                            ) : (
                                <>
                                    <th>Department Code</th>
                                    <th>Department Name</th>
                                    <th>Action</th>
                                </>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.departmentCode}</td>
                                <td>{item.departmentName}</td>
                                <td>
                                    <BorderColorIcon className='action-btn update-btn'  
                                    onClick={goToUpdateDepartment}/>
                                    <DeleteForeverIcon className='action-btn delete-btn' />
                                </td>
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

export default Department;
