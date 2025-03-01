import React, { useState, useContext, useEffect, useCallback } from 'react';
import './PreRegistrationInvitations.css';
import { PendingActions, Event, AccessTime, Cancel } from '@mui/icons-material';
import InvitationsOverviewModal from '../../VMSModal/InvitationsOverviewModal/InvitationsOverviewModal';
import { UserContext } from '../../../../StoreContext/UserContext';
import { useInvitationOverViewMutation, useInvitationOverViewDetailsMutation } from '../../../../Redux/api/vms/vmsApi';

const PreRegistrationInvitations = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalData, setModalData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [InvitationOverView] = useInvitationOverViewMutation();
    const [InvitationOverViewDetails] = useInvitationOverViewDetailsMutation();
    const { userInfo } = useContext(UserContext);
    const { UserRole, EmployeeId } = userInfo || {};
    const date = new Date().toLocaleDateString('en-CA');

    const [counts, setCounts] = useState({
        PendingInvitation: 0,
        ConfirmedInvitation: 0,
        ExpiredInvitation: 0,
        UnattendedInvitation: 0,
    });

    // Fetch invitation overview counts
    const fetchInvitationOverview = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await InvitationOverView({ UserRole, EmployeeId, date }).unwrap();
            if (response?.data?.length) {
                setCounts(response.data[0]);
            }
        } catch (err) {
            console.error('Failed to fetch dashboard status count', err);
            setError('Failed to fetch data. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    }, [InvitationOverView, UserRole, EmployeeId, date]);

    useEffect(() => {
        fetchInvitationOverview();
    }, [fetchInvitationOverview]);

    // Map frontend titles to backend InvitationStatus values
    const getBackendStatus = (title) => {
        const statusMap = {
            'Pending Invitation': 'PendingInvitation',
            'Confirmed Invitation': 'ConfirmedInvitation',
            'Expired Invitation': 'ExpiredInvitation',
            'Unattended Invitation': 'UnattendedInvitation',
        };
        return statusMap[title];
    };

    // Fetch detailed data for a specific invitation status
    const fetchDetailedData = async (title) => {
        setIsLoading(true);
        setError(null);
        try {
            const InvitationStatus = getBackendStatus(title); // Map title to backend status
            const body = { UserRole, EmployeeId, date, InvitationStatus };
            const response = await InvitationOverViewDetails(body).unwrap();
            return response.data || []; // Return empty array if no data
        } catch (err) {
            console.error('Failed to fetch detailed data', err);
            setError('Failed to fetch detailed data. Please try again later.');
            return [];
        } finally {
            setIsLoading(false);
        }
    };

    const invitationStatuses = [
        {
            title: 'Pending Invitation',
            value: counts.PendingInvitation,
            description: 'Invitations sent to visitors that are awaiting a response.',
            icon: <PendingActions />,
        },
        {
            title: 'Confirmed Invitation',
            value: counts.ConfirmedInvitation,
            description: 'Visitors who have confirmed their invitation and are expected to arrive soon.',
            icon: <Event />,
        },
        {
            title: 'Expired Invitation',
            value: counts.ExpiredInvitation,
            description: 'Invitations that are no longer valid or have passed the response deadline.',
            icon: <AccessTime />,
        },
        {
            title: 'Unattended Invitation',
            value: counts.UnattendedInvitation,
            description: 'Visitor failed to attend.',
            icon: <Cancel />,
        },
    ];

    const handleStatusClick = async (title) => {
        setModalTitle(title);
        const data = await fetchDetailedData(title); // Fetch detailed data for the selected status
        setModalData(data);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div className="pre-registration-invitations-container">
            <h2 className="pre-registration-invitations-title">Invitations Overview</h2>

            {error && <p className="error-message">{error}</p>}

            <div className="pre-registration-invitations-cards">
                {invitationStatuses.map(({ title, value, description, icon }, index) => (
                    <div
                        className={`pre-registration-invitations-card ${index % 2 === 0 ? 'even' : 'odd'}`}
                        key={title}
                        onClick={() => handleStatusClick(title)}
                        role="button"
                        tabIndex={0}
                        aria-label={`View ${title} invitations`}
                    >
                        <div className="card-icon">{icon}</div>
                        <h3 className="card-title">{title}</h3>
                        <p className="card-value">{value}</p>
                        <p className="card-description">{description}</p>
                    </div>
                ))}
            </div>

            {modalOpen && (
                <InvitationsOverviewModal
                    title={modalTitle}
                    data={modalData}
                    onClose={closeModal}
                    isLoading={isLoading}
                    error={error}
                />
            )}
        </div>
    );
};

export default PreRegistrationInvitations;