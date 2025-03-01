import React, { useEffect, useState } from 'react';
import './addHolidayInHolidayGroup.css';
import IconButton from '@mui/material/IconButton';
import AddTaskIcon from '@mui/icons-material/AddTask';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useAssingHolidayInGroupMutation, useGetHolidayListForGroupAssingmentQuery } from '../../../../Redux/api/admin/holidayApi';

const AddHolidayInHolidayGroup = ({ closeModal, id , HolidayGroupName }) => {
    const { data, error, isLoading } = useGetHolidayListForGroupAssingmentQuery(id);
     const [assingHolidayInGroup, { isLoading: isAssinging }] = useAssingHolidayInGroupMutation();
      const GroupID=id 
      

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

    // Ensure we have data before using slice()
    const holidayList = data?.data || [];
    const paginatedData = holidayList.slice(startIndex, endIndex);

    const handleNext = () => {
        if (endIndex < holidayList.length) {
            setPage((prev) => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (page > 1) {
            setPage((prev) => prev - 1);
        }
    };

        // Function to assign holiday
        const handleAssignHoliday = async (HolidayID) => {
            try {
                await assingHolidayInGroup({
                    GroupID,
                    HolidayID,
                    CreatedBy:1, // Change this dynamically if needed
                }).unwrap();
                alert("Holiday assigned successfully!");
            } catch (err) {
                console.error("Error assigning holiday:", err);
                alert("Failed to assign holiday.");
            }
        };

    return (
        <>
            <div className="holidaygroup-backGround-Wrapper"></div>
            <div className="addHolidayInHolidayGroup-container">
                <div className='addHolidayInHolidayGroup-header-container'>
                    <h1 className='addHolidayInHolidayGroup-heading'>Add Holiday Assign For </h1>
                    <h1 className='addHolidayInHolidayGroup-groupName'>{HolidayGroupName}</h1>
                    <button className="action-btn cancel-btn" onClick={closeModal}>Cancel</button>
                </div>

                {/* Show loading or error message */}
                {isLoading ? (
                    <p>Loading holidays...</p>
                ) : error ? (
                    <p>Error fetching holidays</p>
                ) : (
                    <>
                        <table className="addHolidayInHolidayGroup-table">
                            <thead>
                                <tr>
                                <th>HolidayId</th>
                                    <th>Holiday Name</th>
                                    <th>From Date</th>
                                    <th>To Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedData.length > 0 ? (
                                    paginatedData.map((holiday, index) => (
                                        <tr key={holiday.HolidayID}>
                                        <td>{holiday.HolidayID}</td>
                                            <td>{holiday.HolidayName}</td>
                                            <td>{holiday.StartDate}</td>
                                            <td>{holiday.EndDate}</td>
                                            <td>
                                            <IconButton 
                                                    className="action-btn update-btn" 
                                                    onClick={() => handleAssignHoliday(holiday.HolidayID)}
                                                    disabled={isAssinging}
                                                >
                                                    <AddTaskIcon />
                                                </IconButton>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4">No holidays available.</td>
                                    </tr>
                                )}
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
                            {endIndex < holidayList.length && (
                                <IconButton onClick={handleNext}>
                                    <KeyboardDoubleArrowRightIcon className="pagination-btn" />
                                </IconButton>
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default AddHolidayInHolidayGroup;
