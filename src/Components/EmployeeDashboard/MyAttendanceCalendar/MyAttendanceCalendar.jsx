import React, { useState } from 'react';
import { Tooltip, IconButton, Typography, Box, Grid } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { format, addMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameYear, getDay } from 'date-fns';
import './MyAttendanceCalendar.css';

const MyAttendanceCalendar = ({ attendanceData = [], currentMonth, setCurrentMonth }) => {
  const [hoveredDay, setHoveredDay] = useState(null);

  const handlePreviousMonth = () => setCurrentMonth(addMonths(currentMonth, -1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const handleCurrentMonth = () => setCurrentMonth(new Date());

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Calculate the starting weekday for the current month
  const startDayOfWeek = getDay(startOfMonth(currentMonth));

  // Filter attendance data for the current month
  const filteredAttendanceData = attendanceData.filter(entry => {
    const entryDate = new Date(entry.date);
    return isSameMonth(entryDate, currentMonth) && isSameYear(entryDate, currentMonth);
  });

  // Create the calendar grid with leading empty cells for the first week
  const paddedDaysInMonth = [...Array(startDayOfWeek).fill(null), ...daysInMonth];

  return (
    <Box className="calendar-container">
      <Box className="calendar-header">
        <Tooltip title="Previous Month">
          <IconButton size="small" onClick={handlePreviousMonth}>
            <NavigateBeforeIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Current Month">
          <IconButton size="small" onClick={handleCurrentMonth}>
            <CalendarTodayIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Next Month">
          <IconButton size="small" onClick={handleNextMonth}>
            <NavigateNextIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
      <Typography variant="h6" align="center" className="calendar-title">
        {format(currentMonth, 'MMMM yyyy')}
      </Typography>

      <Grid container spacing={0.5}>
        {/* Day names row */}
        {dayNames.map((dayName, index) => (
          <Grid item xs={12 / 7} key={index} className="calendar-day-name">
            <Typography variant="body2">{dayName}</Typography>
          </Grid>
        ))}

        {/* Calendar days */}
        {paddedDaysInMonth.map((day, index) => {
          if (!day) return <Grid item xs={12 / 7} key={index} className="calendar-day-empty" />;
          
          const dayKey = format(day, 'yyyy-MM-dd');
          const attendance = filteredAttendanceData.find(entry => 
            format(new Date(entry.date), 'yyyy-MM-dd') === dayKey
          );

          let attendanceClass = '';
          let statusDisplay = '-';

          // Determine the attendance class based on the status
          if (attendance) {
            statusDisplay = attendance.status;
            switch (attendance.status) {
              case 'PP':
                attendanceClass = 'attendance-present';
                break;
              case 'AA':
                attendanceClass = 'attendance-absent';
                break;
              case 'Lt':
                attendanceClass = 'attendance-late';
                break;
              case 'EE':
                attendanceClass = 'attendance-late';
                break;
              case 'WO':
                attendanceClass = 'attendance-WO';
                break;
              case 'LV':
                attendanceClass = 'attendance-LV';
                break;
              case 'PH':
              case 'PI':
                attendanceClass = 'attendance-partial';
                break;
              case 'TR':
                attendanceClass = 'attendance-TR';
                break;
              case 'HO':
                attendanceClass = 'attendance-HO';
                break;
              default:
                attendanceClass = '';
            }
          }

          return (
            <Grid item xs={12 / 7} key={dayKey} className="calendar-day">
              <Box
                sx={{
                  padding: '4px',
                  borderRadius: '4px',
                  marginTop: '4px',
                  textAlign: 'center',
                }}
              >
                <Typography variant="body2" className="day-number">
                  {format(day, 'd')}
                </Typography>
                <Box
                  className={`attendance-detail ${attendanceClass}`}
                  onMouseEnter={() => setHoveredDay(dayKey)}
                  onMouseLeave={() => setHoveredDay(null)}
                  sx={{
                    color: '#fff',
                    padding: '2px 0',
                    borderRadius: '4px',
                  }}
                >
                  <Typography variant="caption" className="attendance-status">
                    {statusDisplay}
                  </Typography>

                  {/* Show details on hover */}
                  {hoveredDay === dayKey && attendance && (
                    <Box className="attendance-details-hover">
                      <Typography variant="caption" className="attendance-shift">
                        Shift: {attendance.shiftCode || '-'}
                      </Typography>
                      <Typography variant="caption" className="attendance-time">
                        {attendance.inTime ? `In: ${attendance.inTime}` : 'In: -'}<br />
                        {attendance.outTime ? `Out: ${attendance.outTime}` : 'Out: -'}
                      </Typography>
                      <Typography variant="caption" className="attendance-work-hour">
                        Work Hours: {attendance.WorkHour || '00:00:00'}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default MyAttendanceCalendar;
