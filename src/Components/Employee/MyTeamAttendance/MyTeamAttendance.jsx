import React, { useEffect, useState } from 'react';
import './MyTeamAttendance.css';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../../Components/Header/Header';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Webcam from 'react-webcam';
import { useFaceRecognition, FaceRecognitionProvider } from '../../../StoreContext/FaceRecognitionContext';
import { useGetEmployeeByempNoQuery } from '../../../Redux/api/admin/employeeApi';
import config from '../../../secrect';
import { useMarkAttendanceMutation } from '../../../Redux/api/ess/employeeAttendance';

const MyTeamAttendance = () => {
    const { ImgUrl } = config;
    const { empNo } = useParams(); // Get the employee number from the URL
    const { data, error, isLoading } = useGetEmployeeByempNoQuery(empNo); // Fetch employee data
    const employeeData = data?.data || {}; // Extract employee data or default to an empty object
    const labels = employeeData.PictureName ? [employeeData.PictureName] : [];
    const [markAttendance, { isLoading: isMarkAttendanceLoading, error: MarkAttendanceError }] = useMarkAttendanceMutation();

    return (
        <FaceRecognitionProvider labels={labels}>
            <MyTeamAttendanceContent
                ImgUrl={ImgUrl}
                employeeData={employeeData}
                isLoading={isLoading}
                error={error}
                markAttendance={markAttendance}
                isMarkAttendanceLoading={isMarkAttendanceLoading}
                MarkAttendanceError={MarkAttendanceError}
            />
        </FaceRecognitionProvider>
    );
};

const MyTeamAttendanceContent = ({
    ImgUrl,
    employeeData,
    isLoading,
    error,
    markAttendance,
    isMarkAttendanceLoading,
    MarkAttendanceError
}) => {
    const navigate = useNavigate();
    const { handleVerifyFace, webcamRef, recognitionResult, alertVisible, verifiedImage } = useFaceRecognition();
    const [attendanceStatus, setAttendanceStatus] = useState('in'); // Toggle button state
    const [remark, setRemark] = useState(''); // State for remark input

    const handleToggleChange = (event, newStatus) => {
        if (newStatus !== null) {
            setAttendanceStatus(newStatus);
        }
    };

    const onVerifyClick = async () => {
        await handleVerifyFace();
    };

    const [position, setPosition] = useState(null);
    const [address, setAddress] = useState('Fetching address...');

    // Fetch the user's location and address based on coordinates
    const fetchLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    setPosition({ latitude, longitude });
                    fetchAddress(latitude, longitude); // Fetch address once we have the coordinates
                },
                (err) => {
                    console.error(err);
                    setAddress("Unable to retrieve location");
                }
            );
        } else {
            setAddress("Geolocation not supported");
        }
    };

    // Fetch the address from OpenStreetMap using latitude and longitude
    const fetchAddress = async (latitude, longitude) => {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
            const data = await response.json();
            setAddress(data.display_name || "Address not found");
        } catch (error) {
            console.error('Error fetching address:', error);
            setAddress("Error fetching address");
        }
    };

    // Trigger location fetch on component mount
    useEffect(() => {
        fetchLocation();
    }, []);

    // Handle Mark Attendance button click
    const handleMarkAttendance = async () => {
        if (!position || !address || !verifiedImage) {
            alert("Please verify your face and ensure location is fetched.");
            return;
        }

        // Prepare the payload
        const attendanceData = {
            EmployeeID: employeeData.EmployeeID,
            PunchTime: new Date().toISOString(), // Current timestamp
            Latitude: position.latitude,
            Longitude: position.longitude,
            GeoLocation: address,
            HeadPhoto: verifiedImage, // Base64 image
            InOutMode: attendanceStatus === "in" ? 1 : 2, // 1 for "in", 2 for "out"
            Remark: remark, // Add remark to the payload
        };

        try {
            // Call the API to mark attendance
            const response = await markAttendance(attendanceData).unwrap();
            console.log("Attendance marked successfully:", response);
            alert("Attendance marked successfully!");
            navigate('/'); // Navigate to the home page after marking attendance
        } catch (err) {
            console.error("Error marking attendance:", err);
            alert("Failed to mark attendance. Please try again.");
        }
    };

    if (isLoading) return <div>Loading...</div>; // Show loading state
    if (error) return <div>Error: {error.message}</div>; // Show error state

    return (
        <div className='my-team-attendance'>
            <Header />
            <div className='my-team-attendance-container'>
                {/* Left Section */}
                <div className='my-team-attendance-left'>
                    {/* Employee Photo */}
                    <div className='my-team-attendance-employee-photo'>
                        <img
                            src={`${ImgUrl}/${employeeData.PictureName}`} // Use the employee's photo from the API
                            alt="Employee"
                            className='my-team-attendance-employee-image'
                        />
                    </div>

                    {/* Employee Information */}
                    <div className='my-team-attendance-employee-info'>
                        <h3>{employeeData.EmployeeName}</h3> {/* Employee Name */}
                        <p><strong>Employee No:</strong> {employeeData.EmpNo}</p> {/* Employee Number */}
                        <p><strong>In Time:</strong> {employeeData.inTime || 'N/A'}</p> {/* In Time */}
                        <p><strong>Out Time:</strong> {employeeData.outTime || 'N/A'}</p> {/* Out Time */}
                    </div>
                </div>

                {/* Right Section */}
                <div className='my-team-attendance-right'>
                    {/* Camera Frame */}
                    <div className='my-team-attendance-camera-frame'>
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            width="200"
                            height="200"
                        />
                    </div>

                    {/* Verify Button */}
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<CheckCircleIcon />}
                        className='my-team-attendance-verify-button'
                        onClick={onVerifyClick}
                    >
                        Verify
                    </Button>

                    {/* Verification Status */}
                    <div className='my-team-attendance-verification-status'>
                        {alertVisible && <div className="alert"><p>{recognitionResult}</p></div>}
                    </div>

                    {/* Verified Photo Frame */}
                    <div className='my-team-attendance-verified-photo'>
                        {verifiedImage && <img src={verifiedImage} alt="Verified" className='my-team-attendance-verified-image' />}
                    </div>

                    {/* Toggle Buttons for In/Out */}
                    <div className='my-team-attendance-toggle-buttons'>
                        <Tooltip title="Mark In">
                            <ToggleButtonGroup
                                value={attendanceStatus}
                                exclusive
                                onChange={handleToggleChange}
                                aria-label="attendance status"
                            >
                                <ToggleButton value="in" aria-label="in">
                                    In
                                </ToggleButton>
                                <ToggleButton value="out" aria-label="out">
                                    Out
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Tooltip>
                    </div>

                    {/* Remark Input Field */}
                    <TextField
                        label="Remark"
                        variant="outlined"
                        fullWidth
                        className='my-team-attendance-remark-input'
                        placeholder="Enter Remark"
                        value={remark}
                        onChange={(e) => setRemark(e.target.value)}
                    />

                    {/* Location Display */}
                    <div className="Location-container">
                        {position ? (
                            <>
                                <p>Latitude: {position.latitude}</p>
                                <p>Longitude: {position.longitude}</p>
                            </>
                        ) : (
                            <p>Loading location...</p>
                        )}
                        <p>Address: {address}</p>
                    </div>

                    {/* Mark Attendance Button */}
                    <Button
                        variant="contained"
                        color="secondary"
                        className='my-team-attendance-mark-button'
                        onClick={handleMarkAttendance}
                        disabled={isMarkAttendanceLoading} // Disable button while loading
                    >
                        {isMarkAttendanceLoading ? "Marking Attendance..." : "Mark Attendance"}
                    </Button>

                    {/* Display API error */}
                    {MarkAttendanceError && (
                        <div className="error-message">
                            Error: {MarkAttendanceError.message}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyTeamAttendance;