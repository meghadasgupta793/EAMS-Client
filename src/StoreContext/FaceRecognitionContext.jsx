// FaceRecognitionContext.jsx

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import Webcam from 'react-webcam';

// Create the context
const FaceRecognitionContext = createContext();

// Context provider component
export const FaceRecognitionProvider = ({ children }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [labeledDescriptors, setLabeledDescriptors] = useState([]);
    const [recognitionResult, setRecognitionResult] = useState('');
    const [alertVisible, setAlertVisible] = useState(false);
    const [verifiedImage, setVerifiedImage] = useState(null);
    const webcamRef = useRef(null);

    useEffect(() => {
        const loadModels = async () => {
            try {
                const MODEL_URL = '/models'; // Update this if models are stored differently
                await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
                await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
                await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
                setIsLoaded(true);
            } catch (error) {
                console.error("Error loading models:", error);
            }
        };

        const loadLabeledImages = async () => {
            const labels = ['00FIPL-220.jpg']; // Replace with actual labels or dynamically fetch them
            return Promise.all(
                labels.map(async (label) => {
                    const imgUrl = `https://smart-punch.com/SmartFace/Upload/ProfilePic/${label}`;
                    const img = await faceapi.fetchImage(imgUrl);
                    const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
                    if (!detections) {
                        throw new Error(`No face detected for ${label}`);
                    }
                    return new faceapi.LabeledFaceDescriptors(label, [detections.descriptor]);
                })
            );
        };

        // Load models and labeled images
        loadModels().then(() => {
            loadLabeledImages().then((descriptors) => {
                setLabeledDescriptors(descriptors);
            });
        });
    }, []);

    const handleVerifyFace = async () => {
        if (!webcamRef.current) return;

        const video = webcamRef.current.video;
        const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors();

        if (detections.length === 0) {
            setRecognitionResult('No face detected');
            setVerifiedImage(null);
            setAlertVisible(true);
            return;
        }

        const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6);
        const bestMatch = faceMatcher.findBestMatch(detections[0].descriptor);

        if (bestMatch.label === 'unknown') {
            setRecognitionResult('Face not matched');
            setVerifiedImage(null);
        } else {
            setRecognitionResult(`Matched with: ${bestMatch.label}`);
            const screenshot = webcamRef.current.getScreenshot();
            setVerifiedImage(screenshot);
        }

        setAlertVisible(true);
        setTimeout(() => setAlertVisible(false), 5000);
    };

    return (
        <FaceRecognitionContext.Provider value={{ isLoaded, handleVerifyFace, webcamRef, recognitionResult, alertVisible, verifiedImage }}>
            {children}
        </FaceRecognitionContext.Provider>
    );
};

// Hook to use the context in other components
export const useFaceRecognition = () => {
    return useContext(FaceRecognitionContext);
};
