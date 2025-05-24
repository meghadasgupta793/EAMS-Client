import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../../features/baseQueryWithReauth';

export const requestProposalApi = createApi({
  reducerPath: 'requestProposalApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['MyRequestProposal', 'PendingForApproval', 'AttendancebyStatus'], // ✅ Register tag types
  endpoints: (builder) => ({

    // ✅ Converted to query to support providesTags and auto invalidation
  employeeAttendancebyStatus: builder.query({
  query: (body) => ({
    url: '/attendance/EmployeeAttendancebyStatus',
    method: 'GET', // <-- important
    params: body, // Send EmployeeID and Status as query parameters
  }),
  providesTags: ['Attendance'],
}),

    // ✅ Added invalidatesTags
    createTourRequest: builder.mutation({
      query: ({ EmployeeId, FromDate, ToDate, Remarks }) => ({
        url: "/requestProposal/CreatetourRequest",
        method: "POST",
        body: { EmployeeId, FromDate, ToDate, Remarks },
      }),
      invalidatesTags: ['MyRequestProposal', 'AttendancebyStatus'],
    }),

    pendingForApproval: builder.query({
      query: ({ EmployeeId }) => `/requestProposal/pendingForApproval/${EmployeeId}`,
      providesTags: ['PendingForApproval'],
    }),

    myRequestProposal: builder.query({
      query: ({ EmployeeId }) => `/requestProposal/myRequestProposal/${EmployeeId}`,
      providesTags: ['MyRequestProposal'],
    }),
  }),
});

export const { 
  useEmployeeAttendancebyStatusQuery,   // ✅ Hook updated to use query
  useCreateTourRequestMutation,
  usePendingForApprovalQuery,
  useMyRequestProposalQuery,
} = requestProposalApi;
