import React, { useState } from 'react';
import './createEmployee.css';
import Header from '../../Header/Header';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import EmployeeImg from '../Modals/EmployeeImg/EmployeeImg';

const CreateEmployee = () => {
    // Arrays for select dropdown options
    const departments = ['IT', 'Dev', 'Production'];
    const designations = ['Manager', 'Security', 'Developer'];
    const shiftTypes = ['Fixed', 'Flexi', 'Auto'];
    const shifts = ['Day-Shift', 'Afternoon-Shift', 'Night-Shift'];
    const autoShiftGroups = ['ABCD', 'AMN', 'DDH'];
    const weekoffs = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const holidayGroups = ['WestBengalHoliday', 'NorthSideHoliday', 'EastSideHoliday'];

    const [step, setStep] = useState(1); // To keep track of the current step

    // State variables for form fields
    const [employeeName, setEmployeeName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [employeeNo, setEmployeeNo] = useState("");
    const [idNo, setIdNo] = useState("");
    const [organization, setOrganization] = useState("");
    const [selectedWeekoffs, setSelectedWeekoffs] = useState([]);
    const [selectedShiftType, setSelectedShiftType] = useState('Fixed'); // State for Shift Type


    const handleWeekoffChange = (day) => {
        if (selectedWeekoffs.includes(day)) {
            setSelectedWeekoffs(selectedWeekoffs.filter(weekoff => weekoff !== day));
        } else {
            setSelectedWeekoffs([...selectedWeekoffs, day]);
        }
    };

    const handleShiftTypeChange = (e) => {
        setSelectedShiftType(e.target.value); // Update shift type state
    };

    const handleNext = () => {
        if (step < 3) {
            setStep(step + 1);
        }
    };

    const handlePrevious = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

   

    // State for modal visibility
    const [isemployeeImgModalOpen, setIsEmployeeImgModalOpen] = useState(false);

    // Functions to open and close the modal
    const openModal = () => setIsEmployeeImgModalOpen(true);
    const closeModal = () => setIsEmployeeImgModalOpen(false);










    return (
        <div className='createEmployee'>
            <Header />
            <div className='create-container'>
                {step === 1 && <h1>Employee Information</h1>}
                {step === 2 && <h1>Employment Details</h1>}
                {step === 3 && <h1>Attendance Information</h1>}

                <div className='createEmployee-content'>
                    <div className='left-section'>
                        {/* Employee Photo Section */}
                        <div className='employee-pic'>
                            <img src='/images/profile.png' alt='Employee' />
                            <div className='camera-icon' onClick={openModal}>
                                <CameraAltIcon />
                            </div>
                        </div>
                    </div>

                    <div className='right-section'>
                        {/* First Step - Employee Information */}
                        {step === 1 && (
                            <>
                                <div className='middle'>
                                    <label>Employee Name:</label>
                                    <input
                                        type='text'
                                        value={employeeName}
                                        onChange={(e) => setEmployeeName(e.target.value)}
                                    />

                                    <label>Email:</label>
                                    <input
                                        type='email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />

                                    <label>Mobile No:</label>
                                    <input
                                        type='tel'
                                        value={mobileNo}
                                        onChange={(e) => setMobileNo(e.target.value)}
                                    />
                                </div>
                                <div className='right'>
                                    <label>Employee No:</label>
                                    <input
                                        type='text'
                                        value={employeeNo}
                                        onChange={(e) => setEmployeeNo(e.target.value)}
                                    />

                                    <label>ID No:</label>
                                    <input
                                        type='text'
                                        value={idNo}
                                        onChange={(e) => setIdNo(e.target.value)}
                                    />

                                    <label>Organization:</label>
                                    <input
                                        type='text'
                                        value={organization}
                                        onChange={(e) => setOrganization(e.target.value)}
                                    />
                                </div>
                            </>
                        )}

                        {/* Second Step - Employment Details */}
                        {step === 2 && (
                            <>
                                <div className='middle'>
                                    <label>Date of Join: </label>
                                    <input type='date' />

                                    <label>PF Number:</label>
                                    <input type='text' />

                                    <label>ESI Number:</label>
                                    <input type='text' />

                                    <label>Address:</label>
                                    <input type='text' />
                                </div>
                                <div className='right'>
                                    <label>Department:</label>
                                    <select>
                                        {departments.map((dept, index) => (
                                            <option key={index} value={dept}>
                                                {dept}
                                            </option>
                                        ))}
                                    </select>

                                    <label>Designation:</label>
                                    <select>
                                        {designations.map((desig, index) => (
                                            <option key={index} value={desig}>
                                                {desig}
                                            </option>
                                        ))}
                                    </select>

                                    <label>Batch:</label>
                                    <input type='text' />
                                    <label>Category:</label>
                                    <input type='text' />
                                </div>
                            </>
                        )}

                        {/* Third Step - Attendance Information */}
                        {step === 3 && (
                            <>
                                <div className='middle'>
                                <label>Shift Type:</label>
                                    <select value={selectedShiftType} onChange={handleShiftTypeChange}>
                                        {shiftTypes.map((shiftType, index) => (
                                            <option key={index} value={shiftType}>
                                                {shiftType}
                                            </option>
                                        ))}
                                    </select>

                                    {/* Conditionally render based on Shift Type */}
                                    {selectedShiftType === 'Fixed' && (
                                        <>
                                            <label>Choose Shift:</label>
                                            <select>
                                                {shifts.map((shift, index) => (
                                                    <option key={index} value={shift}>
                                                        {shift}
                                                    </option>
                                                ))}
                                            </select>
                                        </>
                                    )}

                                    {selectedShiftType === 'Auto' && (
                                        <>
                                            <label>Auto Shift Group:</label>
                                            <select>
                                                {autoShiftGroups.map((group, index) => (
                                                    <option key={index} value={group}>
                                                        {group}
                                                    </option>
                                                ))}
                                            </select>
                                        </>
                                    )}

                                    {/* Hide both Choose Shift and Auto Shift Group for Flexi */}
                                    {selectedShiftType === 'Flexi' && null}
                                </div>
                                <div className='right'>
                                <label>Weekoff:</label>
                                    <div className='weekoff-container'>
                                        {weekoffs.map((day, index) => (
                                            <div key={index} className='day-checkbox'>
                                                <span>{day}</span>
                                                <input
                                                    type='checkbox'
                                                    value={day}
                                                    checked={selectedWeekoffs.includes(day)}
                                                    onChange={() => handleWeekoffChange(day)}
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    <label>Holiday Group:</label>
                                    <select>
                                        {holidayGroups.map((holiday, index) => (
                                            <option key={index} value={holiday}>
                                                {holiday}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Navigation Buttons */}
                <div className='buttons'>
                    {step > 1 && <button onClick={handlePrevious}>Previous</button>}
                    {step < 3 && <button onClick={handleNext}>Next</button>}
                    {step === 3 && <button>Create</button>}
                </div>
            </div>
             {/* Render the modal conditionally */}
             {isemployeeImgModalOpen && <EmployeeImg closeModal={closeModal} />}
        </div>
    );
};

export default CreateEmployee;
