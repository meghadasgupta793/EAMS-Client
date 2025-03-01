import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../../features/baseQueryWithReauth';

export const adminDashboardApi = createApi({
  reducerPath: 'adminDashboardApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['DashBoardTypeWiseCount', 'DashBoardTypeWiseAttendanceDeatails'], // Define tag types for caching
  endpoints: (builder) => ({
    // ✅ Fetch appointment status count
    dashBoardTypeWiseCount: builder.mutation({
      query: (body) => ({
        url: '/adminDashboard/dashBoardTypeWiseCount',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['DashBoardTypeWiseCount'], // Invalidate cache for this endpoint
    }),

    // ✅ Fetch appointment status details
    dashBoardTypeWiseAttendanceDeatails: builder.mutation({
      query: (body) => ({
        url: '/adminDashboard/dashBoardTypeWiseAttendanceDeatails',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['DashBoardTypeWiseAttendanceDeatails'], // Invalidate cache for this endpoint
    }),
    // ✅ Fetch latest attendance
    dashBoardLatestAttendance: builder.query({
      query: () => '/adminDashboard/dashBoardLatestAttendance',
     
    }),
  }),
})
// Export hooks for usage in components
export const {
  useDashBoardTypeWiseCountMutation,
  useDashBoardTypeWiseAttendanceDeatailsMutation,
  useLazyDashBoardLatestAttendanceQuery
} = adminDashboardApi;