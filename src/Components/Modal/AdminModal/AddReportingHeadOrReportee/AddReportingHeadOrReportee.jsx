import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import CloseIcon from '@mui/icons-material/Close';
import Select from 'react-select';
import SearchIcon from '@mui/icons-material/Search';
import './AddReportingHeadOrReportee.css'; // Import the CSS file

const AddReportingHeadOrReportee = ({ open, handleClose }) => {
    const [selectedOU, setSelectedOU] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState([]);
    const [selectedDesignation, setSelectedDesignation] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const dummyData = {
        ou: ['OU1', 'OU2', 'OU3'],
        departments: ['HR', 'Finance', 'Engineering'],
        designations: ['Manager', 'Developer', 'Analyst']
    };

    // Handler for OU selection
    const handleOUChange = (selectedOptions) => {
        setSelectedOU(selectedOptions);
    };

    // Handler for Department selection
    const handleDepartmentChange = (selectedOptions) => {
        setSelectedDepartment(selectedOptions);
    };

    // Handler for Designation selection
    const handleDesignationChange = (selectedOptions) => {
        setSelectedDesignation(selectedOptions);
    };

    // Map dummy data to options for Select component
    const ouOptions = dummyData.ou.map(ou => ({
        value: ou,
        label: ou
    }));

    const departmentOptions = dummyData.departments.map(dept => ({
        value: dept,
        label: dept
    }));

    const designationOptions = dummyData.designations.map(designation => ({
        value: designation,
        label: designation
    }));


    const dummyEmployees = [
        {
            id: 1, photo: "/images/profile.png", empNo: "EMP001", name: "John Doe", department: "HR", designation: "Manager", ouName: "OU1"
        },
        {
            id: 2, photo: "/images/profile.png", empNo: "EMP002", name: "Jane Smith", department: "Finance", designation: "Analyst", ouName: "OU2"
        },
        {
            id: 3, photo: "/images/profile.png", empNo: "EMP003", name: "Michael Johnson", department: "Engineering", designation: "Developer", ouName: "OU3"
        },
        {
            id: 4, photo: "/images/profile.png", empNo: "EMP004", name: "Emily Davis", department: "HR", designation: "Analyst", ouName: "OU1"
        },
        {
            id: 5, photo: "/images/profile.png", empNo: "EMP005", name: "Robert Wilson", department: "Finance", designation: "Manager", ouName: "OU2"
        },
        {
            id: 6, photo: "/images/profile.png", empNo: "EMP005", name: "Robert Wilson", department: "Finance", designation: "Manager", ouName: "OU2"
        
    },
    {
        id: 7, photo: "/images/profile.png", empNo: "EMP005", name: "Robert Wilson", department: "Finance", designation: "Manager", ouName: "OU2"
    }

    ];


    const [selectedEmployees, setSelectedEmployees] = useState([]);

    // Handle checkbox toggle
    const handleCheckboxChange = (empNo) => {
        setSelectedEmployees((prevSelected) =>
            prevSelected.includes(empNo)
                ? prevSelected.filter((id) => id !== empNo)
                : [...prevSelected, empNo]
        );
    };



    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className="addReportingHeadOrReportee-modal">
                <Box className="addReportingHeadOrReportee-content">
                    <div className='addReportingHeadOrReportee-modal-header-container'>
                        <h1 className='addReportingHeadOrReportee-modal-heading'>ReportingHeadOrReportee</h1>
                        <div className='addReportingHeadOrReportee-modal-icon-container'>
                            {/* Close Button */}
                            <Tooltip title="Close">
                                <IconButton
                                    onClick={handleClose}
                                    className="addReportingHeadOrReportee-close-btn"
                                >
                                    <CloseIcon />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>

                    {/* Search Approver */}
                    <div className='addReportingHeadOrReportee-search-approver'>
                        <div className='addReportingHeadOrReportee-search-approver-header-container'>
                            <h1 className='addReportingHeadOrReportee-search-approver-heading'>Search Approver</h1>
                        </div>

                        <div className='addReportingHeadOrReportee-search-items'>
                            {/* Search and multi Select by OU */}
                            <div className='addReportingHeadOrReportee-search-items-ou'>
                                <Select
                                    isMulti
                                    options={ouOptions}
                                    value={selectedOU}
                                    onChange={handleOUChange}
                                    placeholder="Select OU..."
                                    className="addReportingHeadOrReportee-select"
                                />
                            </div>

                            {/* Search and multi Select by Department */}
                            <div className='addReportingHeadOrReportee-search-items-dept'>
                                <Select
                                    isMulti
                                    options={departmentOptions}
                                    value={selectedDepartment}
                                    onChange={handleDepartmentChange}
                                    placeholder="Select Department..."
                                    className="addReportingHeadOrReportee-select"
                                />
                            </div>

                            {/* Search and multi Select by Designation */}
                            <div className='addReportingHeadOrReportee-search-items-desi'>
                                <Select
                                    isMulti
                                    options={designationOptions}
                                    value={selectedDesignation}
                                    onChange={handleDesignationChange}
                                    placeholder="Select Designation..."
                                    className="addReportingHeadOrReportee-select"
                                />
                            </div>

                            {/* Search button based on the selection */}
                            <div className="addReportingHeadOrReportee-search-btn-container">
                                <button className="addReportingHeadOrReportee-search-btn" >Search</button>
                            </div>
                        </div>
                    </div>

                    {/* EmployeeList */}
                    <div className='addReportingHeadOrReportee-EmployeeList'>
                        <div className='addReportingHeadOrReportee-EmployeeList-header-container'>
                            <h1 className='addReportingHeadOrReportee-EmployeeList-heading'>Employee List</h1>
                            <div className='addReportingHeadOrReportee-EmployeeList-header-icon-container'>

                                <Tooltip title="Search">
                                    <IconButton
                                        className="addReportingHeadOrReportee-EmployeeList-search-btn"
                                    >
                                        <SearchIcon />
                                    </IconButton>
                                </Tooltip>

                            </div>

                        </div>
                     <div className='addReportingHeadOrReportee-EmployeeList-Table-container'>
                     <table className='addReportingHeadOrReportee-EmployeeList-Table'>
                            <thead>
                                <tr>
                                    <th>Photo</th>
                                    <th>EmpNo</th>
                                    <th>Name</th>
                                    <th>Department</th>
                                    <th>Designation</th>
                                    <th>Ou Name</th>
                                    <th>Select</th>
                                </tr>


                            </thead>


                            <tbody>
                                {dummyEmployees.map((employee) => (
                                    <tr key={employee.id}>

                                        <td><img src={employee.photo} alt="Employee" className='emp-photo' /></td>
                                        <td>{employee.empNo}</td>
                                        <td>{employee.name}</td>
                                        <td>{employee.department}</td>
                                        <td>{employee.designation}</td>
                                        <td>{employee.ouName}</td>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={selectedEmployees.includes(employee.empNo)}
                                                onChange={() => handleCheckboxChange(employee.empNo)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                     </div>










                    </div>

                    {/* Select Level and Request Type */}
                    <div className='addReportingHeadOrReportee-level-req-type'>Select Level and Request Type
                    
                    <div>Select Level</div>
                    
                    <div> Select Request Type</div>
                    
                    
                    </div>
                    <button> Assign</button>
                </Box>
            </div>
        </Modal>
    );
};

export default AddReportingHeadOrReportee;