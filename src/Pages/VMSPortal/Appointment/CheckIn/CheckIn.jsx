import React, { useEffect, useState } from 'react';
import './CheckIn.css';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../../../Components/Header/Header';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CropPhoto from '../../../../Components/PhotoModal/CropPhoto/CropPhoto';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'; // Correct import of useDispatch
import { clearCropImage } from '../../../../Redux/slice/cropImageSlice';
import config from '../../../../secrect';
import { useAppointmentDetailsByidQuery, useCheckInAppointmentMutation } from '../../../../Redux/api/vms/vmsApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CheckIn = () => {
    const { AppointmentId } = useParams(); // Get appointment ID from URL
    const navigate = useNavigate();
    const dispatch = useDispatch(); // Create dispatch function
    const { ImgUrl, VisitorImgUrl } = config;

    // Clear cropped image when component unmounts
    useEffect(() => {
        return () => {
            dispatch(clearCropImage());
        };
    }, [dispatch]);

    const VisitorPhoto = useSelector((state) => state.cropImage.image); // Get cropped image from Redux store

    // State for modal visibility
    const [isemployeeImgModalOpen, setIsEmployeeImgModalOpen] = useState(false);
    const openModal = () => setIsEmployeeImgModalOpen(true);
    const closeModal = () => setIsEmployeeImgModalOpen(false);

    // Fetch appointment details
    const { data: appointmentData, isAppoLoading, isAppoError } = useAppointmentDetailsByidQuery(AppointmentId);
    const [checkInAppointment, { isLoading, isError }] = useCheckInAppointmentMutation();

    // State for visitor details
    const [visitorDetails, setVisitorDetails] = useState({
        VisitorName: '',
        MobileNo: '',
        Email: '',
        Gender: '',
        IdentityType: '',
        IdentityNo: '',
        VisitorCompany: '',
        VisitorPhoto: '',
    });

    // State for appointment details
    const [appointmentDetails, setAppointmentDetails] = useState({
        EmployeeName: '',
        Purpose: '',
        PhoneNo: '',
        Department: '',
        StartTime: '',
        EndTime: '',
        EmployeePhoto: '',
    });

    // State for additional information
    const [aditionalInfo, setAditionalInfo] = useState({
        VehicleType: '',
        VehicleNumber: '',
        BelongingType: '',
        BelongingDescription: '',
        AdditionalPerson: '',
        AdditionalPersonNames: '',
    });

    // Populate form fields with fetched data
    useEffect(() => {
        if (appointmentData?.data?.length > 0) {
            const data = appointmentData.data[0];
            setVisitorDetails({
                VisitorName: data.VisitorName || '',
                MobileNo: data.MobileNo || '',
                Email: data.Email || '',
                Gender: data.Gender || '',
                IdentityType: data.IdentityType?.trim() || '',
                IdentityNo: data.IdentityNo || '',
                VisitorCompany: data.VisitorCompany || '',
                VisitorPhoto: data.VisitorPhoto ? `${VisitorImgUrl}/${data.VisitorPhoto.trim()}` : '/images/profile.png',
            });

            setAppointmentDetails({
                EmployeeName: data.EmployeeName || '',
                Purpose: data.Purpose || '',
                PhoneNo: data.PhoneNo || '',
                Department: data.Department || '',
                StartTime: data.StartTime || '',
                EndTime: data.EndTime || '',
                EmployeePhoto: data.EmployeePhoto || '',
            });
        }
    }, [appointmentData]);

    // Update visitor photo when the Redux image changes
    useEffect(() => {
        if (VisitorPhoto) {
            setVisitorDetails((prevFormData) => ({
                ...prevFormData,
                VisitorPhoto: VisitorPhoto, // Update image in formData
            }));
        }
    }, [VisitorPhoto]);

    // Convert base64 image to file
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

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('AppointmentId', AppointmentId);
        formData.append('VisitorName', visitorDetails.VisitorName);
        formData.append('Email', visitorDetails.Email);
        formData.append('IdentityType', visitorDetails.IdentityType);
        formData.append('IdentityNo', visitorDetails.IdentityNo);
        formData.append('MobileNo', visitorDetails.MobileNo);
        formData.append('VisitorCompany', visitorDetails.VisitorCompany);
        formData.append('Gender', visitorDetails.Gender);
        formData.append('VehicleTypeID', aditionalInfo.VehicleType);
        formData.append('VehicleNo', aditionalInfo.VehicleNumber);
        formData.append('AdditionalVisitorCount', aditionalInfo.AdditionalPerson);
        formData.append('AdditionalVisitorName', aditionalInfo.AdditionalPersonNames);
        formData.append('BelongingType', aditionalInfo.BelongingType);
        formData.append('BelongingDescription', aditionalInfo.BelongingDescription);
        formData.append('CheckInByUserID', '1'); // Hardcoded for now

        // Handle Image (Base64 to File if needed)
        if (visitorDetails.VisitorPhoto) {
            const isBase64 = typeof visitorDetails.VisitorPhoto === 'string' && visitorDetails.VisitorPhoto.startsWith('data:image');
            if (isBase64) {
                const file = base64ToFile(visitorDetails.VisitorPhoto, 'visitor_image.png');
                formData.append('Photo', file);
            } else {
                formData.append('Photo', visitorDetails.VisitorPhoto);
            }
        }

        try {
            const result = await checkInAppointment(formData).unwrap();
            console.log("Check-in successful: ", result);
            toast.success('CheckIn successfully!');
            setTimeout(() => navigate('/VMSDashboard'), 3000); // Navigate to success page or perform other actions upon successful check-in
        } catch (error) {
            toast.error('Failed to check in.');
            console.error("Failed to check in: ", error);
        }
    };

    if (isAppoLoading) return <div>Loading...</div>;
    if (isAppoError) return <div>Error fetching appointment details</div>;

    return (
        <div className='checkIn'>
            <Header />
            <div className='checkIn-container'>
                <h3 className='checkIn-heading'>Check In The Appointment</h3>
                <form onSubmit={handleSubmit}>
                    {/* Visitor Details Form */}
                    <fieldset>
                        <legend>Visitor Details</legend>
                        <div className="checkIn-form">
                            {/* Left Side - Visitor Photo */}
                            <div className="checkIn-photo">
                                <div className="checkIn-frame">
                                    {visitorDetails.VisitorPhoto ? (
                                        <img src={visitorDetails.VisitorPhoto} alt='visitor' />
                                    ) : (
                                        <img src='/images/profile.png' alt='visitor' />
                                    )}
                                    <div className='camera-icon' onClick={openModal}>
                                        <CameraAltIcon />
                                    </div>
                                </div>
                            </div>
                            {/* Right Side - Visitor Details Form */}
                            <div className="checkIn-form-fields">
                                <div className="checkIn-input-field">
                                    <input
                                        type="text"
                                        placeholder="Enter visitor name"
                                        value={visitorDetails.VisitorName}
                                        onChange={(e) => setVisitorDetails({ ...visitorDetails, VisitorName: e.target.value })}
                                    />
                                </div>
                                <div className="checkIn-input-field">
                                    <input
                                        type="text"
                                        placeholder="Enter contact number"
                                        value={visitorDetails.MobileNo}
                                        onChange={(e) => setVisitorDetails({ ...visitorDetails, MobileNo: e.target.value })}
                                    />
                                </div>
                                <div className="checkIn-input-field">
                                    <input
                                        type="email"
                                        placeholder="Enter email ID"
                                        value={visitorDetails.Email}
                                        onChange={(e) => setVisitorDetails({ ...visitorDetails, Email: e.target.value })}
                                    />
                                </div>
                                <div className="checkIn-input-field">
                                    <select
                                        value={visitorDetails.Gender}
                                        onChange={(e) => setVisitorDetails({ ...visitorDetails, Gender: e.target.value })}
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div className="checkIn-input-field">
                                    <select
                                        value={visitorDetails.IdentityType}
                                        onChange={(e) => setVisitorDetails({ ...visitorDetails, IdentityType: e.target.value })}
                                    >
                                        <option value="">Select Identity Type</option>
                                        <option value="Adhaar">Aadhaar</option>
                                        <option value="PAN">PAN</option>
                                        <option value="Voter">Voter ID</option>
                                    </select>
                                </div>
                                <div className="checkIn-input-field">
                                    <input
                                        type="text"
                                        placeholder="Enter identity number"
                                        value={visitorDetails.IdentityNo}
                                        onChange={(e) => setVisitorDetails({ ...visitorDetails, IdentityNo: e.target.value })}
                                    />
                                </div>
                                <div className="checkIn-input-field">
                                    <input
                                        type="text"
                                        placeholder="Enter company name"
                                        value={visitorDetails.VisitorCompany}
                                        onChange={(e) => setVisitorDetails({ ...visitorDetails, VisitorCompany: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                    </fieldset>

                    {/* Appointment Details Form */}
                    <fieldset>
                        <legend>Appointment Details</legend>
                        <div className="checkIn-form">
                            {/* Left Side - Host Photo */}
                            <div className="checkIn-photo">
                                <div className="checkIn-frame">
                                    {appointmentDetails.EmployeePhoto ? (
                                        <img src={appointmentDetails.EmployeePhoto} alt='visitor' />
                                    ) : (
                                        <img src='/images/profile.png' alt='visitor' />
                                    )}
                                </div>
                            </div>

                            {/* Right Side - Appointment Details Form */}
                            <div className="checkIn-form-fields">
                                <div className="checkIn-input-field">
                                    <input
                                        type="text"
                                        placeholder="Enter host name"
                                        value={appointmentDetails.EmployeeName}
                                        onChange={(e) => setAppointmentDetails({ ...appointmentDetails, EmployeeName: e.target.value })}
                                    />
                                </div>
                                <div className="checkIn-input-field">
                                    <input
                                        type="text"
                                        placeholder="Enter visit purpose"
                                        value={appointmentDetails.Purpose}
                                        onChange={(e) => setAppointmentDetails({ ...appointmentDetails, Purpose: e.target.value })}
                                    />
                                </div>
                                <div className="checkIn-input-field">
                                    <input
                                        type="text"
                                        placeholder="Enter host contact number"
                                        value={appointmentDetails.PhoneNo}
                                        onChange={(e) => setAppointmentDetails({ ...appointmentDetails, PhoneNo: e.target.value })}
                                    />
                                </div>
                                <div className="checkIn-input-field">
                                    <input
                                        type="text"
                                        placeholder="Enter host department"
                                        value={appointmentDetails.Department}
                                        onChange={(e) => setAppointmentDetails({ ...appointmentDetails, Department: e.target.value })}
                                    />
                                </div>
                                <div className="checkIn-input-field">
                                    <input
                                        type="time"
                                        placeholder="Appointment start"
                                        value={appointmentDetails.StartTime}
                                        onChange={(e) => setAppointmentDetails({ ...appointmentDetails, StartTime: e.target.value })}
                                    />
                                </div>
                                <div className="checkIn-input-field">
                                    <input
                                        type="time"
                                        placeholder="Appointment end"
                                        value={appointmentDetails.EndTime}
                                        onChange={(e) => setAppointmentDetails({ ...appointmentDetails, EndTime: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                    </fieldset>

                    {/* Additional Information Form */}
                    <fieldset>
                        <legend>Additional Information</legend>
                        <div className="checkIn-form-fields">
                            <div className="checkIn-input-field">
                                <select
                                    value={aditionalInfo.VehicleType}
                                    onChange={(e) => setAditionalInfo({ ...aditionalInfo, VehicleType: e.target.value })}
                                >
                                    <option value="">Select Vehicle Type</option>
                                    <option value="two-wheeler">Two Wheeler</option>
                                    <option value="four-wheeler">Four Wheeler</option>
                                </select>
                            </div>
                            <div className="checkIn-input-field">
                                <input
                                    type="text"
                                    placeholder="Enter Vehicle Number"
                                    value={aditionalInfo.VehicleNumber}
                                    onChange={(e) => setAditionalInfo({ ...aditionalInfo, VehicleNumber: e.target.value })}
                                />
                            </div>
                            <div className="checkIn-input-field">
                                <select
                                    value={aditionalInfo.BelongingType}
                                    onChange={(e) => setAditionalInfo({ ...aditionalInfo, BelongingType: e.target.value })}
                                >
                                    <option value="">Select Belonging Type</option>
                                    <option value="laptop">Laptop</option>
                                    <option value="toolkit">Toolkit</option>
                                    <option value="others">Others</option>
                                </select>
                            </div>
                            <div className="checkIn-input-field">
                                <input
                                    type="text"
                                    placeholder="Enter Tool description"
                                    value={aditionalInfo.BelongingDescription}
                                    onChange={(e) => setAditionalInfo({ ...aditionalInfo, BelongingDescription: e.target.value })}
                                />
                            </div>
                            <div className="checkIn-input-field">
                                <input
                                    type="number"
                                    placeholder="Enter Additional Person Count"
                                    value={aditionalInfo.AdditionalPerson}
                                    onChange={(e) => setAditionalInfo({ ...aditionalInfo, AdditionalPerson: e.target.value })}
                                />
                            </div>
                            <div className="checkIn-input-field">
                                <input
                                    type="text"
                                    placeholder="Enter Additional Person Name"
                                    value={aditionalInfo.AdditionalPersonNames}
                                    onChange={(e) => setAditionalInfo({ ...aditionalInfo, AdditionalPersonNames: e.target.value })}
                                />
                            </div>
                        </div>
                    </fieldset>

                    <button className='checkIn-btn' type="submit">CheckIn</button>
                </form>
            </div>
            {/* Render the modal conditionally */}
            {isemployeeImgModalOpen && <CropPhoto closeModal={closeModal} />}
        </div>
    );
};

export default CheckIn;