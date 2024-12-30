import React, { useContext, useState } from 'react';
import './navigation.css';
import { Link } from 'react-router-dom';
import Nav from '../Nav/Nav';
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import MessageIcon from '@mui/icons-material/Message';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import { UserContext } from '../../StoreContext/UserContext';
import Modal from '@mui/material/Modal';

const menuItems = {
    admin: [
        {
            name: 'Master',
            icon: PeopleAltIcon,
            children: [
                { name: 'EmployeeMasters', path: '/employee', icon: PeopleAltIcon },
                { name: 'InActiveEmployee', path: '/inActiveEmployee', icon: PersonOffIcon },
                { name: 'Department', path: '/department', icon: CorporateFareIcon },
                { name: 'Designation', path: '/designation', icon: AssignmentIndIcon },
                { name: 'Organization', path: '/organization', icon: AdminPanelSettingsIcon },
            ],
        },
        {
            name: 'Attendance Configuration',
            icon: WatchLaterIcon,
            children: [
                { name: 'ShiftList', path: '/shift', icon: ManageHistoryIcon },
                { name: 'Rotational shift schemes', path: '/autoShiftScheme', icon: EventRepeatIcon },
                { name: 'HolidayList', path: '/holiday', icon: TimeToLeaveIcon },
                { name: 'Holiday Group', path: '/holidayGroup', icon: TimeToLeaveIcon },
            ],
        },
        {
            name: 'Leave',
            icon: TimeToLeaveIcon,
            children: [
                { name: 'LeaveType', path: '/leave', icon: TimeToLeaveIcon },
                { name: 'Leave Group', path: '/LeaveGroup', icon: TimeToLeaveIcon },
                { name: 'Employee Leave Group', path: '/EmployeeLeaveGroup', icon: TimeToLeaveIcon },
            ],
        },
        {
            name: 'Assignment',
            icon: AssignmentTurnedInIcon,
            children: [
                { name: 'Manual Attendance', path: '/manualAttendance', icon: EditCalendarIcon },
                { name: 'Black List', path: '/blackList', icon: ReportProblemIcon },
            ],
        },
        {
            name: 'Reports',
            icon: BarChartIcon,
            children: [
                { name: 'Attendance Report', path: '/AttendanceReport', icon: ManageHistoryIcon },
                { name: 'Leave Report', path: '/LeaveReport', icon: EventRepeatIcon },
            ],
        },
        {
            name: 'Settings',
            icon: SettingsIcon,
            children: [
                { name: 'ChangeAccount', path: '/changeaccount', icon: AccountCircleIcon },
                { name: 'Logs', path: '/logs', icon: ManageHistoryIcon },
                { name: 'Notification', path: '/notification', icon: NotificationsActiveIcon },
                { name: 'Message', path: '/message', icon: MessageIcon },
            ],
        },
    ],
    employee: [
       
        { name: 'MyApprovalHierarchy', path: '/MyApprovalHierarchy', icon: AccountTreeIcon },
        { name: 'MyAttendanceReport', path: '/my-attendance-report', icon: CorporateFareIcon },
        { name: 'Notification', path: '/notification', icon: NotificationsActiveIcon },
        { name: 'Message', path: '/message', icon: MessageIcon },
    ],
};

const modalItems = {
    admin: [
        { name: 'Master', icon: PeopleAltIcon },
        { name: 'Attendance Configuration', icon: WatchLaterIcon },
        { name: 'Leave', icon: TimeToLeaveIcon },
        { name: 'Assignment', icon: AssignmentTurnedInIcon },
        { name: 'ESS', icon: BarChartIcon },
        { name: 'Reports', icon: BarChartIcon },
    ],
};

const Navigation = () => {
    const { userRole } = useContext(UserContext);
    const [nav, setNav] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [selectedModule, setSelectedModule] = useState(null); // State for selected module
  

  

    const handleModalOpen = () => {
        setOpenModal(true);
    };

    const handleModalClose = () => {
        setOpenModal(false);
    };

    const handleItemSelect = (module) => {
        setSelectedModule(module);
        handleModalClose();
    };

    const getMenuItems = () => {
        // For employee role, always return all items
        if (userRole === 'employee') {
            return menuItems.employee;
        }

        // For admin role, return children of the selected module
        if (selectedModule) {
            const foundModule = menuItems.admin.find((menu) => menu.name === selectedModule.name);
            return foundModule ? foundModule.children : [];
        }

        return []; // Initially no admin menu items are shown
    };

    return (
        <div className={`navigation ${nav ? "active" : ""}`}>
            <div className={`menu ${nav ? "active" : ""}`} onClick={() => setNav(prevState => !prevState)}>
                <MenuOpenIcon className='menu-icon' />
            </div>
            <header>
                <div className='profile'>
                    <img src='/images/profile.png' alt='user-img' className='profile-img' />
                </div>
                <span>{userRole === 'admin' ? 'Admin' : 'Employee'}</span>
            </header>
            {/* Render Dashboard link */}
            <Link to={userRole === 'admin' ? "/" : "/EmployeeDashboard"}>
                <Nav title={userRole === 'admin' ? "Admin Dashboard" : "Employee Dashboard"} Icon={HomeIcon} />
            </Link>

            {/* Show View Modules only for admin */}
            {userRole === 'admin' && (
                <div onClick={handleModalOpen}>
                    <Nav title="View Modules" Icon={ViewModuleIcon} />
                </div>
            )}

            <div className='divider'></div>

            {/* Render menu items based on role and selected module */}
            {getMenuItems().map((item, index) => (
                <Link key={index} to={item.path}>
                    <Nav title={item.name} Icon={item.icon} />
                </Link>
            ))}

            <div className='divider'></div>
         
            {/* Modal for selecting module */}
            <Modal open={openModal} onClose={handleModalClose}>
                <div className="modal-content">
                    <h2>Select Module</h2>
                    {modalItems.admin.map((item, idx) => (
                        <div key={idx} className="modal-item" onClick={() => handleItemSelect(item)}>
                            <item.icon className="sidebar-icon" />
                            <span>{item.name}</span>
                        </div>
                    ))}
                </div>
            </Modal>
        </div>
    );
};

export default Navigation;
