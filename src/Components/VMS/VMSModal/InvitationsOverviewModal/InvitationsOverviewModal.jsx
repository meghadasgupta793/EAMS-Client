import React, { useState } from 'react';
import './InvitationsOverviewModal.css';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Menu, MenuItem, TextField } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import VisibilityIcon from '@mui/icons-material/Visibility';

const InvitationsOverviewModal = ({ title, data, onClose, isLoading, error }) => {
    const [page, setPage] = useState(1);
    const itemsPerPage = 5;
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedInvitationId, setSelectedInvitationId] = useState(null);
    const [popup, setPopup] = useState(false);
    const [popupText, setPopupText] = useState('');
    const [actionType, setActionType] = useState(null);
    const [remark, setRemark] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [invitationActioned, setInvitationActioned] = useState([]);

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const handleNext = () => {
        if (endIndex < data.length) setPage(page + 1);
    };

    const handlePrevious = () => {
        if (page > 1) setPage(page - 1);
    };

    const handleMenuClick = (event, invitationId) => {
        if (isPopupOpen) return;
        setAnchorEl(event.currentTarget);
        setSelectedInvitationId(invitationId);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedInvitationId(null);
    };

    const handlePopupConfirm = () => {
        setInvitationActioned([...invitationActioned, selectedInvitationId]);
        setIsPopupOpen(false);
        setPopup(false);
        setSelectedInvitationId(null);
        setRemark('');
    };

    const handlePopupCancel = () => {
        setIsPopupOpen(false);
        setPopup(false);
        setSelectedInvitationId(null);
        setRemark('');
    };

    const handleApprove = (invitationId) => {
        setIsPopupOpen(true);
        setPopupText('Are you sure you want to approve this invitation?');
        setActionType('approve');
        setPopup(true);
        setSelectedInvitationId(invitationId);
    };

    const handleReject = (invitationId) => {
        setIsPopupOpen(true);
        setPopupText('Are you sure you want to reject this invitation?');
        setActionType('reject');
        setPopup(true);
        setSelectedInvitationId(invitationId);
    };

    const renderButtons = (invitation) => {
        if (title === "Pending Invitation" || title === "Confirmed Invitation") {
            return (
                <>
                    <MenuItem onClick={() => handleReject(invitation.id)}>
                        <CancelOutlinedIcon className="action-btn reject-btn" /> Cancel
                    </MenuItem>
                    <MenuItem onClick={() => handleApprove(invitation.id)}>
                        <CheckCircleIcon className="action-btn approve-btn" /> Re-Schedule
                    </MenuItem>
                </>
            );
        }

        if (title === "Expired Invitation" || title === "Unattended Invitation") {
            return (
                <MenuItem onClick={() => handleApprove(invitation.id)}>
                    <VisibilityIcon className="action-btn approve-btn" /> View Details
                </MenuItem>
            );
        }

        return null;
    };

    return (
        <div className="modal-overlay">
            <div className="InvitationsOverviewModal-container">
                <div className="InvitationsOverviewModal-header-container">
                    <h1 className="InvitationsOverviewModal-heading">{title}</h1>
                    <div className="InvitationsOverviewModal-icon-container">
                        <Tooltip title="Search">
                            <IconButton>
                                <SearchIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Download List">
                            <IconButton>
                                <DownloadIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Close">
                            <IconButton onClick={onClose}>
                                <CancelIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>

                {/* Display error message if there's an error */}
                {error && <p className="error-message">{error}</p>}

                {/* Display loading spinner if data is being fetched */}
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        {/* Table structure */}
                        <table className="InvitationsOverviewModal-Table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Visitor Name</th>
                                    <th>Contact No</th>
                                    <th>Email</th>
                                    <th>Invitation By</th>
                                    <th>Department</th>
                                    <th>Appointment Start</th>
                                    <th>Visitor Approval</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.length > 0 ? (
                                    data.slice(startIndex, endIndex).map((invitation, index) => (
                                        <tr key={index}>
                                            <td>{invitation.Id}</td>
                                            <td>{invitation.VisitorName}</td>
                                            <td>{invitation.MobileNo}</td>
                                            <td>{invitation.email}</td>
                                            <td>{invitation.EmployeeName}</td>
                                            <td>{invitation.Department}</td>
                                            <td>{invitation.StartTime}</td>
                                            <td>{invitation.InvitationStatus}</td>
                                            <td>
                                                <Tooltip title="More options">
                                                    <IconButton onClick={(event) => handleMenuClick(event, invitation.id)}>
                                                        <MoreVertIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                {selectedInvitationId === invitation.id && !popup && (
                                                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                                                        {renderButtons(invitation)}
                                                    </Menu>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="9" className="no-data-message">
                                            No data available
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        {/* Pagination controls */}
                        <div className="pagination-container">
                            {page > 1 && <button onClick={handlePrevious}>Previous</button>}
                            <span>{page}</span>
                            {endIndex < data.length && <button onClick={handleNext}>Next</button>}
                        </div>
                    </>
                )}

                {/* Popup for actions */}
                {popup && (
                    <div className="popup-overlay">
                        <div className="popup-container">
                            <h3>{popupText}</h3>
                            <TextField label="Remark" multiline rows={4} value={remark} onChange={(e) => setRemark(e.target.value)} variant="outlined" fullWidth />
                            <div className="popup-buttons">
                                <button onClick={handlePopupConfirm} className="confirm-btn">Confirm</button>
                                <button onClick={handlePopupCancel} className="cancel-btn">Cancel</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InvitationsOverviewModal;