import React, { useEffect, useContext, useState } from 'react';
import './employeeDashboard.css'
import { ThemeContext } from '../../../ThemeContext'
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


const EmployeeDashboard = () => {

  const { DarkTheme } = useContext(ThemeContext)

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



  return (
    <div className='employeeDashboard'>
      <Header />

      <div className='emp-dashboard'>
        <div className='emp-box emp-box1'> <MyAttendanceCalendar /> </div>


        <div className='emp-box emp-box2'>
          <MyAttendanceStatus
            Icon={EventAvailableIcon}
            title="Present"
            value="12"
            onClick={() => handleStatusClick("Present")}
          />
          <MyAttendanceStatus
            Icon={EventBusyIcon}
            title="Absent"
            value="18"
            onClick={() => handleStatusClick("Absent")}
          />
          <MyAttendanceStatus
            Icon={HourglassBottomIcon}
            title="Late"
            value="6"
            onClick={() => handleStatusClick("Late")}
          />
          <MyAttendanceStatus
            Icon={TimelapseIcon}
            title="Early"
            value="2"
            onClick={() => handleStatusClick("Early")}
          />
          <MyAttendanceStatus
            Icon={TodayIcon}
            title="Week-off"
            value="4"
            onClick={() => handleStatusClick("Week-off")}
          />
          <MyAttendanceStatus
            Icon={HolidayVillageIcon}
            title="Holiday"
            value="2"
            onClick={() => handleStatusClick("Holiday")}
          />
          <MyAttendanceStatus
            Icon={TimeToLeaveIcon}
            title="Leave"
            value="12"
            onClick={() => handleStatusClick("Leave")}
          />
          <MyAttendanceStatus
            Icon={TourIcon}
            title="Tour"
            value="12"
            onClick={() => handleStatusClick("Tour")}
          />

        </div>




        
        <div className='emp-box emp-box3'><MyLeaveBalance /></div>
        <div className='emp-box emp-box4'><UpComingHoliday /></div>
        <div className='emp-box emp-box5'><RequestedProposal /></div>
        <div className='emp-box emp-box6'><Anniversaries /></div>
        <div className='emp-box emp-box7'>  </div>
        <div className='emp-box emp-box8'> <TeamAttendance /></div>


      </div>


      {isModalOpen && (
        <div className="custom-modal-overlay" onClick={handleCloseModal}>
          <div className="custom-modal" onClick={(e) => e.stopPropagation()}>
            <EmployeeOneMonthStatus status={selectedStatus} onClose={handleCloseModal} />
          </div>
        </div>
      )}
    </div>
  )
}

export default EmployeeDashboard
