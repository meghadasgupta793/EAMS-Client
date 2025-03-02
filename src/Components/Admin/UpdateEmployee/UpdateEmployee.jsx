import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './updateEmployee.css';
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
import { useGetAllHolidayGroupQuery } from '../../../Redux/api/admin/holidayApi';
import { useGetAllAutoShiftGroupQuery, useGetAllShiftsQuery } from '../../../Redux/api/admin/shiftApi';
import { useGetEmployeeByIdQuery, useUpdateEmployeeMutation } from '../../../Redux/api/admin/employeeApi';
import config from '../../../secrect';

const UpdateEmployee = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { ImgUrl } = config;
    const dispatch = useDispatch();
    useEffect(() => {
        return () => {
            dispatch(clearCropImage());
        };
    }, [dispatch]);

    const image = useSelector((state) => state.cropImage.image);
    const { data, error, isLoading } = useGetEmployeeByIdQuery(id);
    const employeeData = data?.data || {};
    console.log(employeeData);

    const [updateEmployee, { isupdateEmployeeLoading, updateEmployeeerror }] = useUpdateEmployeeMutation();

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

    const [selectedShiftType, setSelectedShiftType] = useState('1');

    useEffect(() => {
        if (employeeData && Object.keys(employeeData).length > 0) {
            const weekOrder = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            const weekoffsArray = employeeData.Weekoffs
                ? employeeData.Weekoffs
                    .split('')
                    .map((day, index) => (day === '1' ? weekOrder[index] : null))
                    .filter(day => day !== null)
                : [];

            setFormData({
                EmployeeName: employeeData.EmployeeName,
                Email: employeeData.Email,
                PhoneNo: employeeData.PhoneNo,
                EmpNo: employeeData.EmpNo,
                IdNo: employeeData.IdNo,
                OUID: employeeData.OUID,
                DateOfJoin: employeeData.DateOfJoin ? employeeData.DateOfJoin.split('T')[0] : '',
                PFNumber: employeeData.PFNumber,
                ESINumber: employeeData.ESINumber,
                AadhaarNo: employeeData.AadhaarNo,
                Address: employeeData.Address,
                ValidUpTo: employeeData.ValidUpTo ? employeeData.ValidUpTo.split('T')[0] : '',
                DepartmentID: employeeData.DepartmentID,
                DesignationID: employeeData.DesignationID,
                BatchID: employeeData.BatchID,
                CategoryID: employeeData.CategoryID,
                HolidayGroupID: employeeData.HolidayGroupID,
                Shift: employeeData.Shift,
                NonShiftGroup: employeeData.NonShiftGroup,
                LateApplicable: employeeData.LateApplicable ? 1 : 0,
                ShiftEarlyAsExtra: employeeData.ShiftEarlyAsExtra ? 1 : 0,
                SinglePunchAllowed: employeeData.SinglePunchAllowed ? 1 : 0,
                OverTimeApplicable: employeeData.OverTimeApplicable ? 1 : 0,
                CalculateWorkHour: employeeData.CalculateWorkHour,
                CreatedBy: 1,
                Weekoffs: weekoffsArray,
            });

            setSelectedShiftType(employeeData.ShiftType.toString());
        }
    }, [employeeData]);

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


    const weekoffs = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const [step, setStep] = useState(1);
    const handleShiftTypeChange = (e) => setSelectedShiftType(e.target.value);
    const handleNext = () => step < 3 && setStep(step + 1);
    const handlePrevious = () => step > 1 && setStep(step - 1);
    const [isemployeeImgModalOpen, setIsEmployeeImgModalOpen] = useState(false);
    const openModal = () => setIsEmployeeImgModalOpen(true);
    const closeModal = () => setIsEmployeeImgModalOpen(false);

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
            // If the image is a base64 string, convert it to a File object
            if (typeof image === "string" && image.startsWith("data:image")) {
                const file = base64ToFile(image, "employee_photo.jpg");
                submissionData.append("Photo", file);
            } else {
                console.error("Unsupported image format:", image);
                toast.error("Unsupported image format. Please upload a valid image.");
                return;
            }
        }
    
        try {
            // Call the update API
            const response = await updateEmployee({ id, employeeData: submissionData }).unwrap();
            toast.success(response.message); // Show success toast
            setTimeout(() => {
                navigate('/employee');
            }, 2000); // Navigate after 2 seconds
        } catch (err) {
            console.error("Error updating employee:", err);
            if (err?.data?.message) {
                toast.error(err.data.message); // Show error toast
            } else {
                toast.error("Error updating employee"); // Show generic error toast
            }
        }
    };
    const renderSelectOptions = (options) => {
        return options.length > 0 ? options.map((option, index) => (
            <option key={index} value={option.ID || option.id || option.Code || option}>
                {option.OUName || option.Name || option.name || option}
            </option>
        )) : <option>No data available</option>;
    };

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
    ];


    // Add the loading and error checks here
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading employee data</div>;
    }





    return (
        <div className='updateEmployee'>
            <Header />
            <div className='update-container'>
                <h1>{step === 1 ? "Employee Information" : step === 2 ? "Employment Details" : "Attendance Information"}</h1>
                <div className='updateEmployee-content'>
                    <div className='left-section'>
                        <div className='employee-pic'>
                            {image ? (
                                <img src={image} alt='Employee' />
                            ) : (
                                <img src={`${ImgUrl}/${employeeData.PictureName}`} alt='Employee' />
                            )}
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
                                        {shiftTypes.map((shiftType) => (
                                            <option key={shiftType.id} value={shiftType.id}>{shiftType.Name}</option>
                                        ))}
                                    </select>
                                    {selectedShiftType === '1' && (
                                        <>
                                            <label>Choose Shift:</label>
                                            <select name='Shift' value={formData.Shift} onChange={handleInputChange}>
                                                {renderSelectOptions(shifts)}
                                            </select>
                                        </>
                                    )}
                                    {selectedShiftType === '3' && (
                                        <>
                                            <label>Auto Shift Group:</label>
                                            <select name='NonShiftGroup' value={formData.NonShiftGroup} onChange={handleInputChange}>
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
                                    <select name='HolidayGroupID' value={formData.HolidayGroupID} onChange={handleInputChange}>
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
                    {step === 3 && <button onClick={handleSubmit}>Update</button>}
                </div>
            </div>
            {isemployeeImgModalOpen && <CropPhoto closeModal={closeModal} />}
        </div>
    );
};

export default UpdateEmployee;