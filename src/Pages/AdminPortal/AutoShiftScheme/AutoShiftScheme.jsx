import React, { useState, useEffect } from "react";
import './AutoShiftScheme.css';
import Header from '../../../Components/Header/Header';
import { Tooltip, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCreateAutoShiftGroupMutation, useDeleteAutoShiftGroupMutation, useGetAllAutoShiftGroupQuery, useUnAssignAutoShiftMutation } from "../../../Redux/api/admin/shiftApi";
import AssignShiftInAutoShiftGroup from "../../../Components/Admin/Modals/AssignShiftInAutoShiftGroup/AssignShiftInAutoShiftGroup";

// Function to format timestamps into "HH:mm"
const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
};

const AutoShiftScheme = () => {

  const [createAutoShiftGroup, { isLoading: isCreating }] = useCreateAutoShiftGroupMutation();
  const { data, error, isLoading } = useGetAllAutoShiftGroupQuery();
  const [deleteAutoShiftGroup] = useDeleteAutoShiftGroupMutation();

  const [unAssignAutoShift, { isLoading: isUnassining }] = useUnAssignAutoShiftMutation();
  const [shiftSchemes, setShiftSchemes] = useState([]);
  const [newSchemeName, setNewSchemeName] = useState('');
  const [selectedShifts, setSelectedShifts] = useState([]);
  const [selectedSchemeId, setSelectedSchemeId] = useState(null);
  const [selectedSchemeName, setSelectedSchemeName] = useState('');

  /////Navigate
  const [showAssignShiftModal, setShowAssignShiftModal] = useState(false);
  // Handle modal close
  const closeAssignShiftModal = () => setShowAssignShiftModal(false);



  useEffect(() => {
    if (data && data.data) {
      setShiftSchemes(data.data); // Directly set the API response
    }
  }, [data]);



  /////handleDeleteAutoShifGroup
  const handleDeleteAutoShiftGroup = async (id) => {
    try {
      const response = await deleteAutoShiftGroup(id).unwrap();
      alert(response.message);
    } catch (err) {
      alert(err?.data?.message || "Error deleting AutoShiftGroup");
    }
  };


  const handleRemoveShift = async (shiftCode) => {
    try {
      await unAssignAutoShift({ shiftCode, AutoShiftGroupID: selectedSchemeId }).unwrap();
      setSelectedShifts(selectedShifts.filter((shift) => shift.shiftCode !== shiftCode));
    } catch (err) {
      console.error("Failed to remove shift:", err);
    }
  };

  const handleAddScheme = async () => {
    if (newSchemeName.trim()) {
      try {
        const response = await createAutoShiftGroup({ AutoShiftGroup: newSchemeName.trim() }).unwrap();
        setShiftSchemes([...shiftSchemes, { id: response.id, name: newSchemeName.trim(), shifts: [] }]);
        setNewSchemeName('');
      } catch (error) {
        console.error("Error creating AutoShift group:", error);
      }
    }
  };



  // Handle selecting a shift scheme to show its shifts
  const handleShowShifts = (shifts, schemeName, schemeId) => {
    setSelectedShifts(shifts);
    setSelectedSchemeName(schemeName);
    setSelectedSchemeId(schemeId);
  };


  return (
    <div className='autoShiftScheme'>
      <Header />
      <div className='autoShiftScheme-container'>
        <div className='scheme-add'>
          <input
            type="text"
            className="scheme-input"
            value={newSchemeName}
            onChange={(e) => setNewSchemeName(e.target.value)}
            placeholder="Enter Shift Scheme Name"
          />
          <button className='add-scheme-button' onClick={handleAddScheme}>Add</button>
        </div>

        {isLoading ? (
          <p>Loading shift schemes...</p>
        ) : error ? (
          <p>Error loading shift schemes</p>
        ) : (
          <div className='scheme-grids'>
            <div className='scheme-table-container'>
              <h3 className="scheme-title">Shift Schemes</h3>
              <table className="scheme-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {shiftSchemes.map((scheme) => (
                    <tr key={scheme.id}>
                      <td>{scheme.id}</td>
                      <td>{scheme.name}</td>
                      <td>
                        <div className="button-container">
                          <Tooltip title="Add Shift To this Group" arrow>
                            <IconButton className="showShift-btn" style={{ padding: 4 }}
                              onClick={() => {
                                setSelectedSchemeId(scheme.id); // Set Group ID
                                setShowAssignShiftModal(true);
                              }}
                            >
                              <AddIcon fontSize="small" style={{ color: 'white' }} />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Show Shifts" arrow>
                            <IconButton className="showShift-btn"
                              onClick={() => handleShowShifts(scheme.shifts, scheme.name, scheme.id)}
                              style={{ padding: 4 }}>
                              <VisibilityIcon fontSize="small" style={{ color: 'white' }} />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Delete Scheme" arrow>
                            <IconButton
                              className="deleteScheme-btn"
                              onClick={() => handleDeleteAutoShiftGroup(scheme.id)}
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

            <div className="shift-table-container">
              <div className="shift-table-Header-container">
                <h3 className="shift-table-title">Shifts for</h3>
                <h3 className="shift-table-groupName"> {selectedSchemeName || "Select a scheme"}</h3>
              </div>
              <table className="shift-table">
                <thead>
                  <tr>
                    <th>Shift Code</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Entry Threshold</th>
                    <th>End Threshold</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedSchemeName && selectedSchemeName !== "Select a scheme" ? (
                    selectedShifts.length > 0 ? (
                      selectedShifts.map((shift) => (
                        <tr key={shift.shiftCode}>
                          <td>{shift.shiftCode}</td>

                          <td>{shift.startTime}</td>
                          <td>{shift.endTime}</td>
                          <td>{shift.entryThreshold}</td>
                          <td>{shift.endThreshold}</td>
                          <td>
                            <Tooltip title="Remove Shift From this scheme" arrow>
                              <IconButton
                                className="deselect-btn"
                                onClick={() => handleRemoveShift(shift.shiftCode, selectedSchemeId)} // Add the mutation trigger here
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
                        <td colSpan="6">No shifts found for this scheme</td>
                      </tr>
                    )
                  ) : (
                    <tr>
                      <td colSpan="6">Select a scheme to view shifts</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

        {/* Modal for Assign Shift In Auto Shift group */}
        {showAssignShiftModal && (
                <AssignShiftInAutoShiftGroup
                    closeModal={closeAssignShiftModal}
                    id={selectedSchemeId}  // Pass the selected HolidayGroupId
                    AutoShiftGroupName={selectedSchemeName}
                />
            )}
    </div>
  );
};

export default AutoShiftScheme;
