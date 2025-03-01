import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../../features/baseQueryWithReauth';

export const approvalSetupApi = createApi({
  reducerPath: 'approvalSetupApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    // ✅ Fetch ReportingLists by EmployeeID
    getReportingLists: builder.query({
      query: (id) => ({
        url: `/approval/reportnigList/${id}`,
      }),
      providesTags: ['ReportingListsById'],
    }),

       // ✅ Fetch MyTeamToday by EmployeeID
       myTeamToday: builder.query({
        query: (id) => ({
          url: `/approval/myTeamToday/${id}`,
        }),
        providesTags: ['MyTeamToday'],
      }),

    // ✅ Fetch appointment status details
    approverMapping: builder.mutation({
      query: (body) => ({
        url: '/approval/approverMapping',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['ReportingListsById'], // Invalidate cache for this endpoint
    }),
  }),
});

// Export hooks for usage in components
export const {
  useApproverMappingMutation,
  useGetReportingListsQuery, // Updated to use query instead of mutation
  useMyTeamTodayQuery
} = approvalSetupApi;
