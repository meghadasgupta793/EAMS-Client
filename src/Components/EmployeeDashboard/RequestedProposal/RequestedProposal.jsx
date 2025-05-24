import React, { useState, useEffect, useContext } from 'react';
import './RequestedProposal.css';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import { ToggleButtonGroup, ToggleButton, Tooltip, IconButton, Modal, Box, CircularProgress } from '@mui/material';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import VisibilityIcon from '@mui/icons-material/Visibility';
import RequestAction from '../../Modal/EmployeeModal/RequestAction/RequestAction';
import { UserContext } from '../../../StoreContext/UserContext';
import { usePendingForApprovalQuery, useMyRequestProposalQuery } from '../../../Redux/api/ess/requestProposalAPI';

const ITEMS_PER_PAGE = 3;

const RequestedProposal = () => {
    const { userInfo } = useContext(UserContext);
    const [selectedRequestedProposal, setSelectedRequestedProposal] = useState('self');
    const [page, setPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);

    // API hooks
    const { 
        data: pendingForApprovalData = { data: [] }, 
        isLoading: isApprovalsLoading, 
        isError: isApprovalsError,
        refetch: refetchApprovals 
    } = usePendingForApprovalQuery({ EmployeeId: userInfo?.EmployeeId || '' }, {
        skip: !userInfo?.EmployeeId
    });

    const { 
        data: myRequestProposalData = { data: [] }, 
        isLoading: isRequestsLoading, 
        isError: isRequestsError,
        refetch: refetchRequests 
    } = useMyRequestProposalQuery({ EmployeeId: userInfo?.EmployeeId || '' }, {
        skip: !userInfo?.EmployeeId
    });

    useEffect(() => {
        if (userInfo?.EmployeeId) {
            refetchApprovals();
            refetchRequests();
        }
    }, [userInfo, refetchApprovals, refetchRequests]);

    const handleToggleChange = (event, newValue) => {
        if (newValue) {
            setSelectedRequestedProposal(newValue);
            setPage(1);
        }
    };

    const handleOpenModal = (request) => {
        setSelectedRequest(request);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedRequest(null);
        refetchApprovals();
        refetchRequests();
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    };

    const getData = () => {
        if (selectedRequestedProposal === 'reportee') {
            return pendingForApprovalData?.data || [];
        }
        return myRequestProposalData?.data || [];
    };

    const filteredData = getData();
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const dataToDisplay = filteredData.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

    const handleNext = () => {
        if (page < totalPages) {
            setPage(prev => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (page > 1) {
            setPage(prev => prev - 1);
        }
    };

    if (isApprovalsLoading || isRequestsLoading) {
        return (
            <div className="loading-container">
                <CircularProgress />
            </div>
        );
    }

    if (isApprovalsError || isRequestsError) {
        return (
            <div className="error-message">
                Error loading data. Please try again later.
            </div>
        );
    }

    return (
        <div className='requestedProposal-container'>
            <div className='requestedProposal-header-container'>
                <h1 className='requestedProposal-heading'>Requested Proposal</h1>
                <div className='requestedProposal-icon-container'>
                    <ToggleButtonGroup
                        value={selectedRequestedProposal}
                        exclusive
                        onChange={handleToggleChange}
                        aria-label="request type filter"
                        className="toggle-buttons"
                    >
                        <Tooltip title="My Requests" arrow>
                            <ToggleButton value="self" aria-label="self">
                                <PersonIcon />
                            </ToggleButton>
                        </Tooltip>
                        <Tooltip title="Team Approvals" arrow>
                            <ToggleButton value="reportee" aria-label="reportee">
                                <GroupsIcon />
                            </ToggleButton>
                        </Tooltip>
                    </ToggleButtonGroup>
                </div>
            </div>
            
            <table className="requestedProposal-table">
                <thead>
                    <tr>
                        {selectedRequestedProposal === 'reportee' && <th>Name</th>}
                        <th>Request Type</th>
                        <th>Date Range</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.length > 0 ? (
                        dataToDisplay.map((item, index) => (
                            <tr key={index}>
                                {selectedRequestedProposal === 'reportee' && <td>{item.name}</td>}
                                <td>{item.requestType || 'N/A'}</td>
                                <td>
                                    {item.fromDate && item.toDate 
                                        ? `${formatDate(item.fromDate)} - ${formatDate(item.toDate)}`
                                        : 'N/A'}
                                </td>
                                <td>{item.approvalStatus || 'N/A'}</td>
                                <td>
                                    <Tooltip title="View Details">
                                        <IconButton 
                                            onClick={() => handleOpenModal(item)}
                                            disabled={!item.requestProposalID}
                                        >
                                            <VisibilityIcon className='view-btn' />
                                        </IconButton>
                                    </Tooltip>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr className="empty-row">
                            <td colSpan={selectedRequestedProposal === 'reportee' ? 5 : 4}>
                                Request Not Found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {filteredData.length > 0 && totalPages > 1 && (
                <div className='pagination-container'>
                    <IconButton 
                        onClick={handlePrevious} 
                        disabled={page === 1}
                    >
                        <KeyboardDoubleArrowLeftIcon className='pagination-btn' />
                    </IconButton>
                    <span>Page {page} of {totalPages}</span>
                    <IconButton 
                        onClick={handleNext} 
                        disabled={page === totalPages}
                    >
                        <KeyboardDoubleArrowRightIcon className='pagination-btn' />
                    </IconButton>
                </div>
            )}

            <Modal
                open={isModalOpen}
                onClose={handleCloseModal}
                aria-labelledby="request-action-modal"
                aria-describedby="request-action-description"
            >
                <Box className="modal-box">
                    {selectedRequest && (
                        <RequestAction 
                            selectedRequestedProposal={selectedRequestedProposal} 
                            requestData={selectedRequest}
                            onClose={handleCloseModal}
                        />
                    )}
                </Box>
            </Modal>
        </div>
    );
};

export default RequestedProposal;