import React, { useState } from 'react';
import './organizationDataTable.css';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import SearchIcon from '@mui/icons-material/Search';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { exportToExcel } from '../../Utils/excelUtils'; // Adjust the import path

import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ITEMS_PER_PAGE = 7;

const OrganizationDataTable = () => {
    const [searchActive, setSearchActive] = useState(false);
    const [searchQueries, setSearchQueries] = useState({
        ouCode: '',
        ouName: '',
        parentOu: '',
        ouType: '',
    });
    const [page, setPage] = useState(1); // Pagination state

    const data = [
        { ouCode: 'CHE-PIC', ouName: 'CHE-Prince Info City', parentOu: 'CHENNAI', ouType: 'Location' },
        { ouCode: 'CHE-DLF-IP', ouName: 'CHE-DLF IT Park', parentOu: 'CHENNAI', ouType: 'Location' },
        { ouCode: 'CHE-CP2-G', ouName: 'CHE-CP2-Guindy', parentOu: 'CHENNAI', ouType: 'Location' },
        { ouCode: 'CHE', ouName: 'CHENNAI', parentOu: 'Securitus', ouType: 'City' },
        { ouCode: 'CHE-PIC', ouName: 'CHE-Prince Info City', parentOu: 'CHENNAI', ouType: 'Location' },
        { ouCode: 'CHE-DLF-IP', ouName: 'CHE-DLF IT Park', parentOu: 'CHENNAI', ouType: 'Location' },
        { ouCode: 'CHE-CP2-G', ouName: 'CHE-CP2-Guindy', parentOu: 'CHENNAI', ouType: 'Location' },
        { ouCode: 'CHE', ouName: 'CHENNAI', parentOu: 'Securitus', ouType: 'City' },
        { ouCode: 'CHE-PIC', ouName: 'CHE-Prince Info City', parentOu: 'CHENNAI', ouType: 'Location' },
        { ouCode: 'CHE-DLF-IP', ouName: 'CHE-DLF IT Park', parentOu: 'CHENNAI', ouType: 'Location' },
        { ouCode: 'CHE-CP2-G', ouName: 'CHE-CP2-Guindy', parentOu: 'CHENNAI', ouType: 'Location' },
        { ouCode: 'CHE', ouName: 'CHENNAI', parentOu: 'Securitus', ouType: 'City' },
        { ouCode: 'CHE-PIC', ouName: 'CHE-Prince Info City', parentOu: 'CHENNAI', ouType: 'Location' },
        { ouCode: 'CHE-DLF-IP', ouName: 'CHE-DLF IT Park', parentOu: 'CHENNAI', ouType: 'Location' },
        { ouCode: 'CHE-CP2-G', ouName: 'CHE-CP2-Guindy', parentOu: 'CHENNAI', ouType: 'Location' },
        { ouCode: 'NIDHU', ouName: 'CHENNAI', parentOu: 'Securitus', ouType: 'City' },
        // ... add more data here
    ];

    const handleSearchChange = (e, field) => {
        setSearchQueries(prevQueries => ({
            ...prevQueries,
            [field]: e.target.value
        }));
    };

    const filteredData = data.filter(item =>
        item.ouCode.toLowerCase().includes(searchQueries.ouCode.toLowerCase()) &&
        item.ouName.toLowerCase().includes(searchQueries.ouName.toLowerCase()) &&
        item.parentOu.toLowerCase().includes(searchQueries.parentOu.toLowerCase()) &&
        item.ouType.toLowerCase().includes(searchQueries.ouType.toLowerCase())
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
    const myTable = 'OrganizationsDetals'
    const handleExport = () => {
        exportToExcel(filteredData, myTable);
    };


    const navigate = useNavigate(); // Initialize useNavigate

    const goToCreateOU = () => {
        navigate('/newOU'); // Navigate to CreateEmployee page
    };
    const goToUpdateOU = () => {
        navigate('/updateOU'); // Navigate to CreateEmployee page
    };

    const goToOuTypeandOuOwner = () => {
        navigate('/OuOwnerandOuOwner'); // Navigate to CreateEmployee page
    };






    return (
        <>
            <div className='table-container'>
                <div className='header-container'>
                    <h1 className='heading'>Organization List</h1>

                    <div className='icon-container'>
                        <Tooltip title="Search">
                            <IconButton onClick={() => setSearchActive(!searchActive)}>
                                <SearchIcon className='header-icon' />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Export OU Details in Excel">
                            <IconButton onClick={handleExport}> {/* Attach the export function here */}
                                <FileDownloadIcon className='header-icon' />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Download Excel Template">
                            <IconButton>
                                <CloudDownloadIcon className='header-icon' />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Choose File">
                            <IconButton>
                                <CloudUploadIcon className='header-icon' />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Create OU Type">
                            <IconButton>
                                <AddCircleOutlineIcon className='header-icon' />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="OU Type & OU Owner">
                            <IconButton>
                                <GroupAddIcon className='header-icon'
                                    onClick={goToOuTypeandOuOwner} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Create New OU">
                            <IconButton>
                                <AddBusinessIcon className='header-icon'
                                    onClick={goToCreateOU}
                                />
                            </IconButton>
                        </Tooltip>


                    </div>
                </div>

                <table className='ou-table'>
                    <thead>
                        <tr>
                            {searchActive ? (
                                <>
                                    <th>
                                        <input
                                            type="text"
                                            value={searchQueries.ouCode}
                                            onChange={(e) => handleSearchChange(e, 'ouCode')}
                                            placeholder="Search Ou Code"
                                        />
                                    </th>
                                    <th>
                                        <input
                                            type="text"
                                            value={searchQueries.ouName}
                                            onChange={(e) => handleSearchChange(e, 'ouName')}
                                            placeholder="Search Ou Name"
                                        />
                                    </th>
                                    <th>
                                        <input
                                            type="text"
                                            value={searchQueries.parentOu}
                                            onChange={(e) => handleSearchChange(e, 'parentOu')}
                                            placeholder="Search Parent Ou"
                                        />
                                    </th>
                                    <th>
                                        <input
                                            type="text"
                                            value={searchQueries.ouType}
                                            onChange={(e) => handleSearchChange(e, 'ouType')}
                                            placeholder="Search Ou Type"
                                        />
                                    </th>
                                    <th>Action</th>
                                </>
                            ) : (
                                <>
                                    <th>Ou Code</th>
                                    <th>Ou Name</th>
                                    <th>Parent Ou</th>
                                    <th>Ou Type</th>
                                    <th>Action</th>
                                </>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.ouCode}</td>
                                <td>{item.ouName}</td>
                                <td>{item.parentOu}</td>
                                <td>{item.ouType}</td>
                                <td>
                                    <BorderColorIcon className='action-btn update-btn'
                                        onClick={goToUpdateOU} />
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
        </>
    );
};

export default OrganizationDataTable;
