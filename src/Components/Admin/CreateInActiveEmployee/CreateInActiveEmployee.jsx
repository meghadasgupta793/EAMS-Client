import React, { useState } from 'react';
import './createInActiveEmployee.css';
import Header from '../../Header/Header';
import Select from 'react-select'; // Import react-select for the dropdown
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
import AccountTreeIcon from '@mui/icons-material/AccountTree';

const CreateInActiveEmployee = () => {
    const [openState, setOpenState] = useState({});
    const [checkboxState, setCheckboxState] = useState({});
    const [selectedDepartments, setSelectedDepartments] = useState([]); // State for selected departments (multi-select)
    const [selectedEmployees, setSelectedEmployees] = useState([]); // State for selected employees (multi-select)
    const [selectedEmployeeNames, setSelectedEmployeeNames] = useState([]); // State for selected employee names (multi-select)

    // Dummy data for departments
    const departmentOptions = [
        { value: 'IT', label: 'IT' },
        { value: 'HR', label: 'HR' },
        { value: 'Finance', label: 'Finance' },
        { value: 'Sales', label: 'Sales' },
        { value: 'Marketing', label: 'Marketing' },
    ];

    // Dummy data for employee numbers
    const employeeOptions = [
        { value: 'E001', label: 'E001' },
        { value: 'E002', label: 'E002' },
        { value: 'E003', label: 'E003' },
        { value: 'E004', label: 'E004' },
        { value: 'E005', label: 'E005' },
    ];

    // Dummy data for employee names
    const employeeNameOptions = [
        { value: 'John Doe', label: 'John Doe' },
        { value: 'Jane Smith', label: 'Jane Smith' },
        { value: 'Sam Brown', label: 'Sam Brown' },
        { value: 'Emily Davis', label: 'Emily Davis' },
        { value: 'Michael Clark', label: 'Michael Clark' },
    ];

    // Dummy data for organizations (already provided)
    const data = [
        {
            id: 1,
            name: 'West Bengal',
            children: [
                {
                    id: 2,
                    name: 'Kolkata',
                    children: [
                        {
                            id: 3,
                            name: 'Bidhannagar',
                            children: [
                                {
                                    id: 4,
                                    name: 'Location 1',
                                    children: [
                                        { id: 9, name: 'Location 1A', children: [] },
                                        { id: 10, name: 'Location 1B', children: [] },
                                    ],
                                },
                                { id: 5, name: 'Location 2', children: [] },
                                { id: 6, name: 'Location 3', children: [] },
                            ],
                        },
                        { id: 7, name: 'Rajarhat', children: [] },
                        { id: 8, name: 'Alipore', children: [] },
                    ],
                },
            ],
        },
    ];

    // Function to toggle the visibility of child nodes
    const toggleOpenState = (id) => {
        setOpenState((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    // Recursive function to handle checkbox state change and propagate the change to children
    const handleCheckboxChange = (id, children) => {
        setCheckboxState((prevState) => {
            const newState = { ...prevState, [id]: !prevState[id] };

            const propagateCheckboxState = (nodes, state) => {
                nodes.forEach((node) => {
                    newState[node.id] = state;
                    if (node.children && node.children.length > 0) {
                        propagateCheckboxState(node.children, state);
                    }
                });
            };

            if (!prevState[id]) {
                propagateCheckboxState(children, true);
            } else {
                propagateCheckboxState(children, false);
            }

            return newState;
        });
    };

    // Recursive function to render the tree with appropriate indentation
    const renderTree = (node, level = 0) => {
        return (
            <li key={node.id} className={`org ${openState[node.id] ? 'org-open' : ''}`}>
                <div className="org-item" style={{ marginLeft: level * 40 + 'px' }}>
                    {/* Left side: Plus button */}
                    {node.children && node.children.length > 0 && (
                        <button className="plus-button" onClick={() => toggleOpenState(node.id)}>
                            {openState[node.id] ? '-' : '+'}
                        </button>
                    )}

                    {/* Middle: Checkbox */}
                    <input
                        type="checkbox"
                        className="org-checkbox"
                        checked={checkboxState[node.id] || false}
                        onChange={() => handleCheckboxChange(node.id, node.children)}
                    />

                    {/* Right side: Data */}
                    <span className="org-name">{node.name}</span>
                </div>

                {/* Render child nodes if they exist */}
                {node.children && node.children.length > 0 && (
                    <ul style={{ display: openState[node.id] ? 'block' : 'none' }}>
                        {node.children.map((child) => renderTree(child, level + 1))}
                    </ul>
                )}
            </li>
        );
    };

    // Handle department selection change
    const handleDepartmentChange = (selectedOptions) => {
        setSelectedDepartments(selectedOptions); // Update selected departments state
    };

    // Handle employee number selection change
    const handleEmployeeChange = (selectedOptions) => {
        setSelectedEmployees(selectedOptions); // Update selected employees state
    };

    // Handle employee name selection change
    const handleEmployeeNameChange = (selectedOptions) => {
        setSelectedEmployeeNames(selectedOptions); // Update selected employee names state
    };



    ///Table Logic

    const inActiveEmployeeList = [
        {
            empNo: '1001', empName: 'John Doe', department: 'Finance', designation: 'Manager', organization: 'ABC Corp', empPhoto: '/images/profile.png'
        },
        {
            empNo: '1002', empName: 'Jane Smith', department: 'HR', designation: 'Recruiter', organization: 'XYZ Ltd', empPhoto: '/images/profile.png'
        },
        {
            empNo: '1003', empName: 'Alice Johnson', department: 'Engineering', designation: 'Developer', organization: 'TechWorks', empPhoto: '/images/profile.png'
        }
    ];


    const [selectedListedEmployees, setSelectedListedEmployees] = useState([]);

    const handleTableCheckboxChange = (empNo) => {
        setSelectedListedEmployees((prevSelected) => {
            if (prevSelected.includes(empNo)) {
                return prevSelected.filter((emp) => emp !== empNo);
            } else {
                return [...prevSelected, empNo];
            }
        });
    };




    const [selectedReason, setSelectedReason] = useState(null);
    const [remark, setRemark] = useState('');
    const [inActiveOn, setInActiveOn] = useState('');

    // Dummy data for Reason dropdown
    const reasonOptions = [
        { value: 'Resigned', label: 'Resigned' },
        { value: 'Terminated', label: 'Terminated' },
        { value: 'Retired', label: 'Retired' },
        { value: 'Other', label: 'Other' },
    ];

    // Handle Reason change
    const handleReasonChange = (selectedOption) => {
        setSelectedReason(selectedOption);
    };

    // Handle Remark change (Text area)
    const handleRemarkChange = (e) => {
        setRemark(e.target.value);
    };

    // Handle InActiveOn (Date input)
    const handleInActiveOnChange = (e) => {
        setInActiveOn(e.target.value);
    };





    return (
        <div className="createInActiveEmployee">
            <Header />
            <div className="createInActiveEmployee-Container">
                <div className="createInActiveEmployee-header-container">
                    <div className="org-wrapper">
                        <h3 className="org-heading">Select Organizations</h3>
                        <div className="org-container">
                            <ul>{data.map((node) => renderTree(node))}</ul>
                        </div>
                    </div>

                    <div className="createInActiveEmployee-dept-wrapper">
                        <h3 className="dept-heading">Select Departments</h3>
                        <div className="createInActiveEmployee-dept-container">
                            <Select
                                isMulti // Allow multi-selection
                                value={selectedDepartments} // Controlled value for react-select
                                onChange={handleDepartmentChange} // Update selected departments state
                                options={departmentOptions} // Pass the dummy department options
                                isSearchable // Enable search functionality
                                placeholder="Select departments..."
                                className="emp-dropdown" // Optional: Add a custom class for styling
                            />
                        </div>
                    </div>

                    <div className="createInActiveEmployee-emp-wrapper">
                        <h3 className="emp-heading">Select Employees</h3>
                        <div className="createInActiveEmployee-emp-container">
                            <Select
                                isMulti // Allow multi-selection
                                value={selectedEmployees} // Controlled value for react-select
                                onChange={handleEmployeeChange} // Update selected employees state
                                options={employeeOptions} // Pass the dummy employee options
                                isSearchable // Enable search functionality
                                placeholder="Select employees..."
                                className="dept-dropdown" // Optional: Add a custom class for styling
                            />
                        </div>
                    </div>

                    <div className="createInActiveEmployee-emp-name-wrapper">
                        <h3 className="emp-name-heading">Select Employee Names</h3>
                        <div className="createInActiveEmployee-emp-name-container">
                            <Select
                                isMulti // Allow multi-selection
                                value={selectedEmployeeNames} // Controlled value for react-select
                                onChange={handleEmployeeNameChange} // Update selected employee names state
                                options={employeeNameOptions} // Pass the dummy employee name options
                                isSearchable // Enable search functionality
                                placeholder="Select employee names..."
                                className="emp-name-dropdown" // Optional: Add a custom class for styling
                            />
                        </div>
                    </div>

                    <div className='createInActiveEmployee-header-searchbtn-container'>
                        <button className='createInActiveEmployee-header-searchbtn'>Seacrh</button>
                    </div>
                </div>



                {/*createInActiveEmployee table */}
                <div className='createInActiveEmployee-Table-container'>
                    <div className='createInActiveEmployee-Table-header-container'>
                        <h1 className='createInActiveEmployee-table-heading'>InActive Employee List</h1>

                    </div>

                    {/* createInActiveEmployee Table */}
                    <table className='createInActiveEmployee-Table'>
                        <thead>
                            <tr>
                                <th>Photo</th>
                                <th>Emp No</th>
                                <th>Emp Name</th>
                                <th>Department</th>
                                <th>Designation</th>
                                <th>Organization</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inActiveEmployeeList.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <img src={item.empPhoto} className='employee-photo' alt="Employee" />
                                    </td>
                                    <td>{item.empNo}</td>
                                    <td>{item.empName}</td>
                                    <td>{item.department}</td>
                                    <td>{item.designation}</td>
                                    <td>{item.organization}</td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedEmployees.includes(item.empNo)}
                                            onChange={() => handleCheckboxChange(item.empNo)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className='pagination-container'>
                        pagination
                    </div>
                </div>



                {/*reason remark confirm*/}

                {/* Reason, Remark, and InActiveOn Form */}
                <div className="createInActiveEmployee-reson-remark-container">
                    {/* Reason Dropdown */}
                    <div className="createInActiveEmployee-reason">
                        <h3 htmlFor="reason" className="reason-heading">Reason</h3>
                        <div className='reason-container'>
                            <Select
                                id="reason"
                                value={selectedReason}
                                onChange={handleReasonChange}
                                options={reasonOptions}
                                placeholder="Select Reason"
                                className="reason-dropdown"
                            />
                        </div>
                    </div>

                    {/* Remark Text Area */}
                    <div className="createInActiveEmployee-remark">
                        <h3 htmlFor="remark" className="remak-heading">Remark</h3>
                        <div className='remark-container'>
                            <textarea
                                id="remark"
                                value={remark}
                                onChange={handleRemarkChange}
                                placeholder="Enter Remark"
                                className="remark-textarea"
                            />
                        </div>
                    </div>

                    {/* InActiveOn Date Input */}
                    <div className="createInActiveEmployee-inActiveOn">
                        <h3 htmlFor="inActiveOn" className="inActive-heading">InActiveOn</h3>
                        <div className='inActive-container'>
                            <input
                                type="date"
                                id="inActiveOn"
                                value={inActiveOn}
                                onChange={handleInActiveOnChange}
                                className="inactiveon-date"
                            />
                        </div>
                    </div>

                    {/* Confirm Button */}
                    <div className="createInActiveEmployee-confirm">
                        <button className="confirm-button">Confirm</button>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default CreateInActiveEmployee;
