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
                body: AttendanceData
            })
        })
    }),
});

export const {
    useMarkAttendanceMutation
} = essAttendanceApi;
