import React from 'react';
import './MyNotification.css';

import Header from '../../../Components/Header/Header';

const MyNotification = () => {
    const notifications = [
        { id: 1, title: 'Meeting Reminder', description: 'Team meeting at 10 AM tomorrow', date: '2024-12-28' },
        { id: 2, title: 'Leave Approved', description: 'Your leave request for 2024-12-30 has been approved.', date: '2024-12-26' },
        { id: 3, title: 'Shift Change', description: 'Your shift timing has been updated.', date: '2024-12-25' },
    ];

    return (
        <>
            <div className='MyNotification'>
                <Header />
                <div className='MyNotification-container'>
                    <div className='MyNotification-header-container'>
                        <h1 className="MyNotification-heading">My Notifications</h1>
                        <input
                            type="text"
                            className="MyNotification-search"
                            placeholder="Search notifications..."
                        />
                    </div>
                    <div className='MyNotification-list'>
                        {notifications.map(notification => (
                            <div key={notification.id} className='MyNotification-item'>
                                <h2 className='MyNotification-item-title'>{notification.title}</h2>
                                <p className='MyNotification-item-description'>{notification.description}</p>
                                <span className='MyNotification-item-date'>{notification.date}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyNotification