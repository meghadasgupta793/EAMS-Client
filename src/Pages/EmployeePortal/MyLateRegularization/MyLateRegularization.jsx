import React, { useState } from 'react';
import './MyLateRegularization.css';

import Header from '../../../Components/Header/Header';

import SearchIcon from '@mui/icons-material/Search';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

const MyLateRegularization = () => {
    const AbsentData = [
        { absentDate: '2024-09-04', status: 'Absent' },
        { absentDate: '2024-09-05', status: 'Absent' },
        { absentDate: '2024-09-06', status: 'Absent' },
        { absentDate: '2024-09-11', status: 'Absent' },
        { absentDate: '2024-09-16', status: 'Absent' },
        { absentDate: '2024-09-19', status: 'Absent' },
        { absentDate: '2024-09-20', status: 'Absent' },
    ];

    const [requests, setRequests] = useState([
        { id: 1, date: '2024-12-22', time: '09:30 AM', reason: 'Traffic delay', status: 'Pending' },
        { id: 2, date: '2024-12-20', time: '10:00 AM', reason: 'Health issue', status: 'Approved' },
        { id: 3, date: '2024-12-18', time: '08:45 AM', reason: 'Late meeting', status: 'Rejected' },
    ]);

    const [newRequest, setNewRequest] = useState({ date: '', time: '', reason: '' });


    // Pagination logic
    const ITEMS_PER_PAGE = 4;
    const [page, setPage] = useState(1);
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedData = AbsentData.slice(startIndex, endIndex);

    const handleNext = () => {
        if (endIndex < AbsentData.length) {
            setPage(prev => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (page > 1) {
            setPage(prev => prev - 1);
        }
    };
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

    const handleDateClick = (absentDate) => {
        setNewRequest({ ...newRequest, date: absentDate });
    };


    return (
        <div className='MyLateRegularization'>
            <Header />
            <div className='MyLateRegularization-container'>
                <div className='MyLateRegularization-header-container'>
                    <h1 className="MyLateRegularization-heading">My Late Regularizations</h1>
                </div>

                <div className='MyLateRegularization-grids'>
                    {/* Left-side Late Table */}
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
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedData.length === 0 ? (
                                    <tr>
                                        <td colSpan="2" style={{ textAlign: 'center' }}>No Absent Records Found</td>
                                    </tr>
                                ) : (
                                    paginatedData.map((item, index) => (
                                        <tr key={index}>
                                            <td onClick={() => handleDateClick(item.absentDate)}>{item.absentDate}</td>
                                            <td>{item.status}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>

                        <div className='pagination-container'>
                            {page > 1 && (
                                <IconButton onClick={handlePrevious}>
                                    <KeyboardDoubleArrowLeftIcon className='pagination-btn' />
                                </IconButton>
                            )}
                            <span>{page}</span>
                            {endIndex < AbsentData.length && (
                                <IconButton onClick={handleNext}>
                                    <KeyboardDoubleArrowRightIcon className='pagination-btn' />
                                </IconButton>
                            )}
                        </div>

                    </div>

                    {/* Late Regularize Request Form */}
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
                </div>

                {/* List of Requests */}
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
