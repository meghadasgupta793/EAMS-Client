import React, { useState } from 'react';
import './ApplyTour.css';
import SearchIcon from '@mui/icons-material/Search';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { exportToExcel } from '../../../Components/Utils/excelUtils';
import Header from '../../../Components/Header/Header';
import { useNavigate } from 'react-router-dom';

const ITEMS_PER_PAGE = 4;

const ApplyTour = () => {
    const [page, setPage] = useState(1);
    const [selectedDate, setSelectedDate] = useState(''); // State for selected From Date
    const [toDate, setToDate] = useState(''); // State for selected To Date

    const AbsentData = [
        { absentDate: '2024-09-04', status: 'Absent' },
        { absentDate: '2024-09-05', status: 'Absent' },
        { absentDate: '2024-09-06', status: 'Absent' },
        { absentDate: '2024-09-11', status: 'Absent' },
        { absentDate: '2024-09-16', status: 'Absent' },
        { absentDate: '2024-09-19', status: 'Absent' },
        { absentDate: '2024-09-20', status: 'Absent' },
    ];

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

    const myTable = 'AbsentData';
    const handleExport = () => {
        exportToExcel(AbsentData, myTable);
    };

    const navigate = useNavigate();

    // Set date in the From Date field when a table date is clicked
    const handleDateClick = (date) => {
        setSelectedDate(date); // Update From Date with clicked date
    };

    return (
        <div className='applyTour'>
            <Header />
            <div className='applyTour-Container'>
                <div className='applyTour-grids'>
                    <div className='applyTour-table-container'>
                        <div className='applyTour-header-container'>
                            <h1 className='tour-details-heading'>Absent Dates</h1>
                            <div className='tour-status-icon-container'>
                                <Tooltip title="Search any Absent Date">
                                    <IconButton>
                                        <SearchIcon className='tour-status-header-icon' />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </div>
                        <table className='applyTour-status-table'>
                            <thead>
                                <tr>
                                    <th>Absent Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {AbsentData.length === 0 ? (
                                    <tr>
                                        <td colSpan="2" style={{ textAlign: 'center' }}>
                                            No Absent Records Found
                                        </td>
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

                    <div className='apply-tour-container'>
                        <div className='apply-tour-header-container'>
                            <h1 className='apply-tour-heading'>Apply Tour</h1>
                        </div>

                        <div className='apply-tour-form'>
                            <div className='apply-tour-row'>
                                <label htmlFor='fromDate'>From Date</label>
                                <input
                                    type='date'
                                    id='fromDate'
                                    name='fromDate'
                                    className='apply-tour-input'
                                    value={selectedDate} // Set input value to selectedDate in YYYY-MM-DD format
                                    onChange={(e) => setSelectedDate(e.target.value)} // Update date on change
                                    required
                                />
                            </div>

                            <div className='apply-tour-row'>
                                <label htmlFor='toDate'>To Date</label>
                                <input
                                    type='date'
                                    id='toDate'
                                    name='toDate'
                                    className='apply-tour-input'
                                    value={toDate} // Set input value to toDate
                                    onChange={(e) => setToDate(e.target.value)} // Update toDate on change
                                    required
                                />
                            </div>

                            <div className='apply-tour-row'>
                                <label htmlFor='reason'>Reason</label>
                                <input type='text' id='reason' name='reason' className='apply-tour-input' required />
                            </div>

                            <div className='apply-tour-button-container'>
                                <button className='apply-tour-button'>Apply</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApplyTour;
