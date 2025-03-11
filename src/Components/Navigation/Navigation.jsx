import React, { useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar } from '../../Redux/slice/sidebarSlice';
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
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import FaxIcon from '@mui/icons-material/Fax';
import GroupsIcon from '@mui/icons-material/Groups';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import CameraFrontIcon from '@mui/icons-material/CameraFront';
import SecurityIcon from '@mui/icons-material/Security';
import HistoryIcon from '@mui/icons-material/History';
import PersonIcon from '@mui/icons-material/Person';
import EventNoteIcon from '@mui/icons-material/EventNote';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import InsertChartIcon from '@mui/icons-material/InsertChart'; // Added missing import
import AssessmentIcon from '@mui/icons-material/Assessment'; // Added for Reports
import SummarizeIcon from '@mui/icons-material/Summarize'; // Added for Leave Report

import { UserContext } from '../../StoreContext/UserContext';
import config from '../../secrect';
import Modal from '@mui/material/Modal';

const menuItems = {
    admin: [
        {
            name: 'Master',
            icon: PeopleAltIcon,
            children: [
                { name: 'EmployeeMasters', path: '/employee', icon: PeopleAltIcon },
                { name: 'Department', path: '/department', icon: CorporateFareIcon },
                { name: 'Designation', path: '/designation', icon: AssignmentIndIcon },
                { name: 'Category', path: '/category', icon: AssignmentIndIcon },
                { name: 'Batch', path: '/batch', icon: AssignmentIndIcon },
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
                { name: 'Manual Attendance', path: '/manualAttendance', icon: EditCalendarIcon },
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
                { name: 'InActiveEmployee', path: '/inActiveEmployee', icon: PersonOffIcon },
                { name: 'Blocked Employee List', path: '/blackList', icon: ReportProblemIcon },
            ],
        },
        {
            name: 'Device Management',
            icon: FingerprintIcon,
            children: [
                { name: 'Device Dashboard', path: '/device-dashboard', icon: FingerprintIcon },
                { name: 'Unassign Device List', path: '/unassign-device-list', icon: PointOfSaleIcon },
                { name: 'Device List', path: '/device-list', icon: FaxIcon },
                { name: 'Device Group', path: '/device-group', icon: FaxIcon },
            ],
        },
        {
            name: 'Reports',
            icon: InsertChartIcon, // Alternative to BarChartIcon
            children: [
                { name: 'Attendance Raw Report', path: '/attendanceRawReport', icon: AssessmentIcon }, // Alternative to ManageHistoryIcon
                { name: 'Attendance Report', path: '/attendanceReport', icon: BarChartIcon }, // Alternative to ManageHistoryIcon
                { name: 'Leave Report', path: '/leaveReport', icon: SummarizeIcon }, // Alternative to EventRepeatIcon
            ],
        }
        ,
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
        {
            name: 'Visitor Management',
            icon: SettingsIcon,
            children: [
                { name: 'VMS Dashboard', path: '/VMSDashboard', icon: HomeIcon },
                { name: 'Appointment Status', path: '/appointment-status', icon: PointOfSaleIcon },
                { name: 'Invite Visitor', path: '/invite-appointment', icon: SupervisorAccountIcon },
                { name: 'Direct Visitor', path: '/direct-appointment', icon: AssignmentIndIcon },
                { name: 'Kiosk Visitor', path: '/kiosk-appointment', icon: CameraFrontIcon },
            ],
        },
    ],
    employee: [
        { name: 'MyApprovalHierarchy', path: '/MyApprovalHierarchy', icon: AccountTreeIcon },
        { name: 'MyTeams', path: '/my-teams', icon: Diversity3Icon },
        { name: 'MyAttendanceReport', path: '/my-attendance-report', icon: CorporateFareIcon },
        { name: 'My Teams Report', path: '/myTeams-report', icon: CorporateFareIcon },
        { name: 'Notification', path: '/notification', icon: NotificationsActiveIcon },
        { name: 'Message', path: '/message', icon: MessageIcon },
    ],
    vms: [
        {
            name: 'Apointment',
            icon: FingerprintIcon,
            children: [
                { name: 'Appointment Status', path: '/appointment-status', icon: PointOfSaleIcon },
                { name: 'Invite Visitor', path: '/invite-appointment', icon: SupervisorAccountIcon },
                { name: 'Direct Visitor', path: '/direct-appointment', icon: AssignmentIndIcon },
                { name: 'Kiosk Visitor', path: '/kiosk-appointment', icon: CameraFrontIcon },
            ],
        },
        {
            name: 'Visitor History',
            icon: HistoryIcon,
            children: [
                { name: 'Visit Logs', path: '/visit-logs', icon: HistoryIcon },
                { name: 'Repeat Visitors', path: '/repeat-visitors', icon: PersonIcon },
            ],
        },
        {
            name: 'Reports',
            icon: BarChartIcon,
            children: [
                { name: 'Visitor Report', path: '/visitor-report', icon: EventNoteIcon },
                { name: 'Appointment Report', path: '/appointment-report', icon: EventRepeatIcon },
            ],
        },
    ],
};

const modalItems = {
    admin: [
        { name: 'Master', icon: PeopleAltIcon },
        { name: 'Attendance Configuration', icon: WatchLaterIcon },
        { name: 'Leave', icon: TimeToLeaveIcon },
        { name: 'Assignment', icon: AssignmentTurnedInIcon },
        { name: 'Device Management', icon: FingerprintIcon },
        { name: 'Visitor Management', icon: GroupsIcon },
        { name: 'Reports', icon: BarChartIcon },
    ],
    vms: [
        { name: 'Apointment', icon: PointOfSaleIcon },
        { name: 'Kiosk Visitor', icon: CameraFrontIcon },
        { name: 'Reports', icon: BarChartIcon },
    ],
};

const Navigation = () => {
    const { userRole, userInfo } = useContext(UserContext);
    const [nav, setNav] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [selectedModule, setSelectedModule] = useState(null);
    const { ImgUrl } = config;
    const dispatch = useDispatch();
    const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);

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

    const handleOpenInNewTab = (path) => {
        window.open(path, '_blank');
    };

    const getMenuItems = () => {
        if (userRole === 'employee') {
            return menuItems.employee;
        }

        if (userRole === 'admin' && selectedModule) {
            const foundModule = menuItems.admin.find((menu) => menu.name === selectedModule.name);
            return foundModule ? foundModule.children : [];
        }

        if (userRole === 'vms' && selectedModule) {
            const foundModule = menuItems.vms.find((menu) => menu.name === selectedModule.name);
            return foundModule ? foundModule.children : [];
        }

        return [];
    };

    return (
        <div className={`navigation ${isSidebarOpen ? "active" : ""}`}>
            <header>
                <div className="profile">
                    <img src={`${userInfo?.Picture ? `${ImgUrl}/${userInfo.Picture}` : 'images/profile.png'}`} alt="user-img" className="profile-img" />
                </div>
                <span>
                    {userRole === 'admin'
                        ? 'Admin'
                        : userRole === 'vms'
                            ? 'VMS'
                            : 'Employee'}
                </span>
                <h4 className='nav-empno'>EmpNo: {userInfo?.EmpNo || 'N/A'}</h4>
                <p className='nav-empName'>Name: {userInfo?.EmployeeName || 'N/A'}</p>
            </header>

            <Link to={userRole === 'admin' ? "/" : userRole === 'vms' ? "/" : "/"}>
                <Nav title={userRole === 'admin' ? "Admin Dashboard" : userRole === 'vms' ? "VMS Dashboard" : "Employee Dashboard"} Icon={HomeIcon} />
            </Link>

            {(userRole === 'admin' || userRole === 'vms') && (
                <div onClick={handleModalOpen}>
                    <Nav title="View Modules" Icon={ViewModuleIcon} />
                </div>
            )}

            <div className='divider'></div>

            {getMenuItems().map((item, index) => (
                item.path === '/kiosk-appointment' ? (
                    <div key={index} onClick={() => handleOpenInNewTab(item.path)}>
                        <Nav title={item.name} Icon={item.icon} />
                    </div>
                ) : (
                    <Link key={index} to={item.path}>
                        <Nav title={item.name} Icon={item.icon} />
                    </Link>
                )
            ))}

            <div className='divider'></div>

            <Modal open={openModal} onClose={handleModalClose}>
                <div className="modal-content">
                    <h2>Select Module</h2>
                    {(userRole === 'admin' || userRole === 'vms') && (
                        (userRole === 'admin' ? modalItems.admin : modalItems.vms).map((item, idx) => (
                            <div key={idx} className="modal-item" onClick={() => handleItemSelect(item)}>
                                <item.icon className="sidebar-icon" />
                                <span>{item.name}</span>
                            </div>
                        ))
                    )}
                </div>
            </Modal>
        </div>
    );
};

export default Navigation;