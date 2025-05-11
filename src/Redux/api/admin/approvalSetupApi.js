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

    // ✅ Fetch unassigned reportee list
    unAssignedReporteeList: builder.mutation({
      query: (body) => ({
        url: '/approval/unAssignedReporteeList',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useApproverMappingMutation,
  useGetReportingListsQuery,
  useMyTeamTodayQuery,
  useUnAssignedReporteeListMutation, // ✅ Export the hook here
} = approvalSetupApi;
