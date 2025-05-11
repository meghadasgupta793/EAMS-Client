import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './approvalSetup.css';
import Header from '../../../Components/Header/Header';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Tooltip from '@mui/material/Tooltip';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useGetReportingListsQuery } from '../../../Redux/api/admin/approvalSetupApi';
import config from '../../../secrect';
import { useGetEmpInfoByeIDQuery } from '../../../Redux/api/admin/employeeApi';
import AddReportingHeadOrReportee from '../../../Components/Modal/AdminModal/AddReportingHeadOrReportee/AddReportingHeadOrReportee'; // Import the modal component

const dummyEmployee = {
    photo: '/images/kharush.png',
    name: 'John Doe',
    department: 'IT',
    designation: 'Software Engineer',
    ou: 'Development'
};

const ITEMS_PER_PAGE = 2;

const PaginationControls = ({ page, handlePrevious, handleNext, endIndex, totalItems }) => (
    <div className="pagination-container">
        {page > 1 && (
            <IconButton onClick={handlePrevious}>
                <KeyboardDoubleArrowLeftIcon className="pagination-btn" />
            </IconButton>
        )}
        <span>{page}</span>
        {endIndex < totalItems && (
            <IconButton onClick={handleNext}>
                <KeyboardDoubleArrowRightIcon className="pagination-btn" />
            </IconButton>
        )}
    </div>
);

const ApprovalSetup = () => {
    const { id } = useParams();
    const { data, error, isLoading } = useGetReportingListsQuery(id);
    const { data: empData, error: errorempData, isLoading: isempDataLoading } = useGetEmpInfoByeIDQuery(id);
    const employeeData = empData?.data || dummyEmployee;

    const { ImgUrl } = config;
    const reportingToList = data?.reportingToList || [];
    const reportingByList = data?.reportingByList || [];

    const [searchTo, setSearchTo] = useState('');
    const [searchBy, setSearchBy] = useState('');
    const [pageTo, setPageTo] = useState(1);
    const [pageBy, setPageBy] = useState(1);
    const [modalOpen, setModalOpen] = useState(false); // State to manage modal visibility

    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    const filteredReportingToList = reportingToList.filter(employee =>
        employee.name.toLowerCase().includes(searchTo.toLowerCase())
    );

    const filteredReportingByList = reportingByList.filter(employee =>
        employee.name.toLowerCase().includes(searchBy.toLowerCase())
    );

    const startIndexTo = (pageTo - 1) * ITEMS_PER_PAGE;
    const endIndexTo = startIndexTo + ITEMS_PER_PAGE;
    const paginatedDataTo = filteredReportingToList.slice(startIndexTo, endIndexTo);

    const startIndexBy = (pageBy - 1) * ITEMS_PER_PAGE;
    const endIndexBy = startIndexBy + ITEMS_PER_PAGE;
    const paginatedDataBy = filteredReportingByList.slice(startIndexBy, endIndexBy);

    const handleNextTo = () => {
        if (endIndexTo < filteredReportingToList.length) {
            setPageTo((prev) => prev + 1);
        }
    };

    const handlePreviousTo = () => {
        if (pageTo > 1) {
            setPageTo((prev) => prev - 1);
        }
    };

    const handleNextBy = () => {
        if (endIndexBy < filteredReportingByList.length) {
            setPageBy((prev) => prev + 1);
        }
    };

    const handlePreviousBy = () => {
        if (pageBy > 1) {
            setPageBy((prev) => prev - 1);
        }
    };

    if (isLoading || isempDataLoading) return <div>Loading...</div>;
    if (error || errorempData) return <div>Error: {error?.message || errorempData?.message}</div>;

    return (
        <div className="approvalSetup">
            <Header />
            <div className="approvalSetup-container">
                <h1>Approver Setup</h1>

                <div className="top-employee-container">
                    <div className="top-employee-card">
                        <img
                            src={employeeData.PictureName ? `${ImgUrl}/${employeeData.PictureName}` : '/images/default.png'}
                            className="employee-photo"
                            alt="Employee"
                        />

                        <div className="employee-info">
                            <h3>{employeeData.EmpNo}</h3>
                            <h3>{employeeData.EmployeeName}</h3>
                            <p>{employeeData.Department}</p>
                            <p>{employeeData.Designation}</p>
                        </div>
                    </div>
                </div>

                <div className="bottom-section">
                    <div className="reporting-box reporting-to-box">
                        <div className='reporting-to-header-container'>
                            <h3 className='reporting-to-heading'>Reporting To</h3>
                            <div className='reporting-to-icon-container'>
                                <Tooltip title='Search'>
                                    <IconButton >
                                        <SearchIcon className='reporting-to-header-icon' />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title='Export  Details in Excel'>
                                    <IconButton >
                                        <CloudDownloadIcon className='reporting-to-header-icon' />
                                    </IconButton>
                                </Tooltip>
                               
                            </div>
                        </div>
                        <table className="reportingTo-table">
                            <thead>
                                <tr>
                                    <th>Photo</th>
                                    <th>Name</th>
                                    <th>EmpNo</th>
                                    <th>Designation</th>
                                    <th>Department</th>
                                    <th>Level</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedDataTo.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="empty-message">
                                            You are still not reporting to anyone.
                                        </td>
                                    </tr>
                                ) : (
                                    paginatedDataTo.map((employee) => (
                                        <tr key={employee.empNo}>
                                            <td>
                                                <img
                                                    src={employee.empPhoto ? `${ImgUrl}/${employee.empPhoto}` : '/images/default.png'}
                                                    className="employee-photo"
                                                    alt="Employee"
                                                />
                                            </td>
                                            <td>{employee.name}</td>
                                            <td>{employee.empNo}</td>
                                            <td>{employee.designation}</td>
                                            <td>{employee.department}</td>
                                            <td>{employee.level}</td>
                                            <td>
                                                <DeleteForeverIcon className='delete-btn' onClick={() => handleDeleteEmployee(employee.empNo)} />
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                        {filteredReportingToList.length > ITEMS_PER_PAGE && (
                            <PaginationControls
                                page={pageTo}
                                handlePrevious={handlePreviousTo}
                                handleNext={handleNextTo}
                                endIndex={endIndexTo}
                                totalItems={filteredReportingToList.length}
                            />
                        )}
                    </div>

                    <div className="reporting-box reporting-by-box">
                        <div className='reporting-by-header-container'>
                            <h3 className='reporting-by-heading'>Reporting By</h3>
                            <div className='reporting-by-icon-container'>
                                <Tooltip title='Search'>
                                    <IconButton >
                                        <SearchIcon className='reporting-by-header-icon' />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title='Export  Details in Excel'>
                                    <IconButton >
                                        <CloudDownloadIcon className='reporting-by-header-icon' />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title='Add Reportee'>
                                    <IconButton onClick={handleModalOpen}>
                                        <AddCircleOutlineIcon className='reporting-by-header-icon' />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </div>
                        <table className="reportingBy-table">
                            <thead>
                                <tr>
                                    <th>Photo</th>
                                    <th>Name</th>
                                    <th>EmpNo</th>
                                    <th>Designation</th>
                                    <th>Department</th>
                                    <th>Level</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedDataBy.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="empty-message">
                                            You don't have any reportee.
                                        </td>
                                    </tr>
                                ) : (
                                    paginatedDataBy.map((employee) => (
                                        <tr key={employee.empNo}>
                                            <td>
                                                <img
                                                    src={employee.empPhoto ? `${ImgUrl}/${employee.empPhoto}` : '/images/default.png'}
                                                    className="employee-photo"
                                                    alt="Employee"
                                                />
                                            </td>
                                            <td>{employee.name}</td>
                                            <td>{employee.empNo}</td>
                                            <td>{employee.designation}</td>
                                            <td>{employee.department}</td>
                                            <td>{employee.level}</td>
                                            <td>
                                                <DeleteForeverIcon className='delete-btn' onClick={() => handleDeleteEmployee(employee.empNo)} />
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                        {filteredReportingByList.length > ITEMS_PER_PAGE && (
                            <PaginationControls
                                page={pageBy}
                                handlePrevious={handlePreviousBy}
                                handleNext={handleNextBy}
                                endIndex={endIndexBy}
                                totalItems={filteredReportingByList.length}
                            />
                        )}
                    </div>
                </div>
            </div>
            <AddReportingHeadOrReportee
    employeeData={employeeData}  // Pass employeeData here
    open={modalOpen}              // This controls the modal visibility
    handleClose={handleModalClose}  // This handles closing the modal
/>
        </div>
    );
};

export default ApprovalSetup;