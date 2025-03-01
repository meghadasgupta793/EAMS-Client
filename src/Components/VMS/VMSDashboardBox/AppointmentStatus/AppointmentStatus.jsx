import React, { useState, useEffect, useCallback, useContext } from 'react';
import './AppointmentStatus.css';
import PendingIcon from '@mui/icons-material/HourglassEmpty';
import ConfirmedIcon from '@mui/icons-material/CheckCircle';
import CheckInIcon from '@mui/icons-material/Login';
import CompleteIcon from '@mui/icons-material/TaskAlt';
import { UserContext } from '../../../../StoreContext/UserContext';
import VMSAppointmentStatusModal from '../../VMSModal/VMSAppointmentStatusModal/VMSAppointmentStatusModal';
import { useDashBoardAppointmentStatusCountMutation } from "../../../../Redux/api/vms/vmsApi";

const AppointmentStatus = () => {
    const [counts, setCounts] = useState({
        PendingAppointment: 0,
        ConfirmedAppointment: 0,
        CheckedInAppointment: 0,
        CompletedAppointment: 0
    });

    const [DashBoardAppointmentStatusCount] = useDashBoardAppointmentStatusCountMutation(); // Fixed function name
    const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');

    const { userInfo } = useContext(UserContext); // Removed `userRole` as it's unused
    const { UserRole, EmployeeId } = userInfo || {}; // Added fallback for `userInfo` to avoid crashes
    const date = new Date().toLocaleDateString('en-CA');

    const handleSubmit = useCallback(async () => {
        try {
            const response = await DashBoardAppointmentStatusCount({ UserRole, EmployeeId, date }).unwrap();
            if (response?.data?.length) {
                setCounts(response.data[0]);
            }
        } catch (error) {
            console.error('Failed to fetch dashboard status count', error);
        }
    }, [DashBoardAppointmentStatusCount, UserRole, EmployeeId, date]);

    useEffect(() => {
        handleSubmit();
    }, [handleSubmit]);

// Handle modal close
const handleModalClose = () => {
    setModalOpen(false);
    handleSubmit(); // Refetch data when modal is closed
};




    const statuses = [
        { Icon: PendingIcon, title: 'Pending', value: counts.PendingAppointment },
        { Icon: ConfirmedIcon, title: 'Confirmed', value: counts.ConfirmedAppointment },
        { Icon: CheckInIcon, title: 'CheckedIn', value: counts.CheckedInAppointment },
        { Icon: CompleteIcon, title: 'Completed', value: counts.CompletedAppointment },
    ];

    const handleStatusClick = (title) => {
        setModalTitle(title);
        setModalOpen(true);
    };

    return (
        <div className='appointmentStatus-container'>
            <h1 className='appointmentStatus-title'>Appointment Status</h1>
            <div className='appointmentStatus-box'>
                {statuses.map(({ Icon, title, value }, index) => (
                    <div
                        className={`appointmentStatus-item ${index === statuses.length - 1 ? 'no-border' : ''}`}
                        key={title}
                    >
                        <Icon
                            className='appointmentStatus-icon'
                            onClick={() => handleStatusClick(title)}
                        />
                        <h2 className='appointmentStatus-titleText'>{title}</h2>
                        <h2 className='appointmentStatus-value'>{value}</h2>
                    </div>
                ))}
            </div>
          

            {modalOpen && (
                <VMSAppointmentStatusModal
                    title={modalTitle}
                  ///  onClose={() => setModalOpen(false)}
                    onClose={handleModalClose} // Pass the callback to refetch data
                />
            )}
        </div>
    );
};

export default AppointmentStatus;
