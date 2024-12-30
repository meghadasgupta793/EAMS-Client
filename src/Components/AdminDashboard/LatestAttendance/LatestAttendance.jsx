import React, { useState } from 'react'
import './latestAttendance.css'
import { EmpAttendance } from '../../../data'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

const ITEMS_PER_PAGE = 6;
const MAX_NAME_LENGTH = 15;

const LatestAttendance = () => {
    const [page, setPage] = useState(1);

    const handleNext = () => {
        setPage(prev => prev + 1);
    }

    const handlePrevious = () => {
        setPage(prev => prev - 1);
    }

    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    // Function to truncate text if it's longer than MAX_NAME_LENGTH
    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '';
        }
        return text;
    }

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
                {EmpAttendance.slice(startIndex, endIndex).map(employee => (
                    <div className='card' key={employee.id}>
                        <div className='user'>
                            <img src={employee.img} alt='empImage' />
                            <div className='userText'>
                                <span className='userName'>{truncateText(employee.name, MAX_NAME_LENGTH)}</span>
                                <span className='userNo'>{employee.empNo}</span>
                            </div>
                        </div>
                        <span className='datetime'>{employee.punchDateTime}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default LatestAttendance
