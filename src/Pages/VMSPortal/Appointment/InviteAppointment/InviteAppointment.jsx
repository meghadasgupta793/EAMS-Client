import React, { useContext, useEffect, useState } from 'react';
import './InviteAppointment.css';
import { useNavigate } from 'react-router-dom';
import Header from '../../../../Components/Header/Header';
import CropPhoto from '../../../../Components/PhotoModal/CropPhoto/CropPhoto';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useSelector, useDispatch } from 'react-redux';
import { clearCropImage } from '../../../../Redux/slice/cropImageSlice';
import config from '../../../../secrect';
import { useSearchByVisitorMobileNoQuery, useInviteVisitorMutation } from '../../../../Redux/api/vms/vmsApi';
import { toast } from 'react-toastify';
import { UserContext } from '../../../../StoreContext/UserContext';

const InviteAppointment = () => {
    const { VisitorImgUrl } = config;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userInfo } = useContext(UserContext);
    const { UserRole, EmployeeId, id } = userInfo || {};

    // Clear crop image state on unmount
    useEffect(() => {
        return () => {
            dispatch(clearCropImage());
        };
    }, [dispatch]);

    // Get the cropped image from Redux
    const image = useSelector((state) => state.cropImage.image);

    // State for visitor details
    const [visitorDetails, setVisitorDetails] = useState({
        MobileNo: '',
        VisitorName: '',
        Email: '',
        AddressLine1: '',
        IdentityType: 'Aadhaar',
        IdentityNo: '',
        VisitorCompany: '',
        Purpose: 'Personal', // Default purpose
        image: '',
    });

    // State for mobile number input
    const [MobileNo, setMobileNo] = useState('');

    // Fetch visitor details by mobile number
    const { data: visitorData, refetch } = useSearchByVisitorMobileNoQuery(MobileNo || 'skip');

    // Update visitor details when data is fetched
    useEffect(() => {
        if (visitorData && visitorData.data && visitorData.data.length > 0) {
            const visitor = visitorData.data[0];
            setVisitorDetails((prevDetails) => ({
                ...prevDetails,
                MobileNo: visitor.MobileNo,
                VisitorName: visitor.VisitorName,
                Email: visitor.Email,
                AddressLine1: visitor.AddressLine1,
                VisitorCompany: visitor.VisitorCompany,
                IdentityType: visitor.IdentityType || 'Aadhaar',
                IdentityNo: visitor.IdentityNo,
                image: visitor.PictureName ? `${VisitorImgUrl}/${visitor.PictureName.trim()}` : '/images/profile.png',
            }));
        }
    }, [visitorData, VisitorImgUrl]);

    // State for date and time
    const [fromDate, setFromDate] = useState(getFormattedDate(new Date()));
    const [toDate, setToDate] = useState(getFormattedDate(new Date()));
    const [fromTime, setFromTime] = useState(getFormattedTime(new Date()));
    const [toTime, setToTime] = useState(getFormattedTime(new Date()));

    // Handle identity type change
    const handleIdentityTypeChange = (event) => {
        setVisitorDetails({ ...visitorDetails, IdentityType: event.target.value });
    };

    // Handle mobile number change
    const handleVisitorMobileNumberChange = (event) => {
        setMobileNo(event.target.value);
    };

    // Handle purpose change
    const handlePurposeChange = (event) => {
        setVisitorDetails({ ...visitorDetails, Purpose: event.target.value });
    };

    // Mutation for inviting a visitor
    const [inviteAppointment, { isLoading: isInviting, error: invitementError }] = useInviteVisitorMutation();

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

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate required fields
        if (!visitorDetails.MobileNo || !visitorDetails.VisitorName || !visitorDetails.Email) {
            toast.error('Please fill in all required fields.');
            return;
        }

        // Prepare the payload
        const formData = new FormData();
        formData.append('VisitorName', visitorDetails.VisitorName);
        formData.append('Email', visitorDetails.Email);
        formData.append('IdentityType', visitorDetails.IdentityType);
        formData.append('IdentityNo', visitorDetails.IdentityNo);
        formData.append('MobileNo', visitorDetails.MobileNo);
        formData.append('VisitorCompany', visitorDetails.VisitorCompany);
        formData.append('AddressLine1', visitorDetails.AddressLine1);
        formData.append('AppDateFrom', `${fromDate}T${fromTime}:00`);
        formData.append('AppDateTo', `${toDate}T${toTime}:00`);
        formData.append('Purpose', visitorDetails.Purpose);
        formData.append('CreatedByUserID', id); // Replace with actual user ID
        formData.append('AppToEmpID', EmployeeId); // Replace with actual employee ID

        // Append the photo if available
        if (image) {
            ///  let finalImage;

            // If the image is a base64 string, convert it to a File object
            if (typeof image === "string" && image.startsWith("data:image")) {
                const file = base64ToFile(image, "visitor_photo.jpg");
                // Append the image file to FormData
                formData.append('Photo', file);
            } else {
                console.error("Unsupported image format:", image);
                toast.error("Unsupported image format. Please upload a valid image.");
                return;
            }

          
        }

        try {
            // Call the API
            const response = await inviteAppointment(formData).unwrap();
            console.log('API Response:', response);
            toast.success('Visitor invited successfully!');
            setTimeout(() => navigate('/VMSDashboard'), 3000);
        } catch (error) {
            console.error('Failed to invite visitor:', error);
            toast.error('Failed to invite visitor. Please try again.');
        }
    };

    // Helper functions for date and time formatting
    function getFormattedDate(date) {
        return date.toISOString().slice(0, 10);
    }

    function getFormattedTime(date) {
        return date.toTimeString().slice(0, 5);
    }

    // State for modal visibility
    const [isemployeeImgModalOpen, setIsEmployeeImgModalOpen] = useState(false);

    // Functions to open and close the modal
    const openModal = () => setIsEmployeeImgModalOpen(true);
    const closeModal = () => setIsEmployeeImgModalOpen(false);

    return (
        <div className="invite-appointment">
            <Header />
            <div className="invite-appointment-container">
                <div className="invite-appointment-form-wrapper">
                    <h3>Invite Visitor</h3>

                    {/* Image Upload Frame */}
                    <div className="invite-appointment-image-upload-frame">
                        {image ? (
                            <img src={image} alt="visitor" />
                        ) : (
                            <img src={visitorDetails.image} alt="visitor" className="invite-appointment-uploaded-image" />
                        )}

                        <div className="invite-appointment-camera-icon" onClick={openModal}>
                            <CameraAltIcon />
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {/* Personal Info */}
                        <fieldset className="invite-appointment-personal-info">
                            <legend>Visitor Personal Info</legend>
                            <div className="invite-appointment-form-row">
                                <div className="invite-appointment-input-field">
                                    <input
                                        type="number"
                                        placeholder="Visitor Contact No"
                                        value={MobileNo}
                                        onChange={handleVisitorMobileNumberChange}
                                        required
                                    />
                                </div>
                                <div className="invite-appointment-input-field">
                                    <input
                                        type="text"
                                        placeholder="Visitor Name"
                                        value={visitorDetails.VisitorName}
                                        onChange={(e) => setVisitorDetails({ ...visitorDetails, VisitorName: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="invite-appointment-input-field">
                                    <input
                                        type="email"
                                        placeholder="Visitor Email"
                                        value={visitorDetails.Email}
                                        onChange={(e) => setVisitorDetails({ ...visitorDetails, Email: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="invite-appointment-input-field">
                                    <textarea
                                        placeholder="Visitor Address"
                                        value={visitorDetails.AddressLine1}
                                        onChange={(e) => setVisitorDetails({ ...visitorDetails, AddressLine1: e.target.value })}
                                    />
                                </div>
                            </div>
                        </fieldset>

                        {/* Visitor Other Details */}
                        <fieldset className="invite-appointment-visitor-details">
                            <legend>Visitor Other Details</legend>
                            <div className="invite-appointment-form-row">
                                <div className="invite-appointment-input-field">
                                    <select
                                        value={visitorDetails.IdentityType}
                                        onChange={handleIdentityTypeChange}
                                    >
                                        <option value="Aadhaar">Aadhaar</option>
                                        <option value="Voter">Voter</option>
                                        <option value="PAN">PAN</option>
                                    </select>
                                </div>
                                <div className="invite-appointment-input-field">
                                    <input
                                        type="text"
                                        placeholder={visitorDetails.IdentityType}
                                        value={visitorDetails.IdentityNo}
                                        onChange={(e) => setVisitorDetails({ ...visitorDetails, IdentityNo: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="invite-appointment-form-row">
                                <div className="invite-appointment-input-field">
                                    <select
                                        value={visitorDetails.Purpose}
                                        onChange={handlePurposeChange}
                                    >
                                        <option value="Personal">Personal</option>
                                        <option value="Official">Official</option>
                                    </select>
                                </div>
                                <div className="invite-appointment-input-field">
                                    <input
                                        type="text"
                                        placeholder="Visit Company Name"
                                        value={visitorDetails.VisitorCompany}
                                        onChange={(e) => setVisitorDetails({ ...visitorDetails, VisitorCompany: e.target.value })}
                                    />
                                </div>
                            </div>
                        </fieldset>

                        {/* Appointment Duration */}
                        <fieldset className="invite-appointment-duration">
                            <legend>Appointment Duration</legend>
                            <div className="invite-appointment-form-row">
                                <div className="invite-appointment-input-field">
                                    <label htmlFor="from-date">From Date</label>
                                    <input
                                        type="date"
                                        value={fromDate}
                                        onChange={(e) => setFromDate(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="invite-appointment-input-field">
                                    <label htmlFor="to-date">To Date</label>
                                    <input
                                        type="date"
                                        value={toDate}
                                        onChange={(e) => setToDate(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="invite-appointment-form-row">
                                <div className="invite-appointment-input-field">
                                    <label htmlFor="from-time">From Time</label>
                                    <input
                                        type="time"
                                        value={fromTime}
                                        onChange={(e) => setFromTime(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="invite-appointment-input-field">
                                    <label htmlFor="to-time">To Time</label>
                                    <input
                                        type="time"
                                        value={toTime}
                                        onChange={(e) => setToTime(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </fieldset>

                        <div className="invite-appointment-btn-container">
                            <button type="submit" className="invite-appointment-submit-btn" disabled={isInviting}>
                                {isInviting ? 'Inviting...' : 'Invite'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Render the modal conditionally */}
            {isemployeeImgModalOpen && <CropPhoto closeModal={closeModal} />}
        </div>
    );
};

export default InviteAppointment;