import React from 'react';
import './RequestAction.css';
import { Tooltip, IconButton } from '@mui/material';
import { Forward, Cancel, CheckCircle, Edit, Delete } from '@mui/icons-material';

// Dummy JSON Data
const jsonData = {
  "empNo": "12345",
  "empName": "John Doe",
  "department": "HR",
  "designation": "Manager",
  "details": {
    "Leave": {
      "fromDate": "2024-11-01",
      "toDate": "2024-11-05",
      "leaveName": "Casual Leave",
      "remark": "Urgent leave"
    },
    "Tour": {
      "fromDate": "2024-11-01",
      "toDate": "2024-11-05",
      "remark": "Official Work"
    },
    "SinglePunch": {
      "attendanceDate": "2024-11-01",
      "punchTime": "2024-11-05 6:33:49",
      "remark": "Forgot to Punch"
    },
    "Regularize": {
      "attendanceDate": "2024-11-01",
      "lateTime": "00:20:00",
      "earlyTime": "00:20:00",
      "remark": "Traffic jam"
    }
  }
};

const RequestAction = ({ selectedRequestedProposal }) => {
  const { empNo, empName, department, designation, details } = jsonData;

  // Set the applicationType manually for testing purposes
  const applicationType = 'Regularize'; // Change this value manually to 'Leave', 'Tour', 'SinglePunch', or 'Regularize'

  const applicationDetails = details[applicationType] || {};

  // Handler for Edit Button
  const handleEdit = () => {
    console.log("Edit clicked");
    // You can add logic to open an edit modal or redirect to an edit page
  };

  // Handler for Delete Button
  const handleDelete = () => {
    console.log("Delete clicked");
    // You can add logic to call an API to delete the application or confirm the deletion
  };

  return (
    <div className="req-RequestAction">
      <div className="req-requestAction-top-box">
        <div className="req-req-box req-requestAction-box1">
          <h2 className="req-h2">Application By</h2>
          <p className="req-p">Emp No: <span className="req-span">{empNo}</span></p>
          <p className="req-p">Emp Name: <span className="req-span">{empName}</span></p>
          <p className="req-p">Department: <span className="req-span">{department}</span></p>
          <p className="req-p">Designation: <span className="req-span">{designation}</span></p>
        </div>

        {/* Render Application Details dynamically */}
        {applicationDetails && (
          <div className="req-req-box req-requestAction-box2">
            <h2 className="req-h2">Application Details</h2>
            <p className="req-p">
              Application Type: <span className="req-span">{applicationType}</span>
            </p>
            {applicationType === 'Leave' && (
              <>
                <p className="req-p">From Date: <span className="req-span">{applicationDetails.fromDate}</span></p>
                <p className="req-p">To Date: <span className="req-span">{applicationDetails.toDate}</span></p>
                <p className="req-p">Leave Name: <span className="req-span">{applicationDetails.leaveName}</span></p>
              </>
            )}
            {applicationType === 'Tour' && (
              <>
                <p className="req-p">From Date: <span className="req-span">{applicationDetails.fromDate}</span></p>
                <p className="req-p">To Date: <span className="req-span">{applicationDetails.toDate}</span></p>
              </>
            )}
            {applicationType === 'SinglePunch' && (
              <>
                <p className="req-p">Attendance Date: <span className="req-span">{applicationDetails.attendanceDate}</span></p>
                <p className="req-p">Punch Time: <span className="req-span">{applicationDetails.punchTime}</span></p>
              </>
            )}
            {applicationType === 'Regularize' && (
              <>
                <p className="req-p">Attendance Date: <span className="req-span">{applicationDetails.attendanceDate}</span></p>
                <p className="req-p">Late Time: <span className="req-span">{applicationDetails.lateTime}</span></p>
                <p className="req-p">Early Time: <span className="req-span">{applicationDetails.earlyTime}</span></p>
              </>
            )}
            <p className="req-p">Remark: <span className="req-span">{applicationDetails.remark}</span></p>
          </div>
        )}

        <div className="req-req-box req-requestAction-box3">
          <h2 className="req-h2">Approval Status</h2>
          <p className="req-p">Application Status: <span className="req-span">Pending</span></p>
          <p className="req-p">Last Approver Name: <span className="req-span">N/A</span></p>
          <p className="req-p">Approver Remark: <span className="req-span">None</span></p>
        </div>
      </div>

      <div className="req-bottom-buttons">
        {selectedRequestedProposal === 'reportee' && (
          <>
            {/* Reportee Buttons */}
            <Tooltip title="Forward" arrow>
              <IconButton className="req-btn req-forward-btn">
                <Forward />
              </IconButton>
            </Tooltip>

            <Tooltip title="Reject" arrow>
              <IconButton className="req-btn req-reject-btn">
                <Cancel />
              </IconButton>
            </Tooltip>

            <Tooltip title="Approve" arrow>
              <IconButton className="req-btn req-approve-btn">
                <CheckCircle />
              </IconButton>
            </Tooltip>
          </>
        )}

        {selectedRequestedProposal === 'self' && (
          <>
            {/* Self Buttons */}
            <Tooltip title="Edit" arrow>
              <IconButton className="req-btn req-edit-btn" onClick={handleEdit}>
                <Edit />
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete" arrow>
              <IconButton className="req-btn req-delete-btn" onClick={handleDelete}>
                <Delete />
              </IconButton>
            </Tooltip>
          </>
        )}
      </div>
    </div>
  );
};

export default RequestAction;
