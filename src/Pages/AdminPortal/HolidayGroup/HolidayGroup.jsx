import React, { useState } from "react";
import './holidayGroup.css';
import Header from '../../../Components/Header/Header';
import { Tooltip, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import AddHolidayInHolidayGroup from "../../../Components/Admin/Modals/AddHolidayInHolidayGroup/AddHolidayInHolidayGroup";
import { useCreateHolidayGroupMutation, useDeleteHolidayGroupMutation, useGetAllHolidayGroupQuery, useUnAssignHolidayFromAHolidayGroupMutation } from "../../../Redux/api/admin/holidayApi";

const HolidayGroup = () => {
    const { data, error, isLoading } = useGetAllHolidayGroupQuery();
    const [createHolidayGroup, { isLoading: isCreating }] = useCreateHolidayGroupMutation();
    const [unassingHolidayFromGroup, { isLoading: isUnassining }] = useUnAssignHolidayFromAHolidayGroupMutation();
    const [deleteHolidayGroup] = useDeleteHolidayGroupMutation();
    const [showHolidayListModal, setShowHolidayListModal] = useState(false);
    const [selectedHolidays, setSelectedHolidays] = useState([]);
    const [newGroupName, setNewGroupName] = useState('');
    const [selectedHolidayGroupId, setSelectedHolidayGroupId] = useState(null);
    const [selectedHolidayGroupName, setSelectedHolidayGroupName] = useState('');

    // Handle modal close
    const closeHolidayListModal = () => setShowHolidayListModal(false);

    // Handle showing holidays for a selected group
    const handleShowHolidays = (holidays, groupName, Groupid) => {
        setSelectedHolidays(holidays);
        setSelectedHolidayGroupName(groupName);  // ✅ Now correctly setting the group name
        setSelectedHolidayGroupId(Groupid);
    };


    console.log(selectedHolidayGroupId)
    // Handle group name input change
    const handleGroupNameChange = (e) => {
        setNewGroupName(e.target.value);
    };

    // Handle creating a new holiday group
    const handleAddGroup = async () => {
        if (newGroupName.trim()) {
            try {
                await createHolidayGroup({ Name: newGroupName.trim() }).unwrap();
                setNewGroupName(''); // Clear input after successful creation
            } catch (error) {
                console.error("Error creating holiday group:", error);
            }
        }
    };

    // Function to unassign holiday
    const handleUnAssignHoliday = async (HolidayID, GroupID) => {
        try {
            await unassingHolidayFromGroup({
                GroupID,
                HolidayID
            }).unwrap();
            alert("Holiday unassigned successfully!");


            // Remove the holiday from the list after unassignment
            setSelectedHolidays((prev) => prev.filter((holiday) => holiday.id !== HolidayID));
        } catch (err) {
            console.error("Error unassigning holiday:", err);
            alert("Failed to unassign holiday.");
        }
    };



    /////handleDeleteHolidayGroup
    const handleDeleteHolidayGroup = async (id) => {
        try {
            const response = await deleteHolidayGroup(id).unwrap(); // Ensure proper handling
            alert(response.message); // Show success message
        } catch (err) {
            // Check if the error contains a response message from the API
            if (err?.data?.message) {
                alert(err.data.message); // Display specific API error message
            } else {
                alert("Error deleting HolidayGroup"); // Generic fallback message
            }
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
                        disabled={isCreating}
                    />
                    <button
                        className='add-group-button'
                        onClick={handleAddGroup}
                        disabled={isCreating}
                    >
                        {isCreating ? "Creating..." : "Create"}
                    </button>
                </div>

                {/* Center Grid - Two side-by-side sections */}
                <div className='holidayGroup-grids'>

                    {/* Left Side - Holiday Group Table */}
                    <div className='holidayGroup-table-container'>
                        <h3 className="holidayGroup-title">Holiday Group List</h3>

                        {isLoading ? (
                            <p>Loading holiday groups...</p>
                        ) : error ? (
                            <p>Error fetching holiday groups</p>
                        ) : (
                            <table className="holidayGroup-table">
                                <thead>
                                    <tr><th>GroupID</th>
                                        <th>Group Name</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.data?.map((holidayGroup) => (
                                        <tr key={holidayGroup.id}> {/* Using ID as key */}
                                            <td>{holidayGroup.id}</td> {/* GroupID */}
                                            <td>{holidayGroup.name}</td> {/* GroupName */}
                                            <td>
                                                <div className="button-container">
                                                    <Tooltip title="Add Holiday To this Group" arrow>
                                                        <IconButton className="showHolidays-btn"
                                                            style={{ padding: 4 }}
                                                            onClick={() => {
                                                                setSelectedHolidayGroupId(holidayGroup.id); // Set Group ID
                                                                setShowHolidayListModal(true);
                                                            }}
                                                        >
                                                            <AddIcon fontSize="small" style={{ color: 'white' }} />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Show Holidays" arrow>
                                                        <IconButton
                                                            className="showHolidays-btn"
                                                            style={{ padding: 4 }}
                                                            onClick={() => handleShowHolidays(holidayGroup.holidays, holidayGroup.name, holidayGroup.id)} // ✅ Pass both holidays & group name
                                                        >
                                                            <VisibilityIcon fontSize="small" style={{ color: 'white' }} />
                                                        </IconButton>



                                                    </Tooltip>
                                                    <Tooltip title="Delete Group" arrow>
                                                        <IconButton className="removeGroup-btn"
                                                            style={{ padding: 4 }}>
                                                            <DeleteIcon fontSize="small"
                                                                onClick={() => handleDeleteHolidayGroup(holidayGroup.id)}
                                                                style={{ color: 'white' }} />
                                                        </IconButton>
                                                    </Tooltip>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>

                    {/* Right Side - Holiday List Table */}
                    <div className="holidaylist-table-container">
                        <div className="holidaylist-Header-container">
                            <h3 className="holidaylist-title">Holiday List For</h3>
                            <h3 className="holidaylist-groupName">{selectedHolidayGroupName || "Select a group"}</h3>

                        </div>
                        <table className="holidaylist-table">
                            <thead>
                                <tr>
                                    <th>HolidayId</th>
                                    <th>Festival Name</th>
                                    <th>From Date</th>
                                    <th>To Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedHolidayGroupName && selectedHolidayGroupName !== "Select a group" ? (
                                    selectedHolidays.length > 0 ? (
                                        selectedHolidays.map((holiday) => (
                                            <tr key={holiday.id}> {/* Using HolidayID as key */}
                                                <td>{holiday.id}</td> {/* HolidayID */}
                                                <td>{holiday.name}</td> {/* Festival Name */}
                                                <td>{holiday.fromDate}</td> {/* From Date */}
                                                <td>{holiday.toDate}</td> {/* To Date */}
                                                <td>
                                                    <Tooltip title="Remove Holiday From Group" arrow>
                                                        <IconButton
                                                            className="deselect-btn"
                                                            onClick={() => handleUnAssignHoliday(holiday.id, selectedHolidayGroupId)}
                                                            disabled={isUnassining}
                                                            style={{ padding: 4 }}
                                                        >
                                                            <DeleteIcon fontSize="small" style={{ color: 'white' }} />
                                                        </IconButton>
                                                    </Tooltip>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5">No holiday is found for this selected holiday group</td>
                                        </tr>
                                    )
                                ) : (
                                    <tr>
                                        <td colSpan="5">Select a holiday group to see holidays</td>
                                    </tr>
                                )}
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>

            {/* Modal for Adding Holidays */}
            {showHolidayListModal && (
                <AddHolidayInHolidayGroup
                    closeModal={closeHolidayListModal}
                    id={selectedHolidayGroupId}  // Pass the selected HolidayGroupId
                    HolidayGroupName={selectedHolidayGroupName}
                />
            )}
        </div>
    );
};

export default HolidayGroup;
