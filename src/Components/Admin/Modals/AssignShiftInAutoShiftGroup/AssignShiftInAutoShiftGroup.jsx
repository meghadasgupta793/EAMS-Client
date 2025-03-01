import React, { useEffect, useState } from 'react';
import './AssignShiftInAutoShiftGroup.css';
import IconButton from '@mui/material/IconButton';
import AddTaskIcon from '@mui/icons-material/AddTask';
import CloseIcon from '@mui/icons-material/Close';
import Tooltip from '@mui/material/Tooltip';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useAssignAutoShiftMutation, useGetUnAssignedShiftListQuery } from '../../../../Redux/api/admin/shiftApi';

const AssignShiftInAutoShiftGroup = ({ closeModal, id, AutoShiftGroupName, createdBy }) => {
    const { data, error, isLoading } = useGetUnAssignedShiftListQuery(id);
    const [assignShiftInGroup, { isLoading: isAssigning }] = useAssignAutoShiftMutation();
    const [shiftSchemes, setShiftSchemes] = useState([]);
    const AutoShiftGroupID = id;

    useEffect(() => {
        document.body.style.overflowY = 'hidden';
        return () => {
            document.body.style.overflowY = 'scroll';
        };
    }, []);

    // Format time to strict HH:mm:ss (24-hour format)
    const formatTime = (timestamp) => {
        if (!timestamp) return "";
        const date = new Date(timestamp);
        return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    };

    useEffect(() => {
        if (data?.data) {
            setShiftSchemes(data.data); // Use API response directly
        }
    }, [data]);

    const handleInputChange = (index, field, value) => {
        // Ensure input is in HH:mm:ss format (if user enters only HH:mm, append :00)
        let correctedValue = value.length === 5 ? value + ":00" : value; // Ensure HH:mm:ss
        setShiftSchemes((prev) =>
            prev.map((shift, i) =>
                i === index ? { ...shift, [field]: correctedValue } : shift
            )
        );
    };
//// AutoShiftGroupID,ShiftCode,EntryThreshold,EndThreshold
    const handleAssignShift = async (shift) => {
        try {
            await assignShiftInGroup({
                AutoShiftGroupID,
                ShiftCode: shift.Code,
                EntryThreshold: shift.EntryThreshold,
                EndThreshold: shift.EndThreshold
            }).unwrap();
            alert('Shift assigned successfully!');
        } catch (err) {
            console.error('Error assigning shift:', err);
            alert(err?.data?.message || 'Failed to assign shift.');
        }
    };

    const ITEMS_PER_PAGE = 6;
    const [page, setPage] = useState(1);
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedData = shiftSchemes.slice(startIndex, endIndex);

    return (
        <>
            <div className="shiftgroup-backGround-Wrapper"></div>
            <div className="assignShiftInAutoShiftGroup-container">
                <div className='assignShiftInAutoShiftGroup-header-container'>
                    <h1 className='assignShiftInAutoShiftGroup-heading'>Assign Shift For</h1>
                    <h1 className='assignShiftInAutoShiftGroup-groupName'>{AutoShiftGroupName}</h1>
                    <Tooltip title="Close">
                        <IconButton onClick={closeModal} className="close-btn"
                            style={{ color: "white", padding: 4 }}>
                            <CloseIcon />
                        </IconButton>
                    </Tooltip>
                </div>

                {isLoading ? (
                    <p>Loading shifts...</p>
                ) : error ? (
                    <p>Error fetching shifts</p>
                ) : (
                    <>
                        <table className="assignShiftInAutoShiftGroup-table">
                            <thead>
                                <tr>
                                    <th>Shift Code</th>
                                    <th>Shift Name</th>
                                    <th>Start Time</th>
                                    <th>End Time</th>
                                    <th>Entry Threshold</th>
                                    <th>End Threshold</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedData.length > 0 ? (
                                    paginatedData.map((shift, index) => (
                                        <tr key={shift.Code}>
                                            <td>{shift.Code}</td>
                                            <td>{shift.Name}</td>
                                            <td>{shift.StartTime}</td>
                                            <td>{shift.EndTime}</td>
                                            <td>
                                                <input
                                                    type="text"
                                                    pattern="[0-9]{2}:[0-9]{2}:[0-9]{2}"
                                                    placeholder="HH:mm:ss"
                                                    value={shift.EntryThreshold}
                                                    onChange={(e) =>
                                                        handleInputChange(startIndex + index, "EntryThreshold", e.target.value)
                                                    }
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    pattern="[0-9]{2}:[0-9]{2}:[0-9]{2}"
                                                    placeholder="HH:mm:ss"
                                                    value={shift.EndThreshold}
                                                    onChange={(e) =>
                                                        handleInputChange(startIndex + index, "EndThreshold", e.target.value)
                                                    }
                                                />
                                            </td>
                                            <td>
                                                <IconButton
                                                    className="action-btn update-btn"
                                                    onClick={() => handleAssignShift(shift)}
                                                    disabled={isAssigning}
                                                >
                                                    <AddTaskIcon />
                                                </IconButton>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7">No shifts available.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        <div className="pagination-container">
                            {page > 1 && (
                                <IconButton onClick={() => setPage(page - 1)}>
                                    <KeyboardDoubleArrowLeftIcon className="pagination-btn" />
                                </IconButton>
                            )}
                            <span>{page}</span>
                            {endIndex < shiftSchemes.length && (
                                <IconButton onClick={() => setPage(page + 1)}>
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

export default AssignShiftInAutoShiftGroup;
