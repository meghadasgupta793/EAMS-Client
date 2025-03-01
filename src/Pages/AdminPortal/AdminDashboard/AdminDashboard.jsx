import React, { useState, useEffect, useContext } from 'react';
import './adminDashboard.css';

import Header from '../../../Components/Header/Header';
import Widgets from '../../../Components/AdminDashboard/Widgets/Widgets';
import AdminDashboardPiechart from '../../../Components/AdminDashboard/Charts/PieChart/AdminDashboardPiechart';
import AdminDashboardBarChart from '../../../Components/AdminDashboard/Charts/BarChart/AdminDashboardBarChart';
import LatestAttendance from '../../../Components/AdminDashboard/LatestAttendance/LatestAttendance';

import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Present
import ScheduleIcon from '@mui/icons-material/Schedule'; // Late Arrival
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; // Early Exit
import CancelIcon from '@mui/icons-material/Cancel'; // Absent
import EventIcon from '@mui/icons-material/Event'; // Week-off
import BeachAccessIcon from '@mui/icons-material/BeachAccess'; // On-Leave
import { UserContext } from '../../../StoreContext/UserContext';
import { useDashBoardTypeWiseCountMutation } from '../../../Redux/api/admin/adminDashboardApi';
import CircularProgress from '@mui/material/CircularProgress'; // Loading spinner
import Alert from '@mui/material/Alert'; // Error alert
import config from '../../../secrect';

const AdminDashboard = () => {
    const { userInfo } = useContext(UserContext);
    const { UserRole, EmployeeId } = userInfo || {}; // Added fallback for `userInfo` to avoid crashes
    const date = new Date().toLocaleDateString('en-CA'); // Current date in YYYY-MM-DD format
    const { AdminDashbordRefreshTime } = config;

    // API hook for fetching attendance summary
    const [DashBoardTypeWiseCount, { data, isLoading, isError, error }] = useDashBoardTypeWiseCountMutation();

    // State to store widget counts
    const [widgetCounts, setWidgetCounts] = useState({
        Present: 0,
        LateArrival: 0,
        EarlyExit: 0,
        Absent: 0,
        WeekOff: 0,
        OnLeave: 0,
    });

    // Function to fetch data
    const fetchData = async () => {
        if (UserRole && EmployeeId && date) {
            try {
                const result = await DashBoardTypeWiseCount({ UserRole, EmployeeId, date }).unwrap();
                if (result.data && result.data.length > 0) {
                    const attendanceData = result.data[0]; // Extract the first object from the data array
                    setWidgetCounts({
                        Present: attendanceData.Present || 0,
                        LateArrival: attendanceData.LateIn || 0,
                        EarlyExit: attendanceData.EarlyOut || 0,
                        Absent: attendanceData.Absent || 0,
                        WeekOff: attendanceData.WeekOff || 0,
                        OnLeave: attendanceData.onLeave || 0, // Note: API response uses "onLeave" (lowercase)
                    });
                }
            } catch (err) {
                console.error('Error fetching dashboard data:', err);
            }
        }
    };

    // Fetch data on component mount and set up auto-refresh
    useEffect(() => {
        // Fetch data immediately when the component mounts
        fetchData();

        // Set up auto-refresh using setInterval
        const intervalId = setInterval(fetchData, AdminDashbordRefreshTime);

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [UserRole, EmployeeId, date, DashBoardTypeWiseCount, AdminDashbordRefreshTime]);

    // Colors for pie chart
    const colors = ['#D6E8EE', '#97CADB', '#018ABE'];

    // Data for pie chart
    const pieChartData = [
        { id: 0, value: widgetCounts.Present, label: 'On Time' },
        { id: 1, value: widgetCounts.LateArrival, label: 'Late Arrival' },
        { id: 2, value: widgetCounts.EarlyExit, label: 'Early Departures' },
        { id: 3, value: widgetCounts.Absent, label: 'Absent' },
    ];

    // Icon mapping for widgets
    const iconMapping = {
        Present: { icon: CheckCircleIcon, color: '#4CAF50' }, // Green
        LateArrival: { icon: ScheduleIcon, color: '#FFA000' }, // Amber
        EarlyExit: { icon: ExitToAppIcon, color: '#9E9E9E' }, // Grey
        Absent: { icon: CancelIcon, color: '#F44336' }, // Red
        WeekOff: { icon: EventIcon, color: '#2196F3' }, // Blue
        OnLeave: { icon: BeachAccessIcon, color: '#00BCD4' }, // Cyan
    };

 

    // Display error message if API call fails
    if (isError) {
        return (
            <div className="error-message">
                <Alert severity="error">Error fetching dashboard data: {error.message}</Alert>
            </div>
        );
    }

    return (
        <div className="adminDashboard">
            <Header />
            <div className="dashboard">
                <div className="box box1">
                    <LatestAttendance />
                </div>

                {/* Widgets with dynamic counts */}
                <div className="box box2">
                    <Widgets type="Present" count={widgetCounts.Present} icon={iconMapping.Present.icon} iconColor={iconMapping.Present.color} />
                </div>
                <div className="box box3">
                    <Widgets type="Late Arrival" count={widgetCounts.LateArrival} icon={iconMapping.LateArrival.icon} iconColor={iconMapping.LateArrival.color} />
                </div>
                <div className="box box4">
                    <Widgets type="Early Exit" count={widgetCounts.EarlyExit} icon={iconMapping.EarlyExit.icon} iconColor={iconMapping.EarlyExit.color} />
                </div>
                <div className="box box5">
                    <Widgets type="Absent" count={widgetCounts.Absent} icon={iconMapping.Absent.icon} iconColor={iconMapping.Absent.color} />
                </div>
                <div className="box box6">
                    <Widgets type="Week-off" count={widgetCounts.WeekOff} icon={iconMapping.WeekOff.icon} iconColor={iconMapping.WeekOff.color} />
                </div>
                <div className="box box7">
                    <Widgets type="On-Leave" count={widgetCounts.OnLeave} icon={iconMapping.OnLeave.icon} iconColor={iconMapping.OnLeave.color} />
                </div>

                {/* Charts */}
                <div className="box box8">
                    <AdminDashboardPiechart data={pieChartData} colors={colors} title="Employee Attendance Overview" />
                </div>
                <div className="box box9">
                    <AdminDashboardBarChart />
                </div>

                {/* Placeholder boxes */}
                <div className="box box10">
                    <h1>box 10</h1>
                </div>
                <div className="box box11">
                    <h1>box 11</h1>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;