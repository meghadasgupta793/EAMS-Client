import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetAllEmployeesQuery } from '../../../Redux/api/admin/employeeApi';
import { exportToExcel } from '../../Utils/excelUtils';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import {
    DeleteForever as DeleteForeverIcon,
    BorderColor as BorderColorIcon,
    AddCircleOutline as AddCircleOutlineIcon,
    GroupAdd as GroupAddIcon,
    Search as SearchIcon,
    FileDownload as FileDownloadIcon,
    CloudUpload as CloudUploadIcon,
    CloudDownload as CloudDownloadIcon,
    KeyboardDoubleArrowLeft as KeyboardDoubleArrowLeftIcon,
    KeyboardDoubleArrowRight as KeyboardDoubleArrowRightIcon,
    AccountTree as AccountTreeIcon,
} from '@mui/icons-material';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';

import './EmployeeDataTable.css';
import config from '../../../secrect';


const ITEMS_PER_PAGE = 7;

const EmployeeDataTable = () => {
    const { ImgUrl } = config;
    const { data, error, isLoading } = useGetAllEmployeesQuery();
    const employeeList = data?.data || [];
    const [searchActive, setSearchActive] = useState(false);
    const [searchQueries, setSearchQueries] = useState(
        {
            empNo: '',
            empName: '',
            email: '',
            department: '',
            designation: '',
            organization: '',
        }
    );
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    // Add console log to verify data
    console.log(employeeList);

    const handleSearchChange = (e, field) => {
        setSearchQueries((prev) => ({
            ...prev,
            [field]: e.target.value,
        }));
    };

    // Filter data based on search queries
    const filteredData = employeeList.filter((item) =>
        Object.keys(searchQueries).every((key) => {
            // Map the key from searchQueries to the correct API property name
            const apiField = {
                empNo: 'EmpNo',
                empName: 'EmployeeName',
                email: 'Email',
                department: 'DepartmentName',
                designation: 'DesignationName',
                organization: 'OUName',
            };

            // Use the correct field from the API
            const fieldValue = item[apiField[key]];

            return fieldValue?.toLowerCase().includes(searchQueries[key].toLowerCase());
        })
    );

    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const paginatedData = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handleExport = () => exportToExcel(filteredData, 'EmployeeDetails');

    return (
        <div className='employee-table-container'>
            <div className='employee-table-header-container'>
                <h1 className='employee-table-heading'>Employee List</h1>
                <div className='employee-table-icon-container'>
                    <Tooltip title='Search'>
                        <IconButton onClick={() => setSearchActive(!searchActive)}>
                            <SearchIcon className='employee-table-header-icon' />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Export Employee Details in Excel'>
                        <IconButton onClick={handleExport}>
                            <FileDownloadIcon className='employee-table-header-icon' />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Download Excel Template To Import Employee'>
                        <IconButton>
                            <CloudDownloadIcon className='employee-table-header-icon' />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Upload File'>
                        <IconButton>
                            <CloudUploadIcon className='header-icon' />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Create New Employee'>
                        <IconButton onClick={() => navigate('/newEmployee')}>
                            <GroupAddIcon className='header-icon' />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>

            <table className='employee-List-table'>
                <thead>
                    <tr>
                        {searchActive ? (
                            Object.keys(searchQueries).map((key) => (
                                <th key={key}>
                                    <input
                                        type='text'
                                        value={searchQueries[key]}
                                        onChange={(e) => handleSearchChange(e, key)}
                                        placeholder={`Search ${key}`}
                                    />
                                </th>
                            ))
                        ) : (
                            <>
                                <th>Photo</th>
                                <th>Emp No</th>
                                <th>Emp Name</th>
                                <th>Email</th>
                                <th>Department</th>
                                <th>Designation</th>
                                <th>Organization</th>
                                <th>Action</th>
                            </>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {filteredData.length > 0 ? (
                        paginatedData.map((item) => (
                            <tr key={item.id}>
                                <td>
                                    <img
                                        src={`${ImgUrl}/${item.PictureName}`}
                                       
                                        className='employee-photo'
                                        
                                    />
                                </td>
                                <td >{item.EmpNo}</td>
                                <td>{item.EmployeeName}</td>
                                <td>{item.Email}</td>
                                <td>{item.DepartmentName}</td>
                                <td>{item.DesignationName}</td>
                                <td>{item.OUName}</td>
                                <td>
                                    <Tooltip title='Edit'>
                                        <IconButton onClick={() => navigate(`/updateEmployee/${item.id}`)}>
                                            <BorderColorIcon className='action-btn update-btn' />
                                        </IconButton>
                                    </Tooltip>
                                   
                                    <Tooltip title='Approval Setup'>
                                        <IconButton onClick={() => navigate(`/approvalSetup/${item.id}`)}>
                                            <AccountTreeIcon className='action-btn update-btn' />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title='Mark as Inactive'>
                                        <IconButton>
                                            <NoAccountsIcon className='action-btn delete-btn' />
                                        </IconButton>
                                    </Tooltip>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan='8'>No data available</td>
                        </tr>
                    )}
                </tbody>

            </table>

            <div className='pagination-container'>
                {page > 1 && (
                    <IconButton onClick={() => setPage((prev) => prev - 1)}>
                        <KeyboardDoubleArrowLeftIcon className='pagination-btn' />
                    </IconButton>
                )}
                <span>{page}</span>
                {paginatedData.length === ITEMS_PER_PAGE && (
                    <IconButton onClick={() => setPage((prev) => prev + 1)}>
                        <KeyboardDoubleArrowRightIcon className='pagination-btn' />
                    </IconButton>
                )}
            </div>
        </div>
    );
};

export default EmployeeDataTable;
