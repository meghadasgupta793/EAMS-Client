import React, { useState } from 'react';
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
import { useGetAllDepartmentQuery, useDeleteDepartmentMutation } from '../../../Redux/api/admin/departmentApi';

const ITEMS_PER_PAGE = 7;

const Department = () => {
    const { data, error, isLoading } = useGetAllDepartmentQuery();
    const [deleteDepartment] = useDeleteDepartmentMutation();

    const [selectedDepartment, setSelectedDepartment] = useState(null);

    const [searchActive, setSearchActive] = useState(false);
    const [searchQueries, setSearchQueries] = useState({
        departmentCode: '',
        departmentName: '',
    });
    const [page, setPage] = useState(1); // Pagination state

    // Ensure data is defined and has items before proceeding
    const departments = data?.data || [];

    // Filter departments based on search query
    const filteredData = departments.filter(item =>
        item?.Code?.toLowerCase().includes(searchQueries.departmentCode.toLowerCase()) &&
        item?.Name?.toLowerCase().includes(searchQueries.departmentName.toLowerCase())
    );

    // Pagination logic
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    const handleNext = () => setPage(prev => prev + 1);
    const handlePrevious = () => setPage(prev => prev - 1);

    // Export to Excel logic
    const handleExport = () => exportToExcel(filteredData, 'DepartmentDetails');

    const navigate = useNavigate();

    const goToCreateDepartment = () => {
        navigate('/newDepartment');
    };

    const goToUpdateDepartment = (departmentId) => {
        navigate(`/updateDepartment/${departmentId}`); // Pass departmentId to update page
    };

    // Handle search input change
    const handleSearchChange = (e, field) => {
        setSearchQueries(prevQueries => ({
            ...prevQueries,
            [field]: e.target.value
        }));
    };

    // Handle delete department
    const handleDelete = async (departmentId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this department?");
        if (!confirmDelete) return; // Stop if the user cancels
    
        try {
            await deleteDepartment(departmentId).unwrap(); // Use unwrap() to properly handle errors
            alert('Department deleted successfully');
        } catch (err) {
            console.error('Failed to delete department:', err);
            alert('Failed to delete department. Please try again.');
        }
    };

    // Handle update click
    const handleUpdateClick = (departmentId) => {
        const departmentToUpdate = departments.find(department => department.ID === departmentId);
        setSelectedDepartment(departmentToUpdate);
        goToUpdateDepartment(departmentId); // Navigate to update page with the department ID
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

                {/* Loading, error handling */}
                {isLoading && <p>Loading departments...</p>}
                {error && <p>Error loading departments: {error.message}</p>}

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
                        {paginatedData.map((item) => (
                            <tr key={item.ID}>
                                <td>{item.Code}</td>
                                <td>{item.Name}</td>
                                <td>
                                    <BorderColorIcon
                                        className='action-btn update-btn'
                                        onClick={() => handleUpdateClick(item.ID)} // Trigger update
                                    />
                                    <DeleteForeverIcon
                                        className='action-btn delete-btn'
                                        onClick={() => handleDelete(item.ID)}
                                    />
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
