import React, { useState } from 'react';
import { Tooltip, IconButton, Typography, Box, Grid } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { format, addMonths, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import './MyAttendanceCalendar.css';

const MyAttendanceCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [hoveredDay, setHoveredDay] = useState(null);

  const handlePreviousMonth = () => setCurrentMonth(addMonths(currentMonth, -1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const handleCurrentMonth = () => setCurrentMonth(new Date());

  // New attendance data format
  const attendanceData = [
    { date: "2024-11-01T00:00:00", shiftCode: "Admn", inTime: "10:00:00", outTime: "18:03:00", WorkHour: "07:35:00", status: "PP" },
    { date: "2024-11-02T00:00:00", shiftCode: "A", inTime: "10:27:00", outTime: "18:03:00", WorkHour: "07:35:00", status: "Lt" },
    { date: "2024-11-03T00:00:00", shiftCode: "A", inTime: null, outTime: null, WorkHour: "00:00:00", status: "AA" },
    { date: "2024-11-04T00:00:00", shiftCode: "WO", inTime: null, outTime: null, WorkHour: "00:00:00", status: "WO" },
    { date: "2024-11-05T00:00:00", shiftCode: "B", inTime: null, outTime: null, WorkHour: "00:00:00", status: "LV" },
    { date: "2024-11-06T00:00:00", shiftCode: "B", inTime: null, outTime: null, WorkHour: "00:00:00", status: "TR" },
    { date: "2024-11-07T00:00:00", shiftCode: "B", inTime: null, outTime: null, WorkHour: "00:00:00", status: "HO" },
    { date: "2024-11-08T00:00:00", shiftCode: "B", inTime: "10:00:00", outTime: "15:00:00", WorkHour: "05:00:00", status: "PH" },
    { date: "2024-11-09T00:00:00", shiftCode: "B", inTime: "10:00:00", outTime: "13:00:00", WorkHour: "03:00:00", status: "PI" },
    { date: "2024-11-10T00:00:00", shiftCode: "C", inTime: "09:00:00", outTime: "17:00:00", WorkHour: "08:00:00", status: "PP" },
    { date: "2024-11-11T00:00:00", shiftCode: "Admn", inTime: "09:30:00", outTime: "18:00:00", WorkHour: "08:30:00", status: "PP" },
    { date: "2024-11-12T00:00:00", shiftCode: "A", inTime: null, outTime: null, WorkHour: "00:00:00", status: "WO" },
    { date: "2024-11-13T00:00:00", shiftCode: "A", inTime: "10:15:00", outTime: "19:00:00", WorkHour: "08:45:00", status: "Lt" },
    { date: "2024-11-14T00:00:00", shiftCode: "B", inTime: "09:45:00", outTime: "18:15:00", WorkHour: "08:30:00", status: "PP" },
    { date: "2024-11-15T00:00:00", shiftCode: "A", inTime: null, outTime: null, WorkHour: "00:00:00", status: "LV" },
    { date: "2024-11-16T00:00:00", shiftCode: "A", inTime: "11:00:00", outTime: "19:30:00", WorkHour: "07:30:00", status: "Lt" },
    { date: "2024-11-17T00:00:00", shiftCode: "B", inTime: "10:00:00", outTime: "18:00:00", WorkHour: "08:00:00", status: "PP" },
    { date: "2024-11-18T00:00:00", shiftCode: "B", inTime: null, outTime: null, WorkHour: "00:00:00", status: "TR" },
    { date: "2024-11-19T00:00:00", shiftCode: "A", inTime: "09:00:00", outTime: "16:45:00", WorkHour: "07:45:00", status: "PP" },
    { date: "2024-11-20T00:00:00", shiftCode: "Admn", inTime: "09:15:00", outTime: "17:15:00", WorkHour: "08:00:00", status: "PP" },
    { date: "2024-11-21T00:00:00", shiftCode: "C", inTime: null, outTime: null, WorkHour: "00:00:00", status: "AA" },
    { date: "2024-11-22T00:00:00", shiftCode: "A", inTime: "10:45:00", outTime: "18:30:00", WorkHour: "07:45:00", status: "Lt" },
    { date: "2024-11-23T00:00:00", shiftCode: "B", inTime: null, outTime: null, WorkHour: "00:00:00", status: "HO" },
    { date: "2024-11-24T00:00:00", shiftCode: "C", inTime: "08:00:00", outTime: "16:00:00", WorkHour: "08:00:00", status: "PP" },
    { date: "2024-11-25T00:00:00", shiftCode: "B", inTime: "09:15:00", outTime: "18:00:00", WorkHour: "08:45:00", status: "PP" },
    { date: "2024-11-26T00:00:00", shiftCode: "Admn", inTime: "10:30:00", outTime: "19:00:00", WorkHour: "08:30:00", status: "PP" },
    { date: "2024-11-27T00:00:00", shiftCode: "A", inTime: "10:00:00", outTime: "18:00:00", WorkHour: "08:00:00", status: "PP" },
    { date: "2024-11-28T00:00:00", shiftCode: "B", inTime: null, outTime: null, WorkHour: "00:00:00", status: "WO" },
    { date: "2024-11-29T00:00:00", shiftCode: "A", inTime: "09:45:00", outTime: "18:15:00", WorkHour: "08:30:00", status: "PP" },
    { date: "2024-11-30T00:00:00", shiftCode: "B", inTime: "10:00:00", outTime: "17:00:00", WorkHour: "07:00:00", status: "PP" },
    { date: "2024-11-31T00:00:00", shiftCode: "C", inTime: "09:00:00", outTime: "17:00:00", WorkHour: "08:00:00", status: "PP" }
  ];

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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

        {/* Days in the month */}
        {daysInMonth.map(day => {
          const dayKey = format(day, 'yyyy-MM-dd');
          const attendance = attendanceData.find(entry => format(new Date(entry.date), 'yyyy-MM-dd') === dayKey);

          let attendanceClass = '';

          // Determine the attendance class based on the status
          if (attendance) {
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
                    {attendance ? attendance.status : '-'} {/* Updated to show full status */}
                  </Typography>

                  {/* Show details on hover */}
                  {hoveredDay === dayKey && attendance && (
                    <Box className="attendance-details-hover">
                      <Typography variant="caption" className="attendance-shift">
                        Shift: {attendance.shiftCode}
                      </Typography>
                      <Typography variant="caption" className="attendance-time">
                        {attendance.inTime ? `In: ${attendance.inTime}` : 'In: -'}<br />
                        {attendance.outTime ? `Out: ${attendance.outTime}` : 'Out: -'}
                      </Typography>
                      <Typography variant="caption" className="attendance-work-hour">
                        Work Hours: {attendance.WorkHour}
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
