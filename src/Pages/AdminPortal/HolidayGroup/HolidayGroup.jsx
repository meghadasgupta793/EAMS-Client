import React, { useState } from "react";
import './holidayGroup.css';
import Header from '../../../Components/Header/Header';
import { Tooltip, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import AddHolidayInHolidayGroup from "../../../Components/Admin/Modals/AddHolidayInHolidayGroup/AddHolidayInHolidayGroup";

const HolidayGroup = () => {
    const [holidayGroups, setHolidayGroups] = useState([
        {
            name: "West Bengal",
            holidays: [
                { name: "Durga Puja", fromDate: "09-09-2024", toDate: "09-09-2024" },
                { name: "Poila Baisakh", fromDate: "14-04-2024", toDate: "14-04-2024" },
                { name: "Rabindra Jayanti", fromDate: "09-05-2024", toDate: "09-05-2024" }
            ]
        },
        {
            name: "Mumbai",
            holidays: [
                { name: "Ganesh Chaturthi", fromDate: "09-09-2024", toDate: "09-09-2024" },
                { name: "Diwali", fromDate: "12-11-2024", toDate: "12-11-2024" }
            ]
        },
        {
            name: "Hyderabad",
            holidays: [
                { name: "Bathukamma", fromDate: "30-09-2024", toDate: "30-09-2024" },
                { name: "Bonalu", fromDate: "21-07-2024", toDate: "21-07-2024" }
            ]
        },
        {
            name: "Chennai",
            holidays: [
                { name: "Pongal", fromDate: "14-01-2024", toDate: "14-01-2024" },
                { name: "Deepavali", fromDate: "12-11-2024", toDate: "12-11-2024" },
                { name: "Maha Shivaratri", fromDate: "09-03-2024", toDate: "09-03-2024" }
            ]
        }
    ]);

    const [showHolidayListModal, setShowHolidayListModal] = useState(false);
    const closeHolidayListModal = () => setShowHolidayListModal(false);


    const [selectedHolidays, setSelectedHolidays] = useState([]);
    const [newGroupName, setNewGroupName] = useState('');

    const handleShowHolidays = (holidays) => {
        setSelectedHolidays(holidays);
    };

    const handleGroupNameChange = (e) => {
        setNewGroupName(e.target.value);
    };

    const handleAddGroup = () => {
        if (newGroupName.trim()) {
            const newGroup = { name: newGroupName.trim(), holidays: [] };
            setHolidayGroups([...holidayGroups, newGroup]);
            setNewGroupName(''); // Clear the input field after adding
        }
    };

    return (
        <div className='holidayGroup'>
            <Header />
            <div className='holidayGroup-container'>

                {/* Top Section for Adding a New Group */}
                <div className='holiday-addGroup'>
                    <input
                        type="text"
                        id="group-name"
                        className="group-input"
                        value={newGroupName}
                        onChange={handleGroupNameChange}
                        placeholder="Enter Holiday Group Name"
                    />
                    <button className='add-group-button' onClick={handleAddGroup}>Create</button>
                </div>

                {/* Center Grid - Two side-by-side sections */}
                <div className='holidayGroup-grids'>

                    {/* Left side - HolidayGroup Table */}
                    <div className='holidayGroup-table-container'>
                        <h3>Holiday Group List</h3>
                        <table className="holidayGroup-table">
                            <thead>
                                <tr>
                                    <th>Group Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {holidayGroups.map((holidayGroup) => (
                                    <tr key={holidayGroup.name}>
                                        <td>{holidayGroup.name}</td>
                                        <td>
                                            <div className="button-container">
                                                <Tooltip title="Add Holiday To this Group" arrow>
                                                    <IconButton className="showHolidays-btn" style={{ padding: 4 }}
                                                        onClick={() => setShowHolidayListModal(true)}
                                                    >
                                                        <AddIcon fontSize="small" style={{ color: 'white' }} />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Show Holidays" arrow>
                                                    <IconButton
                                                        className="showHolidays-btn" style={{ padding: 4 }}

                                                        onClick={() => handleShowHolidays(holidayGroup.holidays)}
                                                    >
                                                        <VisibilityIcon fontSize="small" style={{ color: 'white' }} />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Delete Group" arrow>
                                                    <IconButton className="removeGroup-btn"
                                                        style={{ padding: 4 }}>
                                                        <DeleteIcon fontSize="small" style={{ color: 'white' }} />
                                                    </IconButton>
                                                </Tooltip>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Right side - Holiday List Table */}
                    <div className="holidaylist-table-container">
                        <h3>Holiday List</h3>
                        <table className="holidaylist-table">
                            <thead>
                                <tr>
                                    <th>Festival Name</th>
                                    <th>From Date</th>
                                    <th>To Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedHolidays.length > 0 ? (
                                    selectedHolidays.map((holiday, index) => (
                                        <tr key={index}>

                                            <td>{holiday.name}</td>
                                            <td>{holiday.fromDate}</td>
                                            <td>{holiday.toDate}</td>
                                            <td>

                                                <Tooltip title="Remove Holiday From Group" arrow>
                                                    <IconButton className="holiday-deselect-btn"
                                                        style={{ padding: 4 }}>
                                                        <DeleteIcon fontSize="small" style={{ color: 'white' }} />
                                                    </IconButton>
                                                </Tooltip>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4">Select a holiday group to see holidays</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {showHolidayListModal && (
                <AddHolidayInHolidayGroup
                    closeModal={closeHolidayListModal}  // Pass the closeModal function to the modal
                />
            )}
        </div>

    );
};

export default HolidayGroup;
