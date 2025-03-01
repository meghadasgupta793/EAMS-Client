import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import Webcam from 'react-webcam';
import config from '../secrect';

// Create the context
const FaceRecognitionContext = createContext();

// Context provider component
export const FaceRecognitionProvider = ({ children, labels }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [labeledDescriptors, setLabeledDescriptors] = useState([]);
    const [recognitionResult, setRecognitionResult] = useState('');
    const [alertVisible, setAlertVisible] = useState(false);
    const [verifiedImage, setVerifiedImage] = useState(null);
    const webcamRef = useRef(null);
    const { ImgUrl, MODEL_URL } = config;

    useEffect(() => {
        const loadModels = async () => {
            try {
                console.log("Loading models from:", MODEL_URL);
                await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
                await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
                await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
                console.log("Models loaded successfully");
                setIsLoaded(true);
            } catch (error) {
                console.error("Error loading models:", error);
            }
        };

        const loadLabeledImages = async (labels) => {
            try {
                const descriptors = await Promise.all(
                    labels.map(async (label) => {
                        const picturUrl = `${ImgUrl}/${label}`;
                        const img = await faceapi.fetchImage(picturUrl);
                        const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
                        if (!detections) {
                            throw new Error(`No face detected for ${label}`);
                        }
                        return new faceapi.LabeledFaceDescriptors(label, [detections.descriptor]);
                    })
                );
                setLabeledDescriptors(descriptors);
            } catch (error) {
                console.error("Error loading labeled images:", error);
            }
        };

        const initialize = async () => {
            await loadModels();
            if (labels && labels.length > 0) {
                await loadLabeledImages(labels);
            }
        };

        initialize();
    }, [ImgUrl, MODEL_URL, labels]); // Add `labels` as a dependency

    const handleVerifyFace = async () => {
        if (!webcamRef.current || !isLoaded) return;

        const video = webcamRef.current.video;
        try {
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
        } catch (error) {
            console.error("Error during face verification:", error);
            setRecognitionResult('Error during face verification');
            setAlertVisible(true);
        }
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