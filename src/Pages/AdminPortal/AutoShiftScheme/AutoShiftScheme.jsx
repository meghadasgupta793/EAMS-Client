import React, { useState } from "react";
import './AutoShiftScheme.css';
import Header from '../../../Components/Header/Header';

const AutoShiftScheme = () => {
  const [groupName, setGroupName] = useState("");
  const [shifts, setShifts] = useState([
    { name: "Shift A", startTime: "06:00", endTime: "14:00" },
    { name: "Shift B", startTime: "14:00", endTime: "22:00" },
    { name: "Shift C", startTime: "22:00", endTime: "06:00" }
  ]);
  const [selectedShifts, setSelectedShifts] = useState([]);

  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
  };

  // Function to select a shift and move it to selected shifts
  const selectShift = (shift) => {
    setSelectedShifts([...selectedShifts, shift]); // Add to selected shifts
    setShifts(shifts.filter(s => s.name !== shift.name)); // Remove from available shifts
  };

  // Function to deselect a shift and move it back to available shifts
  const deselectShift = (shift) => {
    setShifts([...shifts, shift]); // Add back to available shifts
    setSelectedShifts(selectedShifts.filter(s => s.name !== shift.name)); // Remove from selected shifts
  };

  return (
    <div className="auto-shift-scheme">
      <Header />
      <div className="auto-shift-scheme-container">
        {/* Top Grid - Group Name */}
      
        <div className="shift-group-name">
          <label htmlFor="groupName">AutoShift Group Name: </label>
          <input
            type="text"
            id="groupName"
            className="form-control"
            value={groupName}
            onChange={handleGroupNameChange}
            placeholder="Enter Group Name"
          />
        </div>

        {/* Center Grid - Two side by side sections */}
        <div className="shift-grids">
          {/* Left side - Shift Table */}
          <div className="shift-table-container">
            <h3>Shift</h3>
            <table className="shift-table">
              <thead>
                <tr>
                  <th>Shift</th>
                  <th>Start</th>
                  <th>End</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {shifts.map((shift) => (
                  <tr key={shift.name}>
                    <td>{shift.name}</td>
                    <td>{shift.startTime}</td>
                    <td>{shift.endTime}</td>
                    <td>
                      <button className="shift-btn"
                        onClick={() => selectShift(shift)}
                      >
                        Select
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Right side - Selected Shifts Table */}
          <div className="selected-shifts-container">
            <h3>Selected Shifts</h3>
            <table className="shift-table">
              <thead>
                <tr>
                  <th>Shift</th>
                  <th>Start</th>
                  <th>End</th>
                  <th>Entry Threshold</th>
                  <th>End Threshold</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {selectedShifts.map((shift, index) => (
                  <tr key={index}>
                    <td>{shift.name}</td>
                    <td>{shift.startTime}</td>
                    <td>{shift.endTime}</td>
                    <td>
                      <input
                        type="time"
                        step="60"
                        onChange={(e) => console.log("Entry Threshold:", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="time"
                        step="60"
                        onChange={(e) => console.log("End Threshold:", e.target.value)}
                      />
                    </td>
                    <td>
                      <button className="shift-deselect-btn" onClick={() => deselectShift(shift)}>Deselect</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Section - Save and Cancel Buttons */}
        <div className="btn-section">
          <button className="cancel-btn">Cancel</button>
          <button className="save-btn" onClick={() => console.log("Save data")}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default AutoShiftScheme;
