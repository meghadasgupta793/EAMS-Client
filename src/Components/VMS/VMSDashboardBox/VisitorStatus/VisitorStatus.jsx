import React, { useState } from 'react';
import './VisitorStatus.css';
import PendingIcon from '@mui/icons-material/HourglassEmpty';
import LateCheckInIcon from '@mui/icons-material/AccessAlarm';
import ScheduledIcon from '@mui/icons-material/CalendarToday';
import ExtensionIcon from '@mui/icons-material/Extension';
///import VMSVisitorStatusModal from '../../VMSModal/VMSVisitorStatusModal/VMSVisitorStatusModal';

const VisitorStatus = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');

    const [counts, setCounts] = useState({
        LateCheckIn: 5,
        ScheduledForLater: 8,
        VisitorExtensions: 3
    });

    const statuses = [
       
        { Icon: LateCheckInIcon, title: 'Late Check-In', value: counts.LateCheckIn },
        { Icon: ScheduledIcon, title: 'Scheduled for Later', value: counts.ScheduledForLater },
        { Icon: ExtensionIcon, title: 'Visitor Extensions', value: counts.VisitorExtensions }
    ];

    const handleStatusClick = (title) => {
        setModalTitle(title);       
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div className='visitorStatus-container'>
            <h1 className='visitorStatus-title'>Visitor Status</h1>
            <div className='visitorStatus-box'>
                {statuses.map(({ Icon, title, value }, index) => (
                    <div
                        className={`visitorStatus-item ${index === statuses.length - 1 ? 'visitorStatus-item-no-border' : ''}`}
                        key={title}
                    >
                        <Icon
                            className='visitorStatus-icon'
                            onClick={() => handleStatusClick(title)}
                        />
                        <h2 className='visitorStatus-titleText'>{title}</h2>
                        <h2 className='visitorStatus-value'>{value}</h2>
                    </div>
                ))}
            </div>

            {/* Modal Component */}
          {/*  {modalOpen && (
                <VMSVisitorStatusModal
                    title={modalTitle}
                    onClose={closeModal}
                />
            )}

            */}
        </div>
    );
};

export default VisitorStatus;
