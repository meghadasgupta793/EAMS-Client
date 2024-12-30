import React, { useState } from 'react';
import './RequestedProposal.css';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import { ToggleButtonGroup, ToggleButton, Tooltip, IconButton, Modal, Box } from '@mui/material';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import VisibilityIcon from '@mui/icons-material/Visibility';
import RequestAction from '../../Modal/EmployeeModal/RequestAction/RequestAction';

const ITEMS_PER_PAGE = 3;

const RequestedProposal = () => {
    const [selectedRequestedProposal, setSelectedRequestedProposal] = useState('self');
    const [page, setPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility


    const handleToggleChange = (event, newValue) => {
        if (newValue) {
            setSelectedRequestedProposal(newValue);
            setPage(1); // Reset to first page when type changes
        }
    };


    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };




    // Dummy data for reportee requests
    const reporteeData = [
        { name: 'Nidhu Ram Mandal', requestType: 'TourApply', dateRange: 'May 7, 2024 - May 16, 2024', status: 'Pending' },
        { name: 'Nidhu Ram Mandal', requestType: 'LeaveApply', dateRange: 'Jul 4, 2024 - Jul 4, 2024', status: 'Pending' },
        { name: 'John Doe', requestType: 'LeaveApply', dateRange: 'Aug 1, 2024 - Aug 1, 2024', status: 'Approved' },
        { name: 'Jane Smith', requestType: 'TourApply', dateRange: 'Sep 10, 2024 - Sep 20, 2024', status: 'Pending' }
    ];

    // Dummy data for self requests
    const selfData = [
        { requestType: 'LeaveApply', dateRange: 'Jun 1, 2024 - Jun 5, 2024', status: 'Approved' },
        { requestType: 'TourApply', dateRange: 'Jul 1, 2024 - Jul 10, 2024', status: 'Pending' },
        { requestType: 'LeaveApply', dateRange: 'Sep 1, 2024 - Sep 1, 2024', status: 'Approved' },
        { requestType: 'TourApply', dateRange: 'Oct 1, 2024 - Oct 5, 2024', status: 'Pending' }
    ];

    // Function to get the correct data based on selected type
    const getData = () => {
        return selectedRequestedProposal === 'reportee' ? reporteeData : selfData;
    };

    const filteredData = getData();
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const dataToDisplay = filteredData.slice(startIndex, endIndex);

    const handleNext = () => {
        if (endIndex < filteredData.length) {
            setPage((prev) => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (page > 1) {
            setPage((prev) => prev - 1);
        }
    };

    return (
        <div className='requestedProposal-container'>
            <div className='requestedProposal-header-container'>
                <h1 className='requestedProposal-heading'>Requested Proposal</h1>
                <div className='requestedProposal-icon-container'>
                    {reporteeData.length === 0 ? (
                        <Tooltip title="Self" arrow>
                            <ToggleButton value="self" aria-label="self">
                                <PersonIcon />
                            </ToggleButton>
                        </Tooltip>
                    ) : (
                        <ToggleButtonGroup
                            value={selectedRequestedProposal}
                            exclusive
                            onChange={handleToggleChange}
                            aria-label="occasion filter"
                            className="toggle-buttons"
                        >
                            <Tooltip title="Self" arrow>
                                <ToggleButton value="self" aria-label="self">
                                    <PersonIcon />
                                </ToggleButton>
                            </Tooltip>
                            <Tooltip title="Reportee" arrow>
                                <ToggleButton value="reportee" aria-label="reportee">
                                    <GroupsIcon />
                                </ToggleButton>
                            </Tooltip>
                        </ToggleButtonGroup>
                    )}
                </div>
            </div>
            <table className="requestedProposal-table">
                <thead>
                    <tr>
                        {selectedRequestedProposal === 'reportee' ? (
                            <>
                                <th>Name</th>
                                <th>Request Type</th>
                                <th>From Date - To Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </>
                        ) : (
                            <>
                                <th>Request Type</th>
                                <th>From Date - To Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {dataToDisplay.map((item, index) => (
                        <tr key={index}>
                            {selectedRequestedProposal === 'reportee' ? (
                                <>
                                    <td>{item.name}</td>
                                    <td>{item.requestType}</td>
                                    <td>{item.dateRange}</td>
                                    <td>{item.status}</td>
                                    <td>
                                        <VisibilityIcon
                                            className='view-btn'
                                            onClick={handleOpenModal} // Open modal on click
                                        />
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{item.requestType}</td>
                                    <td>{item.dateRange}</td>
                                    <td>{item.status}</td>
                                    <td>
                                    <VisibilityIcon
                                            className='view-btn'
                                            onClick={handleOpenModal} // Open modal on click
                                        />
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className='pagination-container'>
                {page > 1 && (
                    <IconButton onClick={handlePrevious}>
                        <KeyboardDoubleArrowLeftIcon className='pagination-btn' />
                    </IconButton>
                )}
                <span>{page}</span>
                {endIndex < filteredData.length && (
                    <IconButton onClick={handleNext}>
                        <KeyboardDoubleArrowRightIcon className='pagination-btn' />
                    </IconButton>
                )}
            </div>

            <Modal
                open={isModalOpen}
                onClose={handleCloseModal}
                aria-labelledby="request-action-modal"
                aria-describedby="request-action-description"
            >
                <Box className="modal-box">
                    <RequestAction selectedRequestedProposal={selectedRequestedProposal} />
                </Box>
            </Modal>
        </div>
    );
};

export default RequestedProposal;
