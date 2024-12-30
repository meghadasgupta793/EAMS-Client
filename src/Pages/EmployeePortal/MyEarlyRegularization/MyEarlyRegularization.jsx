import React, { useState } from 'react';
import './MyEarlyRegularization.css';

import Header from '../../../Components/Header/Header';

const MyEarlyRegularization = () => {
    const [requests, setRequests] = useState([
        { id: 1, date: '2024-12-22', time: '08:30 AM', reason: 'Morning meeting', status: 'Pending' },
        { id: 2, date: '2024-12-20', time: '07:45 AM', reason: 'Doctor appointment', status: 'Approved' },
        { id: 3, date: '2024-12-18', time: '09:00 AM', reason: 'Family event', status: 'Rejected' },
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
        <div className='MyEarlyRegularization'>
            <Header />
            <div className='MyEarlyRegularization-container'>
                <div className='MyEarlyRegularization-header-container'>
                    <h1 className="MyEarlyRegularization-heading">My Early Regularizations</h1>
                </div>
                <form className='MyEarlyRegularization-form' onSubmit={handleFormSubmit}>
                    <div className='MyEarlyRegularization-date-time'>
                        <div className='MyEarlyRegularization-form-group'>
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
                        <div className='MyEarlyRegularization-form-group'>
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
                    <div className='MyEarlyRegularization-form-group'>
                        <label htmlFor='reason'>Reason</label>
                        <textarea
                            id='reason'
                            name='reason'
                            value={newRequest.reason}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button type='submit' className='MyEarlyRegularization-submit'>Submit Request</button>
                </form>
                <div className='MyEarlyRegularization-list'>
                    {requests.map(request => (
                        <div key={request.id} className='MyEarlyRegularization-item'>
                            <p className='MyEarlyRegularization-item-date'><strong>Date:</strong> {request.date}</p>
                            <p className='MyEarlyRegularization-item-time'><strong>Time:</strong> {request.time}</p>
                            <p className='MyEarlyRegularization-item-reason'><strong>Reason:</strong> {request.reason}</p>
                            <p className={`MyEarlyRegularization-item-status ${request.status.toLowerCase()}`}><strong>Status:</strong> {request.status}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyEarlyRegularization;
