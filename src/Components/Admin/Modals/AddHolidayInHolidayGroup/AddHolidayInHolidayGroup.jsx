import React, { useEffect, useState } from 'react';
import './addHolidayInHolidayGroup.css';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import AddTaskIcon from '@mui/icons-material/AddTask';
import IconButton from '@mui/material/IconButton';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

const AddHolidayInHolidayGroup = ({ closeModal }) => {
    useEffect(() => {
        document.body.style.overflowY = 'hidden';
        return () => {
            document.body.style.overflowY = 'scroll';
        };
    }, []);

    // Pagination logic
    const ITEMS_PER_PAGE = 6;
    const [page, setPage] = useState(1);
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    const data = [
        { festivalName: 'New Year', fromDate: '01-01-2024', toDate: '01-01-2024' },
        { festivalName: 'Holi', fromDate: '03-29-2024', toDate: '03-29-2024' },
        { festivalName: 'Diwali', fromDate: '11-12-2024', toDate: '11-12-2024' },
        { festivalName: 'Christmas', fromDate: '12-25-2024', toDate: '12-25-2024' },
        { festivalName: 'Independence Day', fromDate: '08-15-2024', toDate: '08-15-2024' },
        { festivalName: 'Republic Day', fromDate: '01-26-2024', toDate: '01-26-2024' },
        { festivalName: 'Durga Puja', fromDate: '09-09-2024', toDate: '09-09-2024' },
        // Add more holiday data here
    ];

    const paginatedData = data.slice(startIndex, endIndex);

    const handleNext = () => {
        if (endIndex < data.length) {
            setPage((prev) => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (page > 1) {
            setPage((prev) => prev - 1);
        }
    };

   

    return (
        <>
            <div className="holidaygroup-backGround-Wrapper" ></div>
            <div className="addHolidayInHolidayGroup-container">
            <div className='addHolidayInHolidayGroup-header-container'>
            <h1 className='addHolidayInHolidayGroup-heading'>Add Holiday Assign For </h1>
            <h1 className='addHolidayInHolidayGroup-groupName'>WestBengal</h1>
            <button className="action-btn cancel-btn" onClick={closeModal}>Cancel</button>
            </div>
                <table className="addHolidayInHolidayGroup-table">
                    <thead>
                        <tr>
                            <th>Name of the Holiday</th>
                            <th>From Date</th>
                            <th>To Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.festivalName}</td>
                                <td>{item.fromDate}</td>
                                <td>{item.toDate}</td>
                                <td>
                                    <AddTaskIcon className="action-btn update-btn" />
                                   
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination Controls */}
                <div className="pagination-container">
                    {page > 1 && (
                        <IconButton onClick={handlePrevious}>
                            <KeyboardDoubleArrowLeftIcon className="pagination-btn" />
                        </IconButton>
                    )}
                    <span>{page}</span>
                    {endIndex < data.length && (
                        <IconButton onClick={handleNext}>
                            <KeyboardDoubleArrowRightIcon className="pagination-btn" />
                        </IconButton>
                    )}
                </div>
            </div>
        </>
    );
};

export default AddHolidayInHolidayGroup;
