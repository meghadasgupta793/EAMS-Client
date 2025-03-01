import React, { useState, useEffect } from 'react';
import './createEmployee.css';
import Header from '../../Header/Header';
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
import { useCreateEmployeeMutation } from '../../../Redux/api/admin/employeeApi';

const CreateEmployee = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        return () => {
            dispatch(clearCropImage());
        };
    }, [dispatch]);

    const image = useSelector((state) => state.cropImage.image);
    const [createEmployee, { isLoading }] = useCreateEmployeeMutation();

    const { data: departmentData } = useGetAllDepartmentQuery();
    const { data: designationsData } = useGetAllDesignationQuery();
    const { data: batchesData } = useGetAllBatchQuery();
    const { data: categoriesData } = useGetAllCategoryQuery();
    const { data: organizationsData } = useGetAllOuQuery();
    const { data: holidayGroupsData } = useGetAllHolidayGroupQuery();
    const { data: shiftData } = useGetAllShiftsQuery();
    const { data: autoShiftData } = useGetAllAutoShiftGroupQuery();

    const departments = departmentData?.data || [];
    const designations = designationsData?.data || [];
    const batches = batchesData?.data || [];
    const categories = categoriesData?.data || [];
    const organizations = organizationsData?.data || [];
    const holidayGroups = holidayGroupsData?.data || [];
    const shifts = shiftData?.data || [];
    const autoShiftGroups = autoShiftData?.data || [];

    const shiftTypes = [
        { id: 1, Name: "Fixed" },
        { id: 2, Name: "Flexi" },
        { id: 3, Name: "Auto" }
    ];

    const weekoffs = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        EmployeeName: "",
        Email: "",
        PhoneNo: "",
        EmpNo: "",
        IdNo: "",
        OUID: "",
        ValidUpTo: "",
        DepartmentId: "",
        DesignationID: "",
        BatchID: "",
        CategoryID: "",
        Address: "",
        PFNumber: "",
        ESINumber: "",
        AadhaarNo: "",
        ShiftType: "1",
        Shift: "",
        HolidayGroupID: "",
        Photo: null,
    });

    const [selectedWeekoffs, setSelectedWeekoffs] = useState([]);
    const [isemployeeImgModalOpen, setIsEmployeeImgModalOpen] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleWeekoffChange = (day) => {
        setSelectedWeekoffs((prev) =>
            prev.includes(day) ? prev.filter((weekoff) => weekoff !== day) : [...prev, day]
        );
    };

    const handleShiftTypeChange = (e) => {
        setFormData((prev) => ({ ...prev, ShiftType: e.target.value }));
    };

    const handleNext = () => step < 3 && setStep(step + 1);
    const handlePrevious = () => step > 1 && setStep(step - 1);

    const openModal = () => setIsEmployeeImgModalOpen(true);
    const closeModal = () => setIsEmployeeImgModalOpen(false);

    const handleFileChange = (e) => {
        setFormData((prev) => ({ ...prev, Photo: e.target.files[0] }));
    };

    const handleSubmit = async () => {
        const submissionData = new FormData();
        Object.keys(formData).forEach((key) => {
            submissionData.append(key, formData[key]);
        });

        submissionData.append("AltShiftWO", selectedWeekoffs.join(""));

        if (image) {
            submissionData.append("PictureName", "employee_photo.jpg");
        }

        try {
            await createEmployee(submissionData);
            alert("Employee created successfully!");
        } catch (err) {
            alert("Error creating employee!");
        }
    };

    const renderSelectOptions = (options) => {
        return options.length > 0 ? (
            options.map((option) => (
                <option key={option.ID} value={option.ID}>
                    {option.OUName || option.Name || option.name}
                </option>
            ))
        ) : (
            <option>No data available</option>
        );
    };

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
                            <input type="file" onChange={handleFileChange} />
                        </div>
                    </div>
                    <div className='right-section'>
                        {step === 1 && (
                            <>
                                <label>Employee Name:</label>
                                <input type='text' name='EmployeeName' value={formData.EmployeeName} onChange={handleInputChange} />

                                <label>Email:</label>
                                <input type='email' name='Email' value={formData.Email} onChange={handleInputChange} />

                                <label>Phone No:</label>
                                <input type='tel' name='PhoneNo' value={formData.PhoneNo} onChange={handleInputChange} />

                                <label>Organization:</label>
                                <select name='OUID' value={formData.OUID} onChange={handleInputChange}>
                                    {renderSelectOptions(organizations)}
                                </select>
                            </>
                        )}

                        {step === 3 && (
                            <>
                                <label>Shift Type:</label>
                                <select name='ShiftType' value={formData.ShiftType} onChange={handleShiftTypeChange}>
                                    {shiftTypes.map((shiftType) => (
                                        <option key={shiftType.id} value={shiftType.id}>
                                            {shiftType.Name}
                                        </option>
                                    ))}
                                </select>

                                <label>Weekoff:</label>
                                {weekoffs.map((day) => (
                                    <div key={day} className='day-checkbox'>
                                        <span>{day}</span>
                                        <input
                                            type='checkbox'
                                            name='Weekoffs'
                                            value={day}
                                            checked={formData.Weekoffs.includes(day)}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </div>

                <div className='buttons'>
                    {step > 1 && <button onClick={handlePrevious}>Previous</button>}
                    {step < 3 && <button onClick={handleNext}>Next</button>}
                    {step === 3 && <button onClick={handleSubmit} disabled={isLoading}>Create</button>}
                </div>
            </div>
            {isemployeeImgModalOpen && <CropPhoto closeModal={closeModal} />}
        </div>
    );
};

export default CreateEmployee;
