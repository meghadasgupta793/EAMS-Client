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
        Purpose: 'Personal',
        image: '/images/profile.png',
    });

    // State for modal visibility
    const [isemployeeImgModalOpen, setIsEmployeeImgModalOpen] = useState(false);

    // Fetch visitor details by mobile number
    const { data: visitorData, refetch } = useSearchByVisitorMobileNoQuery(visitorDetails.MobileNo || 'skip');

    // Update visitor details when data is fetched
    useEffect(() => {
        if (visitorData && visitorData.data && visitorData.data.length > 0) {
            const visitor = visitorData.data[0];
            setVisitorDetails((prevDetails) => ({
                ...prevDetails,
                VisitorName: visitor.VisitorName || '',
                Email: visitor.Email || '',
                AddressLine1: visitor.AddressLine1 || '',
                VisitorCompany: visitor.VisitorCompany || '',
                IdentityType: visitor.IdentityType || 'Aadhaar',
                IdentityNo: visitor.IdentityNo || '',
                image: visitor.PictureName ? `${VisitorImgUrl}/${visitor.PictureName.trim()}` : '/images/profile.png',
            }));
        }
    }, [visitorData, VisitorImgUrl]);

    // State for date and time
    const [fromDate, setFromDate] = useState(getFormattedDate(new Date()));
    const [toDate, setToDate] = useState(getFormattedDate(new Date()));
    const [fromTime, setFromTime] = useState(getFormattedTime(new Date()));
    const [toTime, setToTime] = useState(getFormattedTime(new Date()));

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setVisitorDetails(prev => ({ ...prev, [name]: value }));
    };

    // Handle blur event for mobile number input
    const handleMobileNoBlur = () => {
        if (visitorDetails.MobileNo) {
            refetch();
        }
    };

    // Mutation for inviting a visitor
    const [inviteAppointment, { isLoading: isInviting }] = useInviteVisitorMutation();

    // Utility function to convert base64 to File
    const base64ToFile = (base64String, fileName) => {
        try {
            const arr = base64String.split(',');
            const mime = arr[0].match(/:(.*?);/)[1];
            const bstr = atob(arr[1]);
            let n = bstr.length;
            const u8arr = new Uint8Array(n);
            
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            
            return new File([u8arr], fileName, { type: mime });
        } catch (error) {
            console.error('Error converting base64 to file:', error);
            return null;
        }
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validation
        if (!visitorDetails.MobileNo) {
            toast.error('Please enter mobile number');
            return;
        }
        if (!visitorDetails.VisitorName) {
            toast.error('Please enter visitor name');
            return;
        }
        if (!visitorDetails.Email) {
            toast.error('Please enter email');
            return;
        }
        if (!/^\S+@\S+\.\S+$/.test(visitorDetails.Email)) {
            toast.error('Please enter a valid email');
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
        formData.append('CreatedByUserID', id);
        formData.append('AppToEmpID', EmployeeId);

        // Append the photo if available
        if (image) {
            const file = base64ToFile(image, "visitor_photo.jpg");
            if (file) {
                formData.append('Photo', file);
            } else {
                toast.error("Failed to process image. Please try again.");
                return;
            }
        }

        try {
            const response = await inviteAppointment(formData).unwrap();
            console.log('API Response:', response);
            toast.success('Visitor invited successfully!');
            setTimeout(() => navigate('/VMSDashboard'), 3000);
        } catch (error) {
            console.error('API Error:', error);
            toast.error(error.data?.message || 'Failed to invite visitor. Please try again.');
        }
    };

    // Helper functions for date and time formatting
    function getFormattedDate(date) {
        return date.toISOString().slice(0, 10);
    }

    function getFormattedTime(date) {
        return date.toTimeString().slice(0, 5);
    }

    // Modal functions
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
                        <img 
                            src={image || visitorDetails.image} 
                            alt="visitor" 
                            className="invite-appointment-uploaded-image" 
                        />
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
                                        name="MobileNo"
                                        placeholder="Visitor Contact No"
                                        value={visitorDetails.MobileNo}
                                        onChange={handleInputChange}
                                        onBlur={handleMobileNoBlur}
                                        required
                                    />
                                </div>
                                <div className="invite-appointment-input-field">
                                    <input
                                        type="text"
                                        name="VisitorName"
                                        placeholder="Visitor Name"
                                        value={visitorDetails.VisitorName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="invite-appointment-input-field">
                                    <input
                                        type="email"
                                        name="Email"
                                        placeholder="Visitor Email"
                                        value={visitorDetails.Email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="invite-appointment-input-field">
                                    <textarea
                                        name="AddressLine1"
                                        placeholder="Visitor Address"
                                        value={visitorDetails.AddressLine1}
                                        onChange={handleInputChange}
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
                                        name="IdentityType"
                                        value={visitorDetails.IdentityType}
                                        onChange={handleInputChange}
                                    >
                                        <option value="Aadhaar">Aadhaar</option>
                                        <option value="Voter">Voter</option>
                                        <option value="PAN">PAN</option>
                                    </select>
                                </div>
                                <div className="invite-appointment-input-field">
                                    <input
                                        type="text"
                                        name="IdentityNo"
                                        placeholder={visitorDetails.IdentityType}
                                        value={visitorDetails.IdentityNo}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="invite-appointment-form-row">
                                <div className="invite-appointment-input-field">
                                    <select
                                        name="Purpose"
                                        value={visitorDetails.Purpose}
                                        onChange={handleInputChange}
                                    >
                                        <option value="Personal">Personal</option>
                                        <option value="Official">Official</option>
                                    </select>
                                </div>
                                <div className="invite-appointment-input-field">
                                    <input
                                        type="text"
                                        name="VisitorCompany"
                                        placeholder="Visit Company Name"
                                        value={visitorDetails.VisitorCompany}
                                        onChange={handleInputChange}
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
                                        id="from-date"
                                        value={fromDate}
                                        onChange={(e) => setFromDate(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="invite-appointment-input-field">
                                    <label htmlFor="to-date">To Date</label>
                                    <input
                                        type="date"
                                        id="to-date"
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
                                        id="from-time"
                                        value={fromTime}
                                        onChange={(e) => setFromTime(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="invite-appointment-input-field">
                                    <label htmlFor="to-time">To Time</label>
                                    <input
                                        type="time"
                                        id="to-time"
                                        value={toTime}
                                        onChange={(e) => setToTime(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </fieldset>

                        <div className="invite-appointment-btn-container">
                            <button 
                                type="submit" 
                                className="invite-appointment-submit-btn" 
                                disabled={isInviting}
                            >
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