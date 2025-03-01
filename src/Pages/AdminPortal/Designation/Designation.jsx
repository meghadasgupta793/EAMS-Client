import React, { useState } from 'react';
import './designation.css';
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
import { useNavigate } from 'react-router-dom';
import { useGetAllDesignationQuery,useDeleteDesignationMutation } from '../../../Redux/api/admin/designationApi';

const ITEMS_PER_PAGE = 7;

const Designation = () => {
    const [searchActive, setSearchActive] = useState(false);
    const [searchQueries, setSearchQueries] = useState({
        designationCode: '',
        designationName: '',
    });
    const [page, setPage] = useState(1);

    const { data: designationData, isLoading, isError } = useGetAllDesignationQuery();
    const [deleteDesignation] = useDeleteDesignationMutation(); // Hook for delete mutation

    const handleSearchChange = (e, field) => {
        setSearchQueries(prevQueries => ({
            ...prevQueries,
            [field]: e.target.value
        }));
    };

    const filteredData = designationData?.data?.filter(item =>
        (item.Code?.toLowerCase() || '').includes(searchQueries.designationCode.toLowerCase()) &&
        (item.Name?.toLowerCase() || '').includes(searchQueries.designationName.toLowerCase())
    ) || [];

    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    const handleNext = () => {
        setPage(prev => prev + 1);
    };

    const handlePrevious = () => {
        setPage(prev => prev - 1);
    };

    const handleExport = () => {
        exportToExcel(filteredData, 'DesignationDetails');
    };

    const navigate = useNavigate();

    const goToCreateDesignation = () => {
        navigate('/newDesignation'); // Navigate to CreateDesignation page
    };

    const goToUpdateDesignation = (id) => {
        navigate(`/updateDesignation/${id}`); // Navigate to UpdateDesignation page
    };
       // Handle delete designation
       const handleDeleteDesignation = async (id) => {
        try {
            await deleteDesignation(id).unwrap(); // Perform the delete operation
            alert('Designation deleted successfully!');
        } catch (err) {
            console.error('Failed to delete designation:', err);
            alert('Error deleting designation');
        }
    };

    if (isLoading) return <p>Loading designations...</p>;
    if (isError) return <p>Error loading designations.</p>;

    return (
        <div className='designation'>
            <Header />
            <div className='designation-table-container'>
                <div className='designation-header-container'>
                    <h1 className='designation-heading'>Designation List</h1>
                    <div className='designation-icon-container'>
                        <Tooltip title="Search">
                            <IconButton onClick={() => setSearchActive(!searchActive)}>
                                <SearchIcon className='designation-header-icon' />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Export Designation Details in Excel">
                            <IconButton onClick={handleExport}>
                                <FileDownloadIcon className='designation-header-icon' />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Download Excel Template">
                            <IconButton>
                                <CloudDownloadIcon className='designation-header-icon' />
                            </IconButton>
                        </Tooltip> 

                        <Tooltip title="Choose File">
                            <IconButton>
                                <CloudUploadIcon className='designation-header-icon' />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Create New Designation">
                            <IconButton onClick={goToCreateDesignation}>
                                <AddCircleOutlineIcon className='designation-header-icon' />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>

                <table className='designation-table'>
                    <thead>
                        <tr>
                            {searchActive ? (
                                <>
                                    <th>
                                        <input
                                            type="text"
                                            value={searchQueries.designationCode}
                                            onChange={(e) => handleSearchChange(e, 'designationCode')}
                                            placeholder="Search Designation Code"
                                        />
                                    </th>
                                    <th>
                                        <input
                                            type="text"
                                            value={searchQueries.designationName}
                                            onChange={(e) => handleSearchChange(e, 'designationName')}
                                            placeholder="Search Designation Name"
                                        />
                                    </th>
                                    <th>Action</th>
                                </>
                            ) : (
                                <>
                                    <th>Designation Code</th>
                                    <th>Designation Name</th>
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
                                        onClick={() => goToUpdateDesignation(item.ID)} 
                                    />
                                    <DeleteForeverIcon 
                                        className='action-btn delete-btn' 
                                        onClick={() => handleDeleteDesignation(item.ID)} // Handle delete
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

export default Designation;
