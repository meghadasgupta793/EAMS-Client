import React, { useEffect, useContext, useState } from 'react';
import './employeeDashboard.css'

import Header from '../../../Components/Header/Header'
import MyAttendanceStatus from '../../../Components/EmployeeDashboard/MyAttendanceStatus/MyAttendanceStatus'

import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import Anniversaries from '../../../Components/EmployeeDashboard/Anniversaries/Anniversaries'
import UpComingHoliday from '../../../Components/EmployeeDashboard/UpComingHoliday/UpComingHoliday'
import MyLeaveBalance from '../../../Components/EmployeeDashboard/LeaveBalance/MyLeaveBalance'
import TeamAttendance from '../../../Components/EmployeeDashboard/TeamAttendance/TeamAttendance'
import MyAttendanceCalendar from '../../../Components/EmployeeDashboard/MyAttendanceCalendar/MyAttendanceCalendar'
import RequestedProposal from '../../../Components/EmployeeDashboard/RequestedProposal/RequestedProposal'
import TodayIcon from '@mui/icons-material/Today';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import TourIcon from '@mui/icons-material/Tour';
import EmployeeOneMonthStatus from '../../../Components/Modal/EmployeeModal/EmployeeOneMonthStatus/EmployeeOneMonthStatus'
import { UserContext } from '../../../StoreContext/UserContext';
import { useGetEmployeeAttendanceMutation } from '../../../Redux/api/ess/employeeAttendance';
import { startOfMonth, endOfMonth, format } from 'date-fns';

const EmployeeDashboard = () => {
  const { userRole, userInfo } = useContext(UserContext);
  console.log(userInfo)
  const [currentMonth, setCurrentMonth] = useState(new Date());


  const [getEmployeeAttendance, { data, isLoading, error }] = useGetEmployeeAttendanceMutation();
  const fetchAttendance = (month) => {
    const FromDate = format(startOfMonth(month), 'yyyy-MM-dd');
    const ToDate = format(endOfMonth(month), 'yyyy-MM-dd');
    getEmployeeAttendance({
      EmployeeID: userInfo.EmployeeId,
      FromDate,
      ToDate,
    });
  };
  useEffect(() => {
    if (userInfo?.EmployeeId) {
      fetchAttendance(currentMonth);
    }
  }, [currentMonth]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');

  const handleStatusClick = (statusTitle) => {
    setSelectedStatus(statusTitle);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStatus('');
  };

  // Disable scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';  // Disable scrolling
    } else {
      document.body.style.overflow = ''; // Enable scrolling
    }
    return () => {
      document.body.style.overflow = ''; // Cleanup on component unmount
    };
  }, [isModalOpen]);

  if (userRole !== 'employee') {
    return <div className='no-permission'>You do not have permission to access this dashboard.</div>;
  }

  // Get the attendance counts from the API response
  const attendanceCounts = data ? {
    Present: data.Present,
    Absent: data.Absent,
    Late: data.Late,
    Early: data.Early,
    "Week-off": data["Week-off"],
    Holiday: data.Holiday,
    Leave: data.Leave,
    Tour: data.Tour
  } : {
    Present: 0,
    Absent: 0,
    Late: 0,
    Early: 0,
    "Week-off": 0,
    Holiday: 0,
    Leave: 0,
    Tour: 0
  };

  return (
    <div className='employeeDashboard'>
      <Header />

      <div className='emp-dashboard'>
        <div className='emp-box emp-box1'>
          <MyAttendanceCalendar
            attendanceData={data?.attendanceData || []}
            currentMonth={currentMonth}
            setCurrentMonth={setCurrentMonth}
          />
        </div>

        <div className='emp-box emp-box2'>
          <MyAttendanceStatus
            Icon={EventAvailableIcon}
            title="Present"
            value={attendanceCounts.Present.toString()}
            onClick={() => handleStatusClick("Present")}
          />
          <MyAttendanceStatus
            Icon={EventBusyIcon}
            title="Absent"
            value={attendanceCounts.Absent.toString()}
            onClick={() => handleStatusClick("Absent")}
          />
          <MyAttendanceStatus
            Icon={HourglassBottomIcon}
            title="Late"
            value={attendanceCounts.Late.toString()}
            onClick={() => handleStatusClick("Late")}
          />
          <MyAttendanceStatus
            Icon={TimelapseIcon}
            title="Early"
            value={attendanceCounts.Early.toString()}
            onClick={() => handleStatusClick("Early")}
          />
          <MyAttendanceStatus
            Icon={TodayIcon}
            title="Week-off"
            value={attendanceCounts["Week-off"].toString()}
            onClick={() => handleStatusClick("Week-off")}
          />
          <MyAttendanceStatus
            Icon={HolidayVillageIcon}
            title="Holiday"
            value={attendanceCounts.Holiday.toString()}
            onClick={() => handleStatusClick("Holiday")}
          />
          <MyAttendanceStatus
            Icon={TimeToLeaveIcon}
            title="Leave"
            value={attendanceCounts.Leave.toString()}
            onClick={() => handleStatusClick("Leave")}
          />
          <MyAttendanceStatus
            Icon={TourIcon}
            title="Tour"
            value={attendanceCounts.Tour.toString()}
            onClick={() => handleStatusClick("Tour")}
          />
        </div>

        <div className='emp-box emp-box3'><MyLeaveBalance /></div>
        <div className='emp-box emp-box4'><UpComingHoliday /></div>
        <div className='emp-box emp-box5'><RequestedProposal /></div>
        <div className='emp-box emp-box6'><Anniversaries /></div>
        <div className='emp-box emp-box7'></div>
        <div className='emp-box emp-box8'><TeamAttendance /></div>
      </div>

      {isModalOpen && (
        <div className="custom-modal-overlay" onClick={handleCloseModal}>
          <div className="custom-modal" onClick={(e) => e.stopPropagation()}>
            <EmployeeOneMonthStatus
              status={selectedStatus}
              onClose={handleCloseModal}
              attendanceData={data?.attendanceData || []}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default EmployeeDashboard