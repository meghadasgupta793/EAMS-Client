import React, { useState } from 'react';
import './inActiveEmployee.css';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import SearchIcon from '@mui/icons-material/Search';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { exportToExcel } from '../../../Components/Utils/excelUtils'; // Adjust the import path
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Header from '../../../Components/Header/Header';

const ITEMS_PER_PAGE = 7;

const InActiveEmployee = () => {
    const [searchActive, setSearchActive] = useState(false);
    const [searchQueries, setSearchQueries] = useState({
        empNo: '',
        empName: '',
        inActiveType: '',
        remark: '',
        retiredOn: ''
    });
    const [page, setPage] = useState(1);

    const data = [
        {
            empPhoto: '/images/profile.png',
            empNo: 'E001',
            ticketNo: 'T001',
            empName: 'John Doe',
            inActiveType: 'Retired',
            remark: 'Long Service',
            retiredOn: '2023-06-30',
        },
        {
            empPhoto: '/images/profile.png',
            empNo: 'E002',
            ticketNo: 'T002',
            empName: 'Jane Smith',
            inActiveType: 'Resigned',
            remark: 'Personal Reasons',
            retiredOn: '2023-05-20',
        },
        // Add more inactive employee data
    ];

    const handleSearchChange = (e, field) => {
        setSearchQueries(prevQueries => ({
            ...prevQueries,
            [field]: e.target.value,
        }));
    };

    const filteredData = data.filter(item =>
        item.empNo.toLowerCase().includes(searchQueries.empNo.toLowerCase()) &&
        item.empName.toLowerCase().includes(searchQueries.empName.toLowerCase()) &&
        item.inActiveType.toLowerCase().includes(searchQueries.inActiveType.toLowerCase()) &&
        item.remark.toLowerCase().includes(searchQueries.remark.toLowerCase()) &&
        item.retiredOn.toLowerCase().includes(searchQueries.retiredOn.toLowerCase())
    );

    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    const handleNext = () => setPage(prev => prev + 1);
    const handlePrevious = () => setPage(prev => prev - 1);

    const handleExport = () => {
        exportToExcel(filteredData, 'InActiveEmployeeDetails');
    };



    const navigate = useNavigate(); // Initialize useNavigate

    const goToCreateEmployee = () => {
        navigate('/newinActiveEmployee'); // Navigate to CreateEmployee page
    };



    return (
        <div className='inActiveEmployee'>
            <Header />
            <div className='inActiveEmployee-table-container'>
                <div className='inActiveEmployee-header-container'>
                    <h1 className='inActiveEmployee-heading'>Inactive Employee List</h1>

                    <div className='inActiveEmployee-icon-container'>
                        <Tooltip title="Search">
                            <IconButton onClick={() => setSearchActive(!searchActive)}>
                                <SearchIcon className='inActiveEmployee-header-icon' />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Export Inactive Employees">
                            <IconButton onClick={handleExport}>
                                <FileDownloadIcon className='inActiveEmployee-header-icon' />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Download Excel Template">
                            <IconButton>
                                <CloudDownloadIcon className='inActiveEmployee-header-icon' />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Upload Inactive Employees File">
                            <IconButton>
                                <CloudUploadIcon className='inActiveEmployee-header-icon' />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Create New InActiveEmployee">
                        <IconButton onClick={goToCreateEmployee}>
                                <GroupAddIcon className='inActiveEmployee-header-icon' />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>

                <table className='inActiveEmployee-table'>
                    <thead>
                        <tr>
                            {searchActive ? (
                                <>
                                    <th>
                                        <input
                                            type="text"
                                            value={searchQueries.empNo}
                                            onChange={(e) => handleSearchChange(e, 'empNo')}
                                            placeholder="Search Emp No"
                                        />
                                    </th>
                                    <th>
                                        <input
                                            type="text"
                                            value={searchQueries.empName}
                                            onChange={(e) => handleSearchChange(e, 'empName')}
                                            placeholder="Search Emp Name"
                                        />
                                    </th>
                                    <th>
                                        <input
                                            type="text"
                                            value={searchQueries.inActiveType}
                                            onChange={(e) => handleSearchChange(e, 'inActiveType')}
                                            placeholder="Search Inactive Type"
                                        />
                                    </th>
                                    <th>
                                        <input
                                            type="text"
                                            value={searchQueries.remark}
                                            onChange={(e) => handleSearchChange(e, 'remark')}
                                            placeholder="Search Remark"
                                        />
                                    </th>
                                    <th>
                                        <input
                                            type="text"
                                            value={searchQueries.retiredOn}
                                            onChange={(e) => handleSearchChange(e, 'retiredOn')}
                                            placeholder="Search Retired On"
                                        />
                                    </th>
                                    <th>Action</th>
                                </>
                            ) : (
                                <>
                                    <th>Photo</th>
                                    <th>Emp No</th>
                                    <th>Emp Name</th>
                                    <th>Inactive Type</th>
                                    <th>Remark</th>
                                    <th>Retired On</th>
                                    <th>Action</th>
                                </>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((item, index) => (
                            <tr key={index}>
                                {searchActive ? (
                                    <>
                                        <td>{item.empNo}</td>
                                        <td>{item.empName}</td>
                                        <td>{item.inActiveType}</td>
                                        <td>{item.remark}</td>
                                        <td>{item.retiredOn}</td>
                                    </>
                                ) : (
                                    <>
                                        <td><img src={item.empPhoto} className='employee-photo' alt="Employee" /></td>
                                        <td>{item.empNo}</td>
                                        <td>{item.empName}</td>
                                        <td>{item.inActiveType}</td>
                                        <td>{item.remark}</td>
                                        <td>{item.retiredOn}</td>
                                    </>
                                )}
                                <td>
                                    <BorderColorIcon className='action-btn update-btn' />
                                    <DeleteForeverIcon className='action-btn delete-btn' />
                                </td>
                            </tr>
                        ))}
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
        </div>
    );
};

export default InActiveEmployee;
