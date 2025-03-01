import React, { useState, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import './CropPhoto.css';
import { IconButton, Tooltip, Modal, Button } from '@mui/material';
import { FileUpload, CameraAlt, Close } from '@mui/icons-material';
import Cropper from 'react-easy-crop';
import Webcam from 'react-webcam';
import { setCropImage } from '../../../Redux/slice/cropImageSlice';  // Import the setCropImage action
import { getCroppedImg } from './cropImage'; // Import the getCroppedImg function


const CropPhoto = ({ closeModal }) => {
    const dispatch = useDispatch();  // Use dispatch to send actions to the Redux store
    const [selectedImage, setSelectedImage] = useState(null);
    const [cropModalOpen, setCropModalOpen] = useState(false);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [cameraOpen, setCameraOpen] = useState(false);
    const webcamRef = useRef(null);

    // Handle File Selection
    const handleFileInput = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setSelectedImage(reader.result);
                setCropModalOpen(true);
            };
        }
    };

    // Open Camera
    const handleOpenCamera = () => {
        setCameraOpen(true);
    };

    // Capture Image from Camera
    const handleCapture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        if (imageSrc) {
            setSelectedImage(imageSrc);
            setCameraOpen(false); // Close camera modal
            setCropModalOpen(true); // Open cropping modal
        }
    };

    // Handle Cropping
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    // Save Cropped Image and dispatch to Redux
    const handleSaveCroppedImage = async () => {
        if (croppedAreaPixels && selectedImage) {
            try {
                const croppedImage = await getCroppedImg(selectedImage, croppedAreaPixels);
                dispatch(setCropImage(croppedImage)); // Dispatch the cropped image
            } catch (error) {
                console.error('Error cropping the image:', error);
            }
        }
        setCropModalOpen(false);
        closeModal();  // Close the modal after saving
    };

    return (
        <>
            <div className='employeeImg-backGroundWrapper' onClick={closeModal}></div>
            <div className='employeeImg-container'>
                <div className="employeeImg-header">
                    <h1>Upload Employee Image</h1>
                    <Tooltip title="Close">
                        <IconButton onClick={closeModal} className="employeeImg-closeButton">
                            <Close />
                        </IconButton>
                    </Tooltip>
                </div>

                <p className="employeeImg-description">
                    Please choose an image for the employee. You can either upload from local files or use the camera.
                </p>

                <div className="employeeImg-buttonContainer">
                    <Tooltip title="Choose from Local File">
                        <IconButton onClick={() => document.getElementById('fileInput').click()} className="employeeImg-iconButton">
                            <FileUpload />
                        </IconButton>
                    </Tooltip>
                    <input
                        type="file"
                        id="fileInput"
                        style={{ display: 'none' }}
                        accept="image/*"
                        onChange={handleFileInput}
                    />

                    <Tooltip title="Open Camera">
                        <IconButton onClick={handleOpenCamera} className="employeeImg-iconButton">
                            <CameraAlt />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>

            {/* Camera Modal */}
            <Modal open={cameraOpen} onClose={() => setCameraOpen(false)}>
                <div className="employeeImg-cameraModal">
                    <div className="employeeImg-cropHeader">
                        <h2>Take a Picture</h2>
                        <IconButton onClick={() => setCameraOpen(false)} className="employeeImg-closeButton">
                            <Close />
                        </IconButton>
                    </div>
                    <Webcam
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        className="employeeImg-webcam"
                        videoConstraints={{
                            facingMode: "user",
                        }}
                    />
                    <div className="employeeImg-cropButtons">
                        <Button variant="contained" color="primary" onClick={handleCapture}>
                            Capture
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Cropping Modal */}
            <Modal open={cropModalOpen} onClose={() => setCropModalOpen(false)}>
                <div className="employeeImg-cropModal">
                    <div className="employeeImg-cropHeader">
                        <h2>Crop Image</h2>
                        <IconButton onClick={() => setCropModalOpen(false)} className="employeeImg-closeButton">
                            <Close />
                        </IconButton>
                    </div>

                    <p className="employeeImg-cropText">Please crop the image to a passport-size photo.</p>
                    <div className="employeeImg-cropFrame">
                        <Cropper
                            image={selectedImage}
                            crop={crop}
                            zoom={zoom}
                            aspect={1} // Square aspect ratio for passport photo
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={onCropComplete}
                        />
                    </div>

                    <div className="employeeImg-cropButtons">
                        <Button variant="contained" color="primary" onClick={handleSaveCroppedImage}>
                            Save
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default CropPhoto;
