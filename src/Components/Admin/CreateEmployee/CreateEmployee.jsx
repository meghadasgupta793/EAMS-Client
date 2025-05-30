import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './createEmployee.css';
import Header from '../../Header/Header';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CropPhoto from '../../../Components/PhotoModal/CropPhoto/CropPhoto';
import { useSelector, useDispatch } from 'react-redux';
import { clearCropImage } from '../../../Redux/slice/cropImageSlice';
import { useGetAllDepartmentQuery } from '../../../Redux/api/admin/departmentApi';
import { useGetAllDesignationQuery } from '../../../Redux/api/admin/designationApi';
import { useGetAllBatchQuery } from '../../../Redux/api/admin/bacthApi';
import { useGetAllCategoryQuery } from '../../../Redux/api/admin/categoryApi';
import { useGetAllOuQuery } from '../../../Redux/api/admin/ouApi';
import { useGetAllHolidayGroupQuery, useGetAllHolidaysQuery } from '../../../Redux/api/admin/holidayApi';
import { useGetAllAutoShiftGroupQuery, useGetAllShiftsQuery } from '../../../Redux/api/admin/shiftApi';
import { useCreateEmployeeMutation } from '../../../Redux/api/admin/employeeApi';


const CreateEmployee = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        return () => {
            dispatch(clearCropImage());
        };
    }, [dispatch]);

    const image = useSelector((state) => state.cropImage.image);
    const [createEmployee, { isLoading, error }] = useCreateEmployeeMutation();

    const { data: departmentData, departmenterror, isdepartmentLoading } = useGetAllDepartmentQuery();
    const { data: designationsData, designationserror, isdesignationsLoading } = useGetAllDesignationQuery();
    const { data: batchesData, batcheserror, isbatchesLoading } = useGetAllBatchQuery();
    const { data: categoriesData, categorieserror, iscategoriesLoading } = useGetAllCategoryQuery();
    const { data: organizationsData, organizationserror, isorganizationsLoading } = useGetAllOuQuery();
    const { data: holidayGroupsData, holidayGroupserror, isholidayGroupsLoading } = useGetAllHolidayGroupQuery();

    const { data: shiftData, shifterror, isshiftLoading } = useGetAllShiftsQuery();
    const { data: autoShiftData, autoShiferror, isautoShifLoading } = useGetAllAutoShiftGroupQuery();

    const departments = departmentData?.data || [];
    const designations = designationsData?.data || [];
    const batches = batchesData?.data || [];
    const categories = categoriesData?.data || [];
    const organizations = organizationsData?.data || [];
    const holidayGroups = holidayGroupsData?.data || [];
    const shifts = shiftData?.data || [];
    const autoShiftGroups = autoShiftData?.data || [];

    if (isshiftLoading || isdepartmentLoading || isdesignationsLoading || isbatchesLoading || iscategoriesLoading || isorganizationsLoading || isholidayGroupsLoading) {
        return <div>Loading...</div>;
    }

    if (shifterror || departmenterror || designationserror || batcheserror || categorieserror || organizationserror || holidayGroupserror) {
        return <div>Error loading data</div>;
    }

    const shiftTypes = [
        { "id": 1, "Name": "Fixed" },
        { "id": 2, "Name": "Flexi" },
        { "id": 3, "Name": "Auto" }
    ]



 

    const weekoffs = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const [step, setStep] = useState(1);
    const [selectedShiftType, setSelectedShiftType] = useState('1');
    const handleShiftTypeChange = (e) => setSelectedShiftType(e.target.value);
    const handleNext = () => step < 3 && setStep(step + 1);
    const handlePrevious = () => step > 1 && setStep(step - 1);
    const [isemployeeImgModalOpen, setIsEmployeeImgModalOpen] = useState(false);
    const openModal = () => setIsEmployeeImgModalOpen(true);
    const closeModal = () => setIsEmployeeImgModalOpen(false);
    const [formData, setFormData] = useState({
        EmployeeName: '',
        Email: '',
        PhoneNo: '',
        EmpNo: '',
        IdNo: '',
        OUID: '',
        DateOfJoin: '',
        PFNumber: '',
        ESINumber: '',
        AadhaarNo: '',
        Address: '',
        ValidUpTo: '',
        DepartmentID: '',
        DesignationID: '',
        BatchID: '',
        CategoryID: '',
        HolidayGroupID: '',
        Shift: '',
        NonShiftGroup: '',
        LateApplicable: 1,
        ShiftEarlyAsExtra: 1,
        SinglePunchAllowed: 1,
        OverTimeApplicable: 1,
        CalculateWorkHour: '',
        CreatedBy: 1,
        Weekoffs: [],

    });

 // Utility function to convert base64 to File
const base64ToFile = (base64String, fileName) => {
    const arr = base64String.split(',');
    const mime = arr[0].match(/:(.*?);/)[1]; // Extract MIME type
    const bstr = atob(arr[1]); // Decode base64 string
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    // Convert the decoded data into a Uint8Array
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    // Create and return a File object
    return new File([u8arr], fileName, { type: mime });
};

const handleSubmit = async () => {
    const weekOrder = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const weekoffsBinary = weekOrder
        .map(day => formData.Weekoffs.includes(day) ? '1' : '0')
        .join('');

    // Create a new FormData object
    const submissionData = new FormData();

    // Append all form data fields to FormData
    Object.keys(formData).forEach((key) => {
        if (key !== 'Weekoffs') {
            submissionData.append(key, formData[key]);
        }
    });

    // Append Weekoffs and ShiftType
    submissionData.append("Weekoffs", weekoffsBinary);
    submissionData.append("ShiftType", selectedShiftType);

    // Append the image if it exists
    if (image) {
        let finalImage;

        // If the image is a base64 string, convert it to a File object
        if (typeof image === "string" && image.startsWith("data:image")) {
            finalImage = base64ToFile(image, "employee_photo.jpg");
        } else {
            console.error("Unsupported image format:", image);
            toast.error("Unsupported image format. Please upload a valid image.");
            return;
        }

        // Append the image file to FormData
        submissionData.append("Photo", finalImage);
    }

    try {
        // Call the create API
        const response = await createEmployee(submissionData).unwrap();
       // Show success toast and navigate after 2 seconds
       toast.success(response.message, {
        onClose: () => {
            console.log('Navigating to /employee'); // Debugging
            navigate('/employee');
        },
        autoClose: 2000, // Close the toast after 2 seconds
    });
    } catch (err) {
        console.error("Error creating employee:", err);
        
        // Display the actual error message from the backend
        if (err?.data?.message) {
            toast.error(err.data.message); // Show error toast
        } else if (err?.data?.error) {
            toast.error(err.data.error); // Fallback for error message
        } else {
            toast.error("Error creating employee"); // Show generic error toast
        }
    }
};

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        console.log(`Changed: ${name} → ${value}`);
    
        if (type === "checkbox") {
            setFormData((prevData) => ({
                ...prevData,
                Weekoffs: checked
                    ? [...new Set([...prevData.Weekoffs, value])]
                    : prevData.Weekoffs.filter((day) => day !== value),
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const renderSelectOptions = (options) => {
        return options.length > 0 ? options.map((option, index) => (
            <option key={index} value={option.ID || option.id || option.Code || option}>
                {option.OUName || option.Name || option.name || option}
            </option>
        )) : <option>No data available</option>;
    };
    useEffect(() => {
        // Calculate today's date
        const today = new Date();
        const todayFormatted = today.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    
        // Calculate the date 6 months from today
        const sixMonthsFromToday = new Date(today.setMonth(today.getMonth() + 6));
        const sixMonthsFormatted = sixMonthsFromToday.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    
        // Set the initial form data with today's date and 6 months from today
        setFormData((prevData) => ({
            ...prevData,
            DateOfJoin: todayFormatted,
            ValidUpTo: sixMonthsFormatted,
            OUID: organizations.length > 0 ? organizations[0].ID || organizations[0] : prevData.OUID,
            DepartmentID: departments.length > 0 ? departments[0].ID || departments[0] : prevData.DepartmentID,
            DesignationID: designations.length > 0 ? designations[0].ID || designations[0] : prevData.DesignationID,
            BatchID: batches.length > 0 ? batches[0].ID || batches[0] : prevData.BatchID,
            CategoryID: categories.length > 0 ? categories[0].ID || categories[0] : prevData.CategoryID,
            Shift: shifts.length > 0 ? shifts[0].Code || shifts[0] : prevData.Shift,
            NonShiftGroup: autoShiftGroups.length > 0 ? autoShiftGroups[0].id || autoShiftGroups[0] : prevData.NonShiftGroup,
            HolidayGroupID: holidayGroups.length > 0 ? holidayGroups[0].id || holidayGroups[0] : prevData.HolidayGroupID,
        }));
    }, [organizations, departments, designations, batches, categories, shifts, autoShiftGroups, holidayGroups]);


    console.log(formData)

    return (
        <div className='createEmployee'>
            <Header />
            <div className='create-container'>
                <h1>{step === 1 ? "Employee Information" : step === 2 ? "Employment Details" : "Attendance Information"}</h1>
                <div className='createEmployee-content'>
                    <div className='left-section'>
                        <div className='employee-pic'>
                            {image ? <img src={image} alt='Employee' /> : <img src='/images/profile.png' alt='Employee' />}
                            <div className='camera-icon' onClick={openModal}>
                                <CameraAltIcon />
                            </div>

                        </div>
                    </div>
                    <div className='right-section'>
                        {step === 1 && (
                            <>
                                <div className='middle'>
                                    <label>Employee Name:</label>
                                    <input type='text' name='EmployeeName' value={formData.EmployeeName} onChange={handleInputChange} />

                                    <label>Email:</label>
                                    <input type='email' name='Email' value={formData.Email} onChange={handleInputChange} />

                                    <label>Mobile No:</label>
                                    <input type='tel' name='PhoneNo' value={formData.PhoneNo} onChange={handleInputChange} />

                                    <label>Employee No:</label>
                                    <input type='text' name='EmpNo' value={formData.EmpNo} onChange={handleInputChange} />

                                    <label>ID No:</label>
                                    <input type='text' name='IdNo' value={formData.IdNo} onChange={handleInputChange} />

                                    <label>Organization:</label>
                                    <select name='OUID' value={formData.OUID} onChange={handleInputChange}>
                                        {renderSelectOptions(organizations)}
                                    </select>
                                </div>
                            </>
                        )}

                        {step === 2 && (
                            <>
                                <div className='middle'>
                                    <label>Date of Join:</label>
                                    <input type='date' name='DateOfJoin' value={formData.DateOfJoin} onChange={handleInputChange} />
                                    <label>PF Number:</label>
                                    <input type='text' name='PFNumber' value={formData.PFNumber} onChange={handleInputChange} />

                                    <label>ESI Number:</label>
                                    <input type='text' name='ESINumber' value={formData.ESINumber} onChange={handleInputChange} />


                                    <label>Aadhaar No:</label>
                                    <input type='text' name='AadhaarNo' value={formData.AadhaarNo} onChange={handleInputChange} />

                                    <label>Address:</label>
                                    <input type='text' name='Address' value={formData.Address} onChange={handleInputChange} />

                                </div>
                                <div className='right'>
                                    <label>Valid Up To:</label>
                                    <input type='date' name='ValidUpTo' value={formData.ValidUpTo} onChange={handleInputChange} />
                                    <label>Department:</label>
                                    <select name='DepartmentID' value={formData.DepartmentID} onChange={handleInputChange}>
                                        {renderSelectOptions(departments)}
                                    </select>
                                    <label>Designation:</label>
                                    <select name='DesignationID' value={formData.DesignationID} onChange={handleInputChange}>
                                        {renderSelectOptions(designations)}
                                    </select>
                                    <label>Batch:</label>
                                    <select name='BatchID' value={formData.BatchID} onChange={handleInputChange}>
                                        {renderSelectOptions(batches)}
                                    </select>
                                    <label>Category:</label>
                                    <select name='CategoryID' value={formData.CategoryID} onChange={handleInputChange}>
                                        {renderSelectOptions(categories)}
                                    </select>

                                </div>
                            </>
                        )}

                        {step === 3 && (
                            <>
                                <div className='middle'>
                                    <label>Shift Type:</label>

                                    <select name='ShiftType' value={selectedShiftType} onChange={handleShiftTypeChange}>
                                        {shiftTypes.map((shiftType, index) => (
                                            <option key={shiftType.id} value={shiftType.id}>{shiftType.Name}</option>
                                        ))}
                                    </select>
                                    {selectedShiftType === '1' && (
                                        <>
                                            <label>Choose Shift:</label>
                                            <select name='Shift'
                                                value={formData.Shift}
                                                onChange={handleInputChange} >
                                                {renderSelectOptions(shifts)}
                                            </select>

                                        </>
                                    )}
                                    {selectedShiftType === '3' && (
                                        <>
                                            <label>Auto Shift Group:</label>
                                            <select name='AutoShiftGroup'
                                                value={formData.NonShiftGroup}
                                                onChange={handleInputChange} >
                                                {renderSelectOptions(autoShiftGroups)}
                                            </select>

                                        </>
                                    )}
                                    {selectedShiftType === '2' && null}
                                </div>
                                <div className='right'>
                                    <label>Weekoff:</label>
                                    <div className='weekoff-container'>
                                        {weekoffs.map((day) => (
                                            <div key={day} className='day-checkbox'>
                                                <span>{day}</span>
                                                <input
                                                    type='checkbox'
                                                    name='Weekoffs'
                                                    value={day}
                                                    checked={formData.Weekoffs?.includes(day) || false}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <label>Holiday Group:</label>
                                    <select name='HolidayGroupID'
                                        value={formData.HolidayGroupID}
                                        onChange={handleInputChange} >
                                        {renderSelectOptions(holidayGroups)}
                                    </select>
                                   
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className='buttons'>
                    {step > 1 && <button onClick={handlePrevious}>Previous</button>}
                    {step < 3 && <button onClick={handleNext}>Next</button>}
                    {step === 3 && <button onClick={handleSubmit}>Create</button>}
                </div>
            </div>
            {isemployeeImgModalOpen && <CropPhoto closeModal={closeModal} />}
        </div>
    );
};

export default CreateEmployee;
