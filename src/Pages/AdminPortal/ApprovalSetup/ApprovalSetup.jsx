import React, { useState } from 'react';
import './approvalSetup.css';
import Header from '../../../Components/Header/Header';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

const dummyEmployee = {
    photo: '/images/kharush.png',
    name: 'John Doe',
    department: 'IT',
    designation: 'Software Engineer',
    ou: 'Development'
};

const reportingToList = [
    { empPhoto: '/images/kharush.png', name: 'Nidhu Ram Mondal', empNo: 'EMP001', designation: 'Manager', department: 'HR' },
    { empPhoto: '/images/kharush.png', name: 'Alice Brown', empNo: 'EMP002', designation: 'Accountant', department: 'Finance' },
    { empPhoto: '/images/kharush.png', name: 'Alice Brown', empNo: 'EMP003', designation: 'Accountant', department: 'Finance' },
    { empPhoto: '/images/kharush.png', name: 'Alice Brown', empNo: 'EMP004', designation: 'Accountant', department: 'Finance' },
    { empPhoto: '/images/kharush.png', name: 'Alice Brown', empNo: 'EMP005', designation: 'Accountant', department: 'Finance' },
];

const reportingByList = [
    { empPhoto: '/images/kharush.png', name: 'Mark Davis', empNo: 'EMP003', designation: 'Developer', department: 'IT' },
    { empPhoto: '/images/kharush.png', name: 'Emma Johnson', empNo: 'EMP004', designation: 'Marketing Specialist', department: 'Marketing' },
    { empPhoto: '/images/kharush.png', name: 'Mark Davis', empNo: 'EMP005', designation: 'Developer', department: 'IT' },
    { empPhoto: '/images/kharush.png', name: 'Emma Johnson', empNo: 'EMP006', designation: 'Marketing Specialist', department: 'Marketing' },
    { empPhoto: '/images/kharush.png', name: 'Mark Davis', empNo: 'EMP007', designation: 'Developer', department: 'IT' },
    { empPhoto: '/images/kharush.png', name: 'Emma Johnson', empNo: 'EMP008', designation: 'Marketing Specialist', department: 'Marketing' },
    { empPhoto: '/images/kharush.png', name: 'Mark Davis', empNo: 'EMP009', designation: 'Developer', department: 'IT' },
    { empPhoto: '/images/kharush.png', name: 'Emma Johnson', empNo: 'EMP010', designation: 'Marketing Specialist', department: 'Marketing' }
];

const ITEMS_PER_PAGE = 2;

const ApprovalSetup = () => {
    const [searchTo, setSearchTo] = useState('');
    const [searchBy, setSearchBy] = useState('');
    const [pageTo, setPageTo] = useState(1);
    const [pageBy, setPageBy] = useState(1);

    // Filtered lists based on search ReportTo
    const filteredReportingToList = reportingToList.filter(employee =>
        employee.name.toLowerCase().includes(searchTo.toLowerCase())
    );


    // Filtered lists based on search ReportTo
    const filteredReportingByList = reportingByList.filter(employee =>
        employee.name.toLowerCase().includes(searchBy.toLowerCase())
    );

    // Pagination for Reporting To
    const startIndexTo = (pageTo - 1) * ITEMS_PER_PAGE;
    const endIndexTo = startIndexTo + ITEMS_PER_PAGE;

    const paginatedDataTo = filteredReportingToList.slice(startIndexTo, endIndexTo);


    
    // Pagination for Reporting By
    const startIndexBy = (pageBy - 1) * ITEMS_PER_PAGE;
    const endIndexBy = startIndexBy + ITEMS_PER_PAGE;
    const paginatedDataBy = filteredReportingByList.slice(startIndexBy, endIndexBy);


    const handleNextTo = () => {
        if (startIndexTo + ITEMS_PER_PAGE < filteredReportingToList.length) {
            setPageTo((prev) => prev + 1);
        }
    };

    const handlePreviousTo = () => {
        if (pageTo > 1) {
            setPageTo((prev) => prev - 1);
        }
    };

    const handleNextBy = () => {
        if (startIndexBy + ITEMS_PER_PAGE < filteredReportingByList.length) {
            setPageBy((prev) => prev + 1);
        }
    };

    const handlePreviousBy = () => {
        if (pageBy > 1) {
            setPageBy((prev) => prev - 1);
        }
    };








    return (
        <div className="approvalSetup">
            <Header />
            <div className="approvalSetup-container">
                <h1>Approver Setup</h1>

                <div className="top-employee-container">
                    <div className="top-employee-card">
                        <img src={dummyEmployee.photo} alt="Employee" />
                        <div className="employee-info">
                            <h3>{dummyEmployee.name}</h3>
                            <p>{dummyEmployee.department}</p>
                            <p>{dummyEmployee.designation}</p>
                            <p>{dummyEmployee.ou}</p>
                        </div>
                    </div>
                </div>

                <div className="bottom-section">
                    <div className="reporting-box left-box">
                        <div className='header-container'>
                            <h3>Reporting To</h3>
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTo}
                                onChange={(e) => setSearchTo(e.target.value)}
                            />
                            <button className='add-btn'>Add</button>
                        </div>
                        <table className="reportingTo-table">
                            <thead>
                                <tr>
                                    <th>Photo</th>
                                    <th>Name</th>
                                    <th>EmpNo</th>
                                    <th>Designation</th>
                                    <th>Department</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedDataTo.map((employee) => (
                                    <tr key={employee.empNo}>
                                        <td><img src={employee.empPhoto} className='employee-photo' alt="Employee" /></td>
                                        <td>{employee.name}</td>
                                        <td>{employee.empNo}</td>
                                        <td>{employee.designation}</td>
                                        <td>{employee.department}</td>
                                        <td>
                                            <DeleteForeverIcon className='delete-btn' />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {/* Pagination Controls */}
                        <div className="pagination-container">
                            {pageTo > 1 && (
                                <IconButton onClick={handlePreviousTo}>
                                    <KeyboardDoubleArrowLeftIcon className="pagination-btn" />
                                </IconButton>
                            )}
                            <span>{pageTo}</span>
                            {endIndexTo < reportingToList.length && (
                                <IconButton onClick={handleNextTo}>
                                    <KeyboardDoubleArrowRightIcon className="pagination-btn" />
                                </IconButton>
                            )}
                        </div>
                    </div>

                    <div className="reporting-box right-box">
                        <div className='header-container'>
                            <h3>Reporting By</h3>
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchBy}
                                onChange={(e) => setSearchBy(e.target.value)}
                            />
                            <button className='add-btn'>Add</button>
                        </div>


                        <table className="reportingBy-table">
                            <thead>
                                <tr>
                                    <th>Photo</th>
                                    <th>Name</th>
                                    <th>EmpNo</th>
                                    <th>Designation</th>
                                    <th>Department</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedDataBy.map((employee, index) => (
                                    <tr key={index}>
                                        <td><img src={employee.empPhoto} className='employee-photo' alt="Employee" /></td>
                                        <td>{employee.name}</td>
                                        <td>{employee.empNo}</td>
                                        <td>{employee.designation}</td>
                                        <td>{employee.department}</td>
                                        <td>
                                            <DeleteForeverIcon className='delete-btn' />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {/* Pagination Controls */}
                        <div className="pagination-container">
                            {pageBy > 1 && (
                                <IconButton onClick={handlePreviousBy}>
                                    <KeyboardDoubleArrowLeftIcon className="pagination-btn" />
                                </IconButton>
                            )}
                            <span>{pageTo}</span>
                            {endIndexBy < reportingByList.length && (
                                <IconButton onClick={handleNextBy}>
                                    <KeyboardDoubleArrowRightIcon className="pagination-btn" />
                                </IconButton>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApprovalSetup;
