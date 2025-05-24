import React from 'react';
import './RequestAction.css';
import { Tooltip, IconButton } from '@mui/material';
import { Forward, Cancel, CheckCircle, Edit, Delete } from '@mui/icons-material';

const RequestAction = ({ selectedRequestedProposal, requestData, onClose }) => {
    // Parse the requestParam JSON string
    const requestParams = requestData?.requestParam ? JSON.parse(requestData.requestParam) : {};
    
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

    if (!requestData) {
        return <div>No request data available</div>;
    }

    // Format date for display
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    };

    // Function to render fields based on request type
    const renderRequestSpecificFields = () => {
        switch(requestData.requestType) {
            case 'LeaveApply':
                return (
                    <>
                        <p className="req-p">Leave Type: <span className="req-span">{requestParams.LeaveType || 'N/A'}</span></p>
                        <p className="req-p">From Date: <span className="req-span">{formatDate(requestData.fromDate)}</span></p>
                        <p className="req-p">To Date: <span className="req-span">{formatDate(requestData.toDate)}</span></p>
                        <p className="req-p">Half Day: <span className="req-span">{requestParams.HalfDay ? 'Yes' : 'No'}</span></p>
                    </>
                );
            case 'TourApply':
                return (
                    <>
                        <p className="req-p">From Date: <span className="req-span">{formatDate(requestData.fromDate)}</span></p>
                        <p className="req-p">To Date: <span className="req-span">{formatDate(requestData.toDate)}</span></p>
                    </>
                );
            case 'LateInRegularize':
                return (
                    <>
                        <p className="req-p">Date: <span className="req-span">{formatDate(requestData.fromDate)}</span></p>
                        <p className="req-p">Late Minutes: <span className="req-span">{requestParams.LateMinutes || 'N/A'}</span></p>
                    </>
                );
            case 'EarlyOutRegularize':
                return (
                    <>
                        <p className="req-p">Date: <span className="req-span">{formatDate(requestData.fromDate)}</span></p>
                        <p className="req-p">Early Minutes: <span className="req-span">{requestParams.EarlyMinutes || 'N/A'}</span></p>
                    </>
                );
            case 'LateEarlyRegularize':
                return (
                    <>
                        <p className="req-p">Date: <span className="req-span">{formatDate(requestData.fromDate)}</span></p>
                        <p className="req-p">Late Minutes: <span className="req-span">{requestParams.LateMinutes || 'N/A'}</span></p>
                        <p className="req-p">Early Minutes: <span className="req-span">{requestParams.EarlyMinutes || 'N/A'}</span></p>
                    </>
                );
            case 'SinglePunchRegularize':
                return (
                    <>
                        <p className="req-p">Date: <span className="req-span">{formatDate(requestData.fromDate)}</span></p>
                        <p className="req-p">Punch Time: <span className="req-span">{requestParams.PunchTime || 'N/A'}</span></p>
                        <p className="req-p">Is Swapped: <span className="req-span">{requestParams.IsSwaped ? 'Yes' : 'No'}</span></p>
                    </>
                );
            default:
                return (
                    <>
                        <p className="req-p">From Date: <span className="req-span">{formatDate(requestData.fromDate)}</span></p>
                        {requestData.toDate && (
                            <p className="req-p">To Date: <span className="req-span">{formatDate(requestData.toDate)}</span></p>
                        )}
                    </>
                );
        }
    };

    return (
        <div className="req-RequestAction">
            <div className="req-requestAction-top-box">
                <div className="req-req-box req-requestAction-box1">
                    <h2 className="req-h2">Application By</h2>
                    <p className="req-p">Emp No: <span className="req-span">{requestData.empNo || 'N/A'}</span></p>
                    <p className="req-p">Emp Name: <span className="req-span">{requestData.name || 'N/A'}</span></p>
                    <p className="req-p">Department: <span className="req-span">{requestData.department || 'N/A'}</span></p>
                    <p className="req-p">Designation: <span className="req-span">{requestData.designation || 'N/A'}</span></p>
                    <p className="req-p">OU Name: <span className="req-span">{requestData.oUName || 'N/A'}</span></p>
                </div>

                <div className="req-req-box req-requestAction-box2">
                    <h2 className="req-h2">Application Details</h2>
                    <p className="req-p">Request ID: <span className="req-span">{requestData.requestProposalID || 'N/A'}</span></p>
                    <p className="req-p">Request Type: <span className="req-span">
                        {requestData.requestType === 'LeaveApply' ? 'Leave Application' :
                         requestData.requestType === 'TourApply' ? 'Tour Application' :
                         requestData.requestType === 'LateInRegularize' ? 'Late In Regularization' :
                         requestData.requestType === 'EarlyOutRegularize' ? 'Early Out Regularization' :
                         requestData.requestType === 'LateEarlyRegularize' ? 'Late/Early Regularization' :
                         requestData.requestType === 'SinglePunchRegularize' ? 'Single Punch Regularization' :
                         requestData.requestType}
                    </span></p>
                    
                    {renderRequestSpecificFields()}
                    
                    <p className="req-p">Remarks: <span className="req-span">{requestData.remarks || 'None'}</span></p>
                </div>

                <div className="req-req-box req-requestAction-box3">
                    <h2 className="req-h2">Approval Status</h2>
                    <p className="req-p">Status: <span className="req-span">{requestData.approvalStatus || 'Pending'}</span></p>
                    <p className="req-p">Approval Level: <span className="req-span">{requestData.approvalLevel || 'N/A'}</span></p>
                    <p className="req-p">Last Approver: <span className="req-span">{requestData.lastApprover || 'N/A'}</span></p>
                    <p className="req-p">Approver Emp No: <span className="req-span">{requestData.lastApproverEmpNo || 'N/A'}</span></p>
                    <p className="req-p">Approver Remarks: <span className="req-span">{requestData.lastApprovalRemarks || 'None'}</span></p>
                    {requestData.lastApprovalDoneOn && (
                        <p className="req-p">Approved On: <span className="req-span">{formatDate(requestData.lastApprovalDoneOn)}</span></p>
                    )}
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