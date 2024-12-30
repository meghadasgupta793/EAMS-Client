import React, { useState } from 'react';
import './createInActiveEmployee.css';
import Header from '../../Header/Header';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const CreateInActiveEmployee = () => {
    const [employeeNo, setEmployeeNo] = useState('');
    const [idNo, setIdNo] = useState('');
    const [employeeName, setEmployeeName] = useState('');
    const [type, setType] = useState('');
    const [date, setDate] = useState('');
    const [remark, setRemark] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ employeeNo, idNo, employeeName, type, date, remark });
    };

    return (
        <div className='createInActiveEmployee'>
            <Header />
            <div className='createInActiveEmployee-Container'>
                {/* Top Section */}
                <h1 className='page-title'>Create Inactive Employee</h1>

                {/* Middle Section */}
                <div className='middle-section'>
                    <div className='InActiveEmployee-left-section'>
                        <div className='InActive-employee-pic'>
                            <img src='/images/profile.png' alt='Employee' />
                            <div className='camera-icon'>
                                <CameraAltIcon />
                            </div>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className='createInActiveEmployee-form'>
                        <div className='InActiveEmployee-right-section'>
                            {/* Top Form Section */}
                            <div className='InActiveEmployee-top-section'>
                                <div className='InActiveEmployee-form-group'>
                                    <label>Employee No</label>
                                    <input
                                        type="text"
                                        className="InActiveEmployee-form-control"
                                        value={employeeNo}
                                        onChange={(e) => setEmployeeNo(e.target.value)}
                                    />
                                </div>
                                <div className='InActiveEmployee-form-group'>
                                    <label>ID No</label>
                                    <input
                                        type="text"
                                        className="InActiveEmployee-form-control"
                                        value={idNo}
                                        onChange={(e) => setIdNo(e.target.value)}
                                    />
                                </div>
                                <div className='InActiveEmployee-form-group'>
                                    <label>Employee Name</label>
                                    <input
                                        type="text"
                                        className="InActiveEmployee-form-control"
                                        value={employeeName}
                                        onChange={(e) => setEmployeeName(e.target.value)}
                                    />
                                </div>
                            </div>
                            {/* Bottom Form Section */}
                            <div className='InActiveEmployee-bottom-section'>
                                <div className='InActiveEmployee-form-group'>
                                    <label>Select Type</label>
                                    <select
                                        className="InActiveEmployee-form-control"
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                    >
                                        <option value="" disabled>Select Type</option>
                                        <option value="Retire">Retire</option>
                                        <option value="Resign">Resign</option>
                                        <option value="Death">Death</option>
                                        <option value="InActive">InActive</option>
                                    </select>
                                </div>
                                <div className='InActiveEmployee-form-group'>
                                    <label>Select Date</label>
                                    <input
                                        type="date"
                                        className="InActiveEmployee-form-control"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                </div>
                                <div className='InActiveEmployee-form-group'>
                                    <label>Remark</label>
                                    <textarea
                                        className="InActiveEmployee-form-control"
                                        value={remark}
                                        onChange={(e) => setRemark(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Bottom Section */}
                <div className='submit-section'>
                    <button type="submit" className="submit-btn">Create</button>
                </div>
            </div>
        </div>
    );
};

export default CreateInActiveEmployee;
