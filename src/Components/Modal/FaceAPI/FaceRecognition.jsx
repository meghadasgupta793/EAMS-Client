import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import * as faceapi from 'face-api.js';
import Webcam from 'react-webcam';
import './FaceRecognition.css';

const FaceRecognition = forwardRef(({ setVerifiedImage, setAlertVisible, onVerify }, ref) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [labeledDescriptors, setLabeledDescriptors] = useState([]);
  const webcamRef = useRef(null);
  let lastDetectedDescriptor = useRef(null);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models';
      await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
      setIsLoaded(true);
    };

    const loadLabeledImages = async () => {
      const labels = ['00FIPL-220.jpg'];
      return Promise.all(
        labels.map(async (label) => {
          const imgUrl = `https://smart-punch.com/SmartFace/Upload/ProfilePic/${label}`;
          const img = await faceapi.fetchImage(imgUrl);
          const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
          if (!detections) {
            throw new Error(`No face detected for ${label}`);
          }
          const descriptors = [detections.descriptor];
          return new faceapi.LabeledFaceDescriptors(label, descriptors);
        })
      );
    };

    loadModels().then(() => {
      loadLabeledImages().then((descriptors) => {
        setLabeledDescriptors(descriptors);
      });
    });
  }, []);

  useEffect(() => {
    if (isLoaded && labeledDescriptors.length > 0) {
      const recognizeFaces = async () => {
        if (webcamRef.current && webcamRef.current.video.readyState === 4) {
          const video = webcamRef.current.video;

          const startRecognition = () => {
            const id = setInterval(async () => {
              if (video && video.videoWidth > 0 && video.videoHeight > 0) {
                const detections = await faceapi
                  .detectAllFaces(video)
                  .withFaceLandmarks()
                  .withFaceDescriptors();

                if (detections.length > 0) {
                  const currentDescriptor = detections[0].descriptor;
                  lastDetectedDescriptor.current = currentDescriptor;
                }
              }
            }, 3000);
            return id;
          };

          const intervalId = startRecognition();
          return () => clearInterval(intervalId);
        }
      };

      recognizeFaces();
    }
  }, [isLoaded, labeledDescriptors]);

  // Expose the handleVerifyFace method to the parent component
  const handleVerifyFace = () => {
    if (lastDetectedDescriptor.current && labeledDescriptors.length > 0) {
      const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6);
      const result = faceMatcher.findBestMatch(lastDetectedDescriptor.current);
      const screenshot = webcamRef.current.getScreenshot();
      onVerify(result.label, screenshot); // Call the parent's onVerify function
    }
  };

  useImperativeHandle(ref, () => ({
    handleVerifyFace, // Make handleVerifyFace accessible to parent
  }));

  return (
    <div className="face-recognition-container">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width="380"
        height="380"
        style={{ display: 'block' }}
      />
    </div>
  );
});

export default FaceRecognition;
