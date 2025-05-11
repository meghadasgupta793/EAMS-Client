import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import CloseIcon from '@mui/icons-material/Close';
import Select from 'react-select';
import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';
import './AddReportingHeadOrReportee.css';
import { useGetAllDepartmentQuery } from '../../../../Redux/api/admin/departmentApi';
import { useGetAllDesignationQuery } from '../../../../Redux/api/admin/designationApi';
import { useGetAllOuOwnerQuery } from '../../../../Redux/api/admin/ouApi';
import { 
  useUnAssignedReporteeListMutation,
  useApproverMappingMutation
} from '../../../../Redux/api/admin/approvalSetupApi';
import config from '../../../../secrect';

const AddReportingHeadOrReportee = ({ open, handleClose, employeeData }) => {
    const { ImgUrl } = config;
    // State management

    const [selectedOU, setSelectedOU] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState([]);
    const [selectedDesignation, setSelectedDesignation] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLevel, setSelectedLevel] = useState(null);
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [localSearchResults, setLocalSearchResults] = useState([]);

    // API hooks
    const { data: departmentData, isLoading: deptLoading } = useGetAllDepartmentQuery();
    const { data: designationsData, isLoading: desigLoading } = useGetAllDesignationQuery();
    const { data: organizationsData, isLoading: ouLoading } = useGetAllOuOwnerQuery();
    const [getUnassignedReportees, { data: reporteeData, isLoading: isReporteeLoading }] = useUnAssignedReporteeListMutation();
    const [approverMapping, { isLoading: isMappingLoading }] = useApproverMappingMutation();

    // Static options
    const levelOptions = [
        { value: '1', label: 'Level 1' },
        { value: '2', label: 'Level 2' },
        { value: '3', label: 'Level 3' }
    ];

    // Helper functions to map API data to select options
    const getOuOptions = () => {
        return organizationsData?.data?.map(ou => ({
            value: ou.ID,
            label: ou.Name
        })) || [];
    };

    const getDepartmentOptions = () => {
        return departmentData?.data?.map(dept => ({
            value: dept.ID,
            label: dept.Name
        })) || [];
    };

    const getDesignationOptions = () => {
        return designationsData?.data?.map(des => ({
            value: des.ID,
            label: des.Name
        })) || [];
    };

    // Handle API search for reportees
    const handleSearch = async () => {
        try {
            const requestBody = {
                ApproverEmployeeID: employeeData?.id || 0,
                OuId: selectedOU.map(ou => ou.value).join(','),
                DepartmentId: selectedDepartment.map(dept => dept.value).join(','),
                DesignationID: selectedDesignation.map(des => des.value).join(',')
            };

            const response = await getUnassignedReportees(requestBody).unwrap();
            const mappedEmployees = response?.data?.map(emp => ({
                id: emp.id,
                empNo: emp.EmpNo,
                name: emp.EmployeeName,
                photo: emp.PictureName ,
                designation: emp.Designation,
                department: emp.Department,
                ouName: emp.OU
            })) || [];

            setFilteredEmployees(mappedEmployees);
            setLocalSearchResults(mappedEmployees);
            setSelectedEmployees([]); // Clear previous selections on new search
        } catch (error) {
            console.error("Error fetching reportees:", error);
            setFilteredEmployees([]);
            setLocalSearchResults([]);
        }
    };

    // Handle local search within already fetched results
    const handleLocalSearch = () => {
        if (!localSearchResults.length) return;

        const searchLower = searchQuery.toLowerCase();
        const filtered = localSearchResults.filter(employee => {
            return (
                employee.name?.toLowerCase().includes(searchLower) ||
                (employee.empNo?.toLowerCase().includes(searchLower)) ||
                (employee.department?.toLowerCase().includes(searchLower)) ||
                (employee.designation?.toLowerCase().includes(searchLower)) ||
                (employee.ouName?.toLowerCase().includes(searchLower))
            );
        });

        setFilteredEmployees(filtered);
    };

    // Handle checkbox selection
    const handleCheckboxChange = (empId) => {
        setSelectedEmployees(prev =>
            prev.includes(empId) ? prev.filter(id => id !== empId) : [...prev, empId]
        );
    };

    // Handle assignment of approvers
    const handleAssignApprovers = async () => {
        try {
            if (selectedEmployees.length === 0 || !selectedLevel || !employeeData?.id) {
                alert('Please select at least one employee and an approval level');
                return;
            }

            const requestBody = {
                EmployeeIDs: selectedEmployees,
                ApprovalLevel: selectedLevel.value,
                ApproverEmployeeID: employeeData.id,
                LastUpdatedBy: 1
            };

            await approverMapping(requestBody).unwrap();
            
            // Success handling
            alert('Approvers mapped successfully!');
            handleClose();
            
            // Reset form
            setSelectedEmployees([]);
            setSelectedLevel(null);
            
        } catch (error) {
            console.error('Error mapping approvers:', error);
            alert(`Failed to map approvers: ${error.data?.message || error.message}`);
        }
    };

    // Initialize with employee data if available
    useEffect(() => {
        if (employeeData) {
            const mappedEmployees = Array.isArray(employeeData) ?
                employeeData.map(emp => ({
                    id: emp.id,
                    empNo: emp.EmpNo,
                    name: emp.EmployeeName,
                    photo: emp.PictureName ,
                    designation: emp.Designation,
                    department: emp.Department,
                    ouName: emp.OU
                })) : [];
            setFilteredEmployees(mappedEmployees);
            setLocalSearchResults(mappedEmployees);
        }
    }, [employeeData]);

    // Handle search when searchQuery changes
    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredEmployees(localSearchResults);
        } else {
            handleLocalSearch();
        }
    }, [searchQuery]);

    // Loading state
    if (ouLoading || deptLoading || desigLoading) {
        return (
            <Modal open={open} onClose={handleClose}>
                <Box className="addReportingHeadOrReportee-content" sx={{
                    width: '80vw',
                    maxWidth: '1000px',
                    maxHeight: '90vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <CircularProgress />
                </Box>
            </Modal>
        );
    }

    return (
        <Modal open={open} onClose={handleClose}>
            <div className="addReportingHeadOrReportee-modal">
                <Box className="addReportingHeadOrReportee-content" sx={{
                    width: '80vw',
                    maxWidth: '1000px',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    padding: '20px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    outline: 'none'
                }}>
                    <div className='addReportingHeadOrReportee-modal-header-container'>
                        <h1 className='addReportingHeadOrReportee-modal-heading'>Reporting Head or Reportee</h1>
                        <div className='addReportingHeadOrReportee-modal-icon-container'>
                            <Tooltip title="Close">
                                <IconButton onClick={handleClose} className="addReportingHeadOrReportee-close-btn">
                                    <CloseIcon />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>

                    {/* Search Approver Section */}
                    <div className='addReportingHeadOrReportee-search-approver'>
                        <div className='addReportingHeadOrReportee-search-approver-header-container'>
                            <h1 className='addReportingHeadOrReportee-search-approver-heading'>Search Approver</h1>
                        </div>

                        <div className='addReportingHeadOrReportee-search-items'>
                            <div className='addReportingHeadOrReportee-search-fields'>
                                <div className='addReportingHeadOrReportee-search-items-ou'>
                                    <Select
                                        isMulti
                                        options={getOuOptions()}
                                        value={selectedOU}
                                        onChange={setSelectedOU}
                                        placeholder="Select OU..."
                                        className="addReportingHeadOrReportee-select"
                                        classNamePrefix="select"
                                        isLoading={ouLoading}
                                    />
                                </div>

                                <div className='addReportingHeadOrReportee-search-items-dept'>
                                    <Select
                                        isMulti
                                        options={getDepartmentOptions()}
                                        value={selectedDepartment}
                                        onChange={setSelectedDepartment}
                                        placeholder="Select Department..."
                                        className="addReportingHeadOrReportee-select"
                                        classNamePrefix="select"
                                        isLoading={deptLoading}
                                    />
                                </div>

                                <div className='addReportingHeadOrReportee-search-items-desi'>
                                    <Select
                                        isMulti
                                        options={getDesignationOptions()}
                                        value={selectedDesignation}
                                        onChange={setSelectedDesignation}
                                        placeholder="Select Designation..."
                                        className="addReportingHeadOrReportee-select"
                                        classNamePrefix="select"
                                        isLoading={desigLoading}
                                    />
                                </div>
                            </div>

                            <div className="addReportingHeadOrReportee-search-btn-container">
                                <button
                                    className="addReportingHeadOrReportee-search-btn"
                                    onClick={handleSearch}
                                    disabled={isReporteeLoading}
                                >
                                    {isReporteeLoading ? (
                                        <>
                                            <CircularProgress size={20} style={{ color: 'white', marginRight: '8px' }} />
                                            Searching...
                                        </>
                                    ) : 'Search'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Employee List Section */}
                    <div className='addReportingHeadOrReportee-EmployeeList'>
                        <div className='addReportingHeadOrReportee-EmployeeList-header-container'>
                            <h1 className='addReportingHeadOrReportee-EmployeeList-heading'>Employee List</h1>
                            <div className='addReportingHeadOrReportee-EmployeeList-header-icon-container'>
                                <div className="addReportingHeadOrReportee-search-input-container">
                                    <input
                                        type="text"
                                        placeholder="Search employees..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="addReportingHeadOrReportee-search-input"
                                    />
                                    <SearchIcon className="addReportingHeadOrReportee-search-icon" />
                                </div>
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
                                        <th>OU Name</th>
                                        <th>Select</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isReporteeLoading ? (
                                        <tr>
                                            <td colSpan="7" style={{ textAlign: 'center' }}>
                                                <CircularProgress size={24} />
                                            </td>
                                        </tr>
                                    ) : filteredEmployees.length > 0 ? (
                                        filteredEmployees.map((employee) => (
                                            <tr key={employee.id}>
                                                <td>
                                                    <img 
                                                        src={`${ImgUrl}/${employee.photo}`} 
                                                        alt="Employee" 
                                                        className='emp-photo' 
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.src = "/images/profile.png";
                                                        }}
                                                    />
                                                </td>
                                                <td>{employee.empNo || 'N/A'}</td>
                                                <td>{employee.name || 'N/A'}</td>
                                                <td>{employee.department || 'N/A'}</td>
                                                <td>{employee.designation || 'N/A'}</td>
                                                <td>{employee.ouName || 'N/A'}</td>
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedEmployees.includes(employee.id)}
                                                        onChange={() => handleCheckboxChange(employee.id)}
                                                    />
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" style={{ textAlign: 'center' }}>
                                                No employees found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Level and Request Type Section */}
                    <div className='addReportingHeadOrReportee-level-req-type'>
                        <h1 className='addReportingHeadOrReportee-level-req-type-heading'>Select Level</h1>
                        <div className='addReportingHeadOrReportee-level-req-type-container'>
                            <div className='addReportingHeadOrReportee-level-req-type-fields'>
                                <div className='addReportingHeadOrReportee-level-container'>
                                    <Select
                                        options={levelOptions}
                                        value={selectedLevel}
                                        onChange={setSelectedLevel}
                                        placeholder="Select Level..."
                                        className="addReportingHeadOrReportee-select"
                                        classNamePrefix="select"
                                    />
                                </div>
                            </div>

                            <button
                                className="addReportingHeadOrReportee-assign-btn"
                                onClick={handleAssignApprovers}
                                disabled={selectedEmployees.length === 0 || !selectedLevel || isMappingLoading}
                            >
                                {isMappingLoading ? (
                                    <>
                                        <CircularProgress size={20} style={{ color: 'white', marginRight: '8px' }} />
                                        Assigning...
                                    </>
                                ) : 'Assign'}
                            </button>
                        </div>
                    </div>
                </Box>
            </div>
        </Modal>
    );
};

export default AddReportingHeadOrReportee;