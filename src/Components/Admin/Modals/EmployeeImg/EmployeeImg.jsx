import React from 'react';
import './EmployeeImg.css';

const EmployeeImg = ({ closeModal }) => {
    return (
        <>
            <div className='backGround-Wrapper' onClick={closeModal}></div>
            <div className='employeeImg-container'>
                <h1>EmployeeImg</h1>
                <button onClick={closeModal}>Close</button> {/* Button to close the modal */}
            </div>
        </>
    );
};

export default EmployeeImg;
