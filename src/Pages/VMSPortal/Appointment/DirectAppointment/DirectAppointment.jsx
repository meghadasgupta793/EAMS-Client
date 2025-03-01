import React, { useState, useEffect } from 'react';
import './DirectAppointment.css';
import Header from '../../../../Components/Header/Header';
import Select from 'react-select';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CropPhoto from '../../../../Components/PhotoModal/CropPhoto/CropPhoto';
import { useSelector, useDispatch } from 'react-redux';
import { clearCropImage } from '../../../../Redux/slice/cropImageSlice';
import { useCreateAppointmentMutation, useSearchByVisitorMobileNoQuery } from '../../../../Redux/api/vms/vmsApi';
import { skipToken } from '@reduxjs/toolkit/query';
import config from '../../../../secrect';
import { useGetAllEmployeesQuery } from '../../../../Redux/api/admin/employeeApi';

// Utility functions to format date and time
const getFormattedDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const getFormattedTime = (date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
};

const DirectAppointment = () => {
    const { ImgUrl, VisitorImgUrl } = config;
    const dispatch = useDispatch();
    const image = useSelector((state) => state.cropImage.image); // Access image from Redux state

    useEffect(() => {
        return () => {
            dispatch(clearCropImage());
        };
    }, [dispatch]);

    const [MobileNo, setMobileNo] = useState('');
    const { data: visitorData, refetch } = useSearchByVisitorMobileNoQuery(MobileNo || skipToken);
    const { data: employeeData, error: employeeError, isLoading: isEmployeeLoading } = useGetAllEmployeesQuery();

    // Mutation hook for creating an appointment
    const [createAppointment, { isLoading: isCreatingAppointment, error: createAppointmentError }] = useCreateAppointmentMutation();

    // Safely access employee data
    const employees = employeeData?.data || [];

    useEffect(() => {
        if (visitorData && visitorData.data && visitorData.data.length > 0) {
            const visitor = visitorData.data[0];
            setFormData((prevFormData) => ({
                ...prevFormData,
                MobileNo: visitor.MobileNo, // Update MobileNo in formData
                VisitorName: visitor.VisitorName,
                Email: visitor.Email,
                Address: visitor.AddressLine1,
                VisitorCompany: visitor.VisitorCompany,
                image: visitor.PictureName ? `${VisitorImgUrl}/${visitor.PictureName.trim()}` : '/images/profile.png',
            }));
        }
    }, [visitorData, VisitorImgUrl]);

    // Update formData when the Redux image changes
    useEffect(() => {
        if (image) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                image: image, // Update image in formData
            }));
        }
    }, [image]);

    const handleVisitorMobileNumberChange = (event) => {
        const mobileNumber = event.target.value;
        setMobileNo(mobileNumber); // Update MobileNo state
        setFormData((prevFormData) => ({
            ...prevFormData,
            MobileNo: mobileNumber, // Update MobileNo in formData
        }));
    };

    const handleVisitorMobileNumberBlur = async () => {
        try {
            await refetch();
        } catch (error) {
            console.error('Error fetching visitor details:', error);
        }
    };

    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const currentDate = new Date();
    const futureDate = new Date(currentDate.getTime() + 2 * 60 * 60 * 1000); // 2 hours later

    const [formData, setFormData] = useState({
        MobileNo: '', // Initialize MobileNo
        VisitorName: '',
        Email: '',
        Address: '',
        IdentityType: 'Aadhaar', // Initialize IdentityType
        IdentityNo: '',
        Purpose: 'Personal',
        cameFrom: 'Individual',
        VisitorCompany: '',
        Reason: '', // Add Reason field
        fromDate: getFormattedDate(currentDate),
        toDate: getFormattedDate(currentDate),
        fromTime: getFormattedTime(currentDate),
        toTime: getFormattedTime(futureDate),
        AppToEmpID: null, // Initialize AppToEmpID
        image: null, // Initialize image as null
    });

    // Handle Identity Type Change
    const handleIdentityTypeChange = (event) => {
        const { value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            IdentityType: value,
        }));
    };

    // Map employees to the required format for the Select component
    const filteredEmployees = employees.map((employee) => ({
        label: employee.EmployeeName,
        value: employee.id,
        EmployeeName: employee.EmployeeName,
        Department: employee.DepartmentName, // Use DepartmentName from the API response
    }));

    const handleEmployeeChange = (selectedOption) => {
        setSelectedEmployee(selectedOption);
        setFormData((prevFormData) => ({
            ...prevFormData,
            AppToEmpID: selectedOption ? selectedOption.value : null, // Update AppToEmpID
            employeeDepartment: selectedOption ? selectedOption.Department : '', // Update department
        }));
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                image: file, // Store the file object
            }));
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const base64ToFile = (base64String, filename) => {
        const arr = base64String.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, { type: mime });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // ✅ Initialize FormData before using it
            const formDataToSend = new FormData();
            const formatDateTime = (date, time) => `${date}T${time}:00`;

            // Append all fields as per the cURL structure
            formDataToSend.append('VisitorName', formData.VisitorName);
            formDataToSend.append('Email', formData.Email);
            formDataToSend.append('IdentityType', formData.IdentityType);
            formDataToSend.append('IdentityNo', formData.IdentityNo);
            formDataToSend.append('MobileNo', formData.MobileNo);
            formDataToSend.append('Address', formData.Address); // Adjusted key
            formDataToSend.append('Purpose', formData.Purpose);
            formDataToSend.append('VisitorCompany', formData.VisitorCompany);
            formDataToSend.append('Reason', formData.Reason);
            formDataToSend.append('CreatedByUserID', '1'); // Replace with dynamic ID if needed
            formDataToSend.append('AppToEmpID', formData.AppToEmpID);
            formDataToSend.append('AppDateFrom', formatDateTime(formData.fromDate, formData.fromTime));
            formDataToSend.append('AppDateTo', formatDateTime(formData.toDate, formData.toTime));


            // Handle Image (Base64 to File if needed)
            if (formData.image) {
                const isBase64 = typeof formData.image === 'string' && formData.image.startsWith('data:image');
                if (isBase64) {
                    const file = base64ToFile(formData.image, 'visitor_image.png');
                    formDataToSend.append('Photo', file);
                } else {
                    formDataToSend.append('Photo', formData.image);
                }
            }

            // Submit the form
            const response = await createAppointment(formDataToSend).unwrap();
            console.log('Appointment created successfully:', response);

            // Reset form after success
            setFormData({
                MobileNo: '',
                VisitorName: '',
                Email: '',
                Address: '',
                IdentityType: 'Aadhaar',
                IdentityNo: '',
                Purpose: 'Personal',
                cameFrom: 'Individual',
                VisitorCompany: '',
                Reason: '',
                fromDate: getFormattedDate(new Date()),
                toDate: getFormattedDate(new Date()),
                fromTime: getFormattedTime(new Date()),
                toTime: getFormattedTime(new Date(new Date().getTime() + 2 * 60 * 60 * 1000)),
                AppToEmpID: null,
                image: null,
            });
            setSelectedEmployee(null);
            setMobileNo('');
        } catch (error) {
            console.error('Error creating appointment:', error);
        }
    };


    const [isemployeeImgModalOpen, setIsEmployeeImgModalOpen] = useState(false);
    const openModal = () => setIsEmployeeImgModalOpen(true);
    const closeModal = () => setIsEmployeeImgModalOpen(false);

    return (
        <>
            <div className="direct-appointment">
                <Header />
                <div className="direct-appointment-container">
                    <div className="direct-appointment-form-wrapper">
                        <h3 className="direct-appointment-heading">Direct Appointment</h3>
                        <div className="direct-appointment-image-upload-frame">
                            {formData.image ? (
                                <img src={formData.image} alt="visitor" />
                            ) : (
                                <img src="/images/profile.png" alt="visitor" />
                            )}
                            <div className="direct-appointment-camera-icon" onClick={openModal}>
                                <CameraAltIcon />
                            </div>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <fieldset>
                                <legend>Visitor Personal Info</legend>
                                <div className="direct-appointment-form-row">
                                    <div className="direct-appointment-input-field">
                                        <input
                                            type="text"
                                            name="MobileNo"
                                            value={formData.MobileNo}
                                            onChange={handleVisitorMobileNumberChange}
                                            onBlur={handleVisitorMobileNumberBlur}
                                            placeholder="Visitor Mobile Number"
                                            required
                                        />
                                    </div>
                                    <div className="direct-appointment-input-field">
                                        <input
                                            type="text"
                                            name="VisitorName"
                                            value={formData.VisitorName}
                                            onChange={handleInputChange}
                                            placeholder="Visitor Name"
                                            required
                                        />
                                    </div>
                                    <div className="direct-appointment-input-field">
                                        <input
                                            type="email"
                                            name="Email"
                                            value={formData.Email}
                                            onChange={handleInputChange}
                                            placeholder="Visitor Email"
                                            required
                                        />
                                    </div>
                                    <div className="direct-appointment-input-field">
                                        <textarea
                                            name="Address"
                                            value={formData.Address}
                                            onChange={handleInputChange}
                                            placeholder="Visitor Address"
                                            required
                                        />
                                    </div>
                                </div>
                            </fieldset>

                            <fieldset>
                                <legend>Visitor Other Details</legend>
                                <div className="direct-appointment-form-row">
                                    <div className="direct-appointment-input-field">
                                        <select
                                            name="IdentityType"
                                            value={formData.IdentityType}
                                            onChange={handleIdentityTypeChange}
                                        >
                                            <option value="Aadhaar">Aadhaar</option>
                                            <option value="Voter">Voter</option>
                                            <option value="PAN">PAN</option>
                                        </select>
                                    </div>
                                    <div className="direct-appointment-input-field">
                                        <input
                                            type="text"
                                            name="IdentityNo"
                                            value={formData.IdentityNo}
                                            onChange={handleInputChange}
                                            placeholder={formData.IdentityType}
                                            required
                                        />
                                    </div>
                                </div>
                            </fieldset>

                            <fieldset>
                                <legend>Visit Purpose and Came From</legend>
                                <div className="direct-appointment-form-row">
                                    <div className="direct-appointment-input-field">
                                        <select
                                            name="cameFrom"
                                            value={formData.cameFrom}
                                            onChange={handleInputChange}
                                        >
                                            <option value="Individual">Individual</option>
                                            <option value="Company">Company</option>
                                        </select>
                                    </div>
                                    <div className="direct-appointment-input-field">
                                        <input
                                            type="text"
                                            name="VisitorCompany"
                                            value={formData.VisitorCompany}
                                            onChange={handleInputChange}
                                            placeholder="Enter Company Name"
                                        />
                                    </div>
                                    <div className="direct-appointment-input-field">
                                        <textarea
                                            name="Reason"
                                            value={formData.Reason}
                                            onChange={handleInputChange}
                                            placeholder="Enter Reason"
                                        />
                                    </div>
                                </div>
                            </fieldset>

                            <fieldset>
                                <legend>Appointment Duration</legend>
                                <div className="direct-appointment-form-row">
                                    <div className="direct-appointment-input-field">
                                        <input
                                            type="date"
                                            name="fromDate"
                                            value={formData.fromDate}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="direct-appointment-input-field">
                                        <input
                                            type="date"
                                            name="toDate"
                                            value={formData.toDate}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="direct-appointment-input-field">
                                        <input
                                            type="time"
                                            name="fromTime"
                                            value={formData.fromTime}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="direct-appointment-input-field">
                                        <input
                                            type="time"
                                            name="toTime"
                                            value={formData.toTime}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </fieldset>

                            <fieldset>
                                <legend>Host</legend>
                                <div className="direct-appointment-form-row">
                                    <div className="direct-appointment-input-field">
                                        <Select
                                            options={filteredEmployees}
                                            value={selectedEmployee}
                                            onChange={handleEmployeeChange}
                                            getOptionLabel={(option) => option.EmployeeName}
                                            getOptionValue={(option) => option.value}
                                            className="react-select-container"
                                            classNamePrefix="react-select"
                                            placeholder="Search Employee Name"
                                            isLoading={isEmployeeLoading} // Show loading state
                                        />
                                    </div>
                                    <div className="direct-appointment-input-field">
                                        <input
                                            type="text"
                                            value={selectedEmployee?.Department || ''}
                                            readOnly
                                            placeholder="Employee Department"
                                        />
                                    </div>
                                </div>
                            </fieldset>

                            <div className="direct-appointment-btn-container">
                                <button
                                    type="submit"
                                    className="create-appointment-btn"
                                    disabled={isCreatingAppointment} // Disable button while loading
                                >
                                    {isCreatingAppointment ? 'Creating...' : 'Create Appointment'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                {isemployeeImgModalOpen && <CropPhoto closeModal={closeModal} />}
            </div>
        </>
    );
};

export default DirectAppointment;