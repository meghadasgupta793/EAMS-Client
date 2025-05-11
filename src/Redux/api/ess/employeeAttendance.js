import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../../features/baseQueryWithReauth';

export const essAttendanceApi = createApi({
  reducerPath: 'essAttendanceApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    
    markAttendance: builder.mutation({
      query: (AttendanceData) => ({
        url: "/attendance/employeeAttendanceMark",
        method: "POST",
        body: AttendanceData,
      }),
    }),

    getEmployeeAttendance: builder.mutation({
      query: ({ EmployeeID, FromDate, ToDate }) => ({
        url: "/attendance/getEmployeePeriodAttendance",
        method: "POST",
        body: {
          EmployeeID,
          FromDate,
          ToDate
        },
      }),
    }),

  }),
});

export const {
  useMarkAttendanceMutation,
  useGetEmployeeAttendanceMutation,
} = essAttendanceApi;
