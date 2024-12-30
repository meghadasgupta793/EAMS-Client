import React, { useState } from 'react';
import './MyLateRegularization.css';

import Header from '../../../Components/Header/Header';

import SearchIcon from '@mui/icons-material/Search';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

const MyLateRegularization = () => {
    const [requests, setRequests] = useState([
        { id: 1, date: '2024-12-22', time: '09:30 AM', reason: 'Traffic delay', status: 'Pending' },
        { id: 2, date: '2024-12-20', time: '10:00 AM', reason: 'Health issue', status: 'Approved' },
        { id: 3, date: '2024-12-18', time: '08:45 AM', reason: 'Late meeting', status: 'Rejected' },
    ]);

    const [newRequest, setNewRequest] = useState({ date: '', time: '', reason: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRequest({ ...newRequest, [name]: value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (newRequest.date && newRequest.time && newRequest.reason) {
            const newId = requests.length + 1;
            setRequests([
                { id: newId, date: newRequest.date, time: newRequest.time, reason: newRequest.reason, status: 'Pending' },
                ...requests,
            ]);
            setNewRequest({ date: '', time: '', reason: '' });
        }
    };

    return (
        <div className='MyLateRegularization'>
            <Header />
            <div className='MyLateRegularization-container'>

                <div className='MyLateRegularization-header-container'>
                    <h1 className="MyLateRegularization-heading">My Late Regularizations</h1>

                </div>




                {/*left-side     Late Table*/}
                <div className='MyLateRegularization-late-table-container'>
                    <div className='MyLateRegularization-late-table-header-container'>
                        <h1 className="MyLateRegularization-late-table-heading">My All Late Status</h1>
                        <div className='MyLateRegularization-late-table-icon-container'>
                            <Tooltip title="Search">
                                <IconButton>
                                    <SearchIcon className="MyLateRegularization-late-table-header-icon" />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Export late Status in Excel">
                                <IconButton>
                                    <FileDownloadIcon className="MyLateRegularization-late-table-header-icon" />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>

                    <table className='MyLateRegularization-late-Table'>
                        <thead>
                            <tr>
                          
                                <th>Date</th>
                                <th>late Time</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>





                </div>







                {/*Late regularize request form*/}
                <form className='MyLateRegularization-form' onSubmit={handleFormSubmit}>
                    <div className='MyLateRegularization-date-time'>
                        <div className='MyLateRegularization-form-group'>
                            <label htmlFor='date'>Date</label>
                            <input
                                type='date'
                                id='date'
                                name='date'
                                value={newRequest.date}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className='MyLateRegularization-form-group'>
                            <label htmlFor='time'>Time</label>
                            <input
                                type='time'
                                id='time'
                                name='time'
                                value={newRequest.time}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    <div className='MyLateRegularization-form-group'>
                        <label htmlFor='reason'>Reason</label>
                        <textarea
                            id='reason'
                            name='reason'
                            value={newRequest.reason}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button type='submit' className='MyLateRegularization-submit'>Submit Request</button>
                </form>







                <div className='MyLateRegularization-list'>
                    {requests.map(request => (
                        <div key={request.id} className='MyLateRegularization-item'>
                            <p className='MyLateRegularization-item-date'><strong>Date:</strong> {request.date}</p>
                            <p className='MyLateRegularization-item-time'><strong>Time:</strong> {request.time}</p>
                            <p className='MyLateRegularization-item-reason'><strong>Reason:</strong> {request.reason}</p>
                            <p className={`MyLateRegularization-item-status ${request.status.toLowerCase()}`}>
                                <strong>Status:</strong> {request.status}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyLateRegularization;
