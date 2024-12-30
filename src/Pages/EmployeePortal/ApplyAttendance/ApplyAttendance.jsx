// ApplyAttendance.jsx

import React, { useEffect, useState } from 'react';
import './ApplyAttendance.css';
import Header from '../../../Components/Header/Header';
import { ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

import { useFaceRecognition } from '../../../StoreContext/FaceRecognitionContext';
import Webcam from 'react-webcam';

const ApplyAttendance = () => {
    const [attendance, setAttendance] = useState("in");
    const { handleVerifyFace, webcamRef, recognitionResult, alertVisible, verifiedImage } = useFaceRecognition();

    const handleAttendanceChange = (event, newAttendance) => {
        if (newAttendance !== null) {
            setAttendance(newAttendance);
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

    return (
        <div className='applyAttendance'>
            <Header />
            <div className='applyAttendance-container'>
                <div className='applyAttendance-left-content'>
                    <div className='camera-frame'>
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            width="380"
                            height="380"
                        />
                    </div>
                    {/* Alert for recognition result */}
                    {alertVisible && <div className="alert"><p>{recognitionResult}</p></div>}


                    <div className='apply-attendance-button-container'>
                        <button
                            className='apply-attendance-button'
                            onClick={onVerifyClick}
                        >
                            Verify
                        </button>
                    </div>




                </div>

                <div className='applyAttendance-right-content'>
                    <div className='employee-photo-frame'>
                        {verifiedImage && <img src={verifiedImage} alt="Verified" />}
                    </div>
                    <div className='attendance-options'>
                        <ToggleButtonGroup
                            value={attendance}
                            exclusive
                            onChange={handleAttendanceChange}
                            aria-label="attendance toggle"
                        >
                            <Tooltip title="Check In" arrow>
                                <ToggleButton value="in" aria-label="check in">
                                    <CheckCircleIcon />
                                </ToggleButton>
                            </Tooltip>
                            <Tooltip title="Check Out" arrow>
                                <ToggleButton value="out" aria-label="check out">
                                    <CancelIcon />
                                </ToggleButton>
                            </Tooltip>
                        </ToggleButtonGroup>
                    </div>


                    {/* Location and remark side by side */}
                    <div className='remarkAndLocation'>
                        <textarea
                            className='remark-input'
                            placeholder='Enter remarks here...'
                        />

                        {/* Location display */}
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



                    </div>


                    <div className='apply-attendance-button-container'>
                        <button className='apply-attendance-button'>Apply Attendance</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApplyAttendance;
