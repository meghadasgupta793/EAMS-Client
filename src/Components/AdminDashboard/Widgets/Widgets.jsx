import React, { useState, useContext } from 'react';
import './widgets.css';
import AdminAttendanceWidgetModal from '../DashboardModal/AdminAttendanceWidgetModal/AdminAttendanceWidgetModal';
import { UserContext } from '../../../StoreContext/UserContext';
import { useDashBoardTypeWiseAttendanceDeatailsMutation } from '../../../Redux/api/admin/adminDashboardApi';
import CircularProgress from '@mui/material/CircularProgress'; // Loading spinner
import Alert from '@mui/material/Alert'; // Error alert
import config from '../../../secrect';

const Widgets = ({ type, count, icon: Icon, iconColor }) => {
    const [openModal, setOpenModal] = useState(false);
    const { userInfo } = useContext(UserContext);
    const { UserRole, EmployeeId } = userInfo || {}; // Added fallback for `userInfo` to avoid crashes
    const date = new Date().toLocaleDateString('en-CA'); // Current date in YYYY-MM-DD format
    const { ImgUrl } = config;
    // API hook for fetching attendance details
    const [DashBoardTypeWiseAttendanceDeatails, { data, isLoading, isError, error }] = useDashBoardTypeWiseAttendanceDeatailsMutation();

    const handleViewAllClick = async () => {
        setOpenModal(true);

        // Fetch data when the modal is opened
        if (UserRole && EmployeeId && date) {
            try {
                await DashBoardTypeWiseAttendanceDeatails({
                    UserRole,
                    EmployeeId,
                    date,
                    AttenddanceStatus: type, // Use the widget type as the attendance status
                });
            } catch (err) {
                console.error('Error fetching attendance details:', err);
            }
        }
    };

    const closeModal = () => {
        setOpenModal(false);
    };

    // Define columns and titles for each type
    const modalConfig = {
        Present: {
            title: 'Present List',
            columns: ['Photo', 'EmpNo', 'EmpName', 'Department', 'Designation', 'Organization', 'Date', 'InTime', 'OutTime', 'WorkHour', 'Remark'],
        },
        'Late Arrival': {
            title: 'Late Arrival List',
            columns: ['Photo', 'EmpNo', 'EmpName', 'Department', 'Designation', 'Organization', 'Date', 'InTime', 'LateMinute', 'Remark'],
        },
        'Early Exit': {
            title: 'Early Exit List',
            columns: ['Photo', 'EmpNo', 'EmpName', 'Department', 'Designation', 'Organization', 'Date', 'OutTime', 'EarlyMinute', 'Remark'],
        },
        Absent: {
            title: 'Absent List',
            columns: ['Photo', 'EmpNo', 'EmpName', 'Department', 'Designation', 'Organization', 'Date', 'Remark'],
        },
        'Week-off': {
            title: 'Weekly Off List',
            columns: ['Photo', 'EmpNo', 'EmpName', 'Department', 'Designation', 'Organization', 'Date', 'Remark'],
        },
        'On-Leave': {
            title: 'On Leave List',
            columns: ['Photo', 'EmpNo', 'EmpName', 'Department', 'Designation', 'Organization', 'Date', 'Remark'],
        },
    };

    // Map API data to modal data format
    const mapApiDataToModalData = (apiData) => {
        return apiData.map((item) => ({
            EmpNo: item.EmpNo,
            EmpName: item.Name,
            Department: item.Department,
            Designation: item.Designation,
            Organization: item.Organization.trim(), // Trim to remove extra spaces
            Date: item.Date,
            InTime: item.Intime || 'N/A',
            OutTime: item.OutTime || 'N/A',
            WorkHour: item.WorkHour || 'N/A',
            LateMinute: item.LateIn || 'N/A',
            EarlyMinute: item.EarlyOut || 'N/A',
            Remark: item.AttendanceStatus,
            photo: item.PictureName ? `${ImgUrl}/${item.PictureName}` : '/images/profile.png', // Use the provided photo or a default
        }));
    };

    // Get modal configuration for the current type
    const { title, columns } = modalConfig[type] || {};

    // Use API data if available, otherwise use an empty array
    const modalData = data?.data ? mapApiDataToModalData(data.data) : [];

    return (
        <div className="widgets">
            <div className="widgets-left">
                <div className="widgets-left-title">{type}</div>
                <div className="widgets-left-count">{count}</div>
                <div className="widgets-left-link" onClick={handleViewAllClick}>
                    View All
                </div>
            </div>
            <div className="widgets-right">
                {Icon && <Icon className="widget-icon" style={{ color: iconColor }} />} {/* Apply icon color */}
            </div>

            {/* Modal for displaying attendance details */}
            <AdminAttendanceWidgetModal
                open={openModal}
                onClose={closeModal}
                data={modalData}
                title={title}
                columns={columns}
                isLoading={isLoading}
                isError={isError}
                error={error}
            />
        </div>
    );
};

export default Widgets;