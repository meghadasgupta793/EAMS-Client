import React, { useState } from 'react';
import './widgets.css';
import { Link } from 'react-router-dom';


import PendingActionsIcon from '@mui/icons-material/PendingActions';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person'; // New icon for Total Employees
import EventAvailableIcon from '@mui/icons-material/EventAvailable'; // New icon for On Time
import EventBusyIcon from '@mui/icons-material/EventBusy'; // New icon for Absent
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave'; // New icon for Time-off
import TotalPresent from '../DashboardModal/TotalPresent/TotalPresent';


import EarlyExit from '../DashboardModal/EarlyExit/EarlyExit';
import TotalAbsent from '../DashboardModal/TotalAbsent/TotalAbsent';
import WeeklyOff from '../DashboardModal/WeeklyOff/WeeklyOff';
import OnLeave from '../DashboardModal/OnLeave/OnLeave';
import LateArrival from '../DashboardModal/LateArrival/LateArrival';






const Widgets = ({ type, count }) => {


    const [openModal, setOpenModal] = useState({ totalPresent: false, lateArrival: false, earlyExit: false, totalAbsent: false, weeklyOff: false, onLeave: false });



    const handleViewAllClick = () => {
        switch (type) {
            case "Present":
                setOpenModal({ totalPresent: true });
                break;
            case "Late Arrival":
                setOpenModal({ lateArrival: true });
                break;
            case "Early Exit":
                setOpenModal({ earlyExit: true });
                break;
            case "Absent":
                setOpenModal({ totalAbsent: true });
                break;
            case "Week-off":
                setOpenModal({ weeklyOff: true });
                break;
            case "On-Leave":
                setOpenModal({ onLeave: true });
                break;
            default:
                return;
        }
    };

    const closeModal = () => {
        setOpenModal({
            totalPresent: false,
            lateArrival: false,
            earlyExit: false,
            totalAbsent: false,
            weeklyOff: false,
            onLeave: false,
        });
    };






    let data;

    switch (type) {
        case "Present":
            data = {
                title: "Present",
                link: "View All",
                counter: count,
                icon: <PersonIcon className="icon" style={{ color: "blue", backgroundColor: "rgb(235, 229, 229)", fontSize: "30px" }} />
            };
            break;
        case "Late Arrival":
            data = {
                title: "Late Arrival",
                link: "View All",
                counter: count,
                icon: <EventAvailableIcon className="icon" style={{ color: "green", backgroundColor: "rgb(235, 229, 229)", fontSize: "30px" }} />
            };
            break;
        case "Early Exit":
            data = {
                title: "Early Exit",
                link: "View All",
                counter: count,
                icon: <PendingActionsIcon className="icon" style={{ color: "orange", backgroundColor: "rgb(235, 229, 229)", fontSize: "30px" }} />
            };
            break;
        case "Absent":
            data = {
                title: "Absent",
                link: "View All",
                counter: count,
                icon: <LogoutIcon className="icon" style={{ color: "crimson", backgroundColor: "rgb(235, 229, 229)", fontSize: "30px" }} />
            };
            break;
        case "Week-off":
            data = {
                title: "Week-off",
                link: "View All",
                counter: count,
                icon: <EventBusyIcon className="icon" style={{ color: "crimson", backgroundColor: "rgb(235, 229, 229)", fontSize: "30px" }} />
            };
            break;
        case "On-Leave":
            data = {
                title: "On-Leave",
                link: "View All",
                counter: count,
                icon: <TimeToLeaveIcon className="icon" style={{ color: "crimson", backgroundColor: "rgb(235, 229, 229)", fontSize: "30px" }} />
            };
            break;
        default:
            return null;
    }





    return (
        <div className='widgets'>
            <div className='widgets-left'>
                <div className='widgets-left-title'>{data.title}</div>
                <div className='widgets-left-count'>{data.counter}</div>
                <div className='widgets-left-link' onClick={handleViewAllClick}>
                    {data.link}
                </div>

            </div>
            <div className="widgets-right">
                {data.icon}
            </div>
            <TotalPresent open={openModal.totalPresent} onClose={closeModal} />
            <LateArrival open={openModal.lateArrival} onClose={closeModal} />
            <EarlyExit open={openModal.earlyExit} onClose={closeModal} />
            <TotalAbsent open={openModal.totalAbsent} onClose={closeModal} />
            <WeeklyOff open={openModal.weeklyOff} onClose={closeModal} />
            <OnLeave open={openModal.onLeave} onClose={closeModal} />
        </div>
    );
}

export default Widgets;
