import React, { useState, useEffect } from 'react';
import './latestAttendance.css';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useLazyDashBoardLatestAttendanceQuery } from '../../../Redux/api/admin/adminDashboardApi';
import config from '../../../secrect';

const ITEMS_PER_PAGE = 6;
const MAX_NAME_LENGTH = 15;

const LatestAttendance = () => {
    const [page, setPage] = useState(1);
    const { ImgUrl, AdminDashbordRefreshTime } = config;
    const [trigger, { data, error, isLoading }] = useLazyDashBoardLatestAttendanceQuery();

    const EmpAttendance = data?.data || [];

    // Function to fetch data
    const fetchData = async () => {
        try {
            await trigger(); // Trigger the query
        } catch (err) {
            console.error('Error fetching latest attendance:', err);
        }
    };

    // Auto-fetch data at intervals
    useEffect(() => {
        fetchData(); // Fetch data immediately on component mount

        const intervalId = setInterval(() => {
            fetchData(); // Fetch data at the specified interval
        }, AdminDashbordRefreshTime);

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [AdminDashbordRefreshTime]);

    const handleNext = () => {
        setPage(prev => prev + 1);
    };

    const handlePrevious = () => {
        setPage(prev => prev - 1);
    };

    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    // Function to truncate text if it's longer than MAX_NAME_LENGTH
    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '...';
        }
        return text;
    };

  

    return (
        <div className='LatestAttendance'>
            <div className='header'>
                <h1 className='title'>Latest Attendance</h1>
                <div className='paginationControls'>
                    {page > 1 && (
                        <button className='loadMore' onClick={handlePrevious}>
                            <KeyboardDoubleArrowLeftIcon />
                        </button>
                    )}
                    {endIndex < EmpAttendance.length && (
                        <button className='loadMore' onClick={handleNext}>
                            <KeyboardDoubleArrowRightIcon />
                        </button>
                    )}
                </div>
            </div>
            <div className='cardContainer'>
                {isLoading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error fetching data</p>
                ) : (
                    EmpAttendance.slice(startIndex, endIndex).map(employee => (
                        <div className='card' key={employee.id}>
                            <div className='user'>
                                <img src={`${ImgUrl}/${employee.PictureName}`} alt='empImage' />
                                <div className='userText'>
                                    <span className='userName'>
                                        {truncateText(employee.EmployeeName, MAX_NAME_LENGTH)}
                                    </span>
                                    <span className='userNo'>{employee.EmpNo}</span>
                                </div>
                            </div>
                            <span className='datetime'>{employee.PunchTime}</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default LatestAttendance;