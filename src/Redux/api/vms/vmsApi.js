import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../../features/baseQueryWithReauth';

export const vmsApi = createApi({
  reducerPath: 'vmsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['DashBoardAppointmentStatusCount', 'DashBoardAppointmentStatusDetails'], // Define tag types for caching
  endpoints: (builder) => ({
    // ✅ Fetch appointment status count
    DashBoardAppointmentStatusCount: builder.mutation({
      query: (body) => ({
        url: '/vms/dashBoardAppointmentStatusCount',
        method: 'POST',
        body,
      }),
      providesTags: ['DashBoardAppointmentStatusCount'], // Cache tag for this endpoint
    }),

    // ✅ Fetch appointment status details
    dashBoardAppointmentStatusDetails: builder.mutation({
      query: (body) => ({
        url: '/vms/dashBoardAppointmentStatusDetails',
        method: 'POST',
        body,
      }),
      providesTags: ['DashBoardAppointmentStatusDetails'], // Cache tag for this endpoint
    }),

     // ✅ Fetch InvitationOverView
     invitationOverView: builder.mutation({
      query: (body) => ({
        url: '/vms/invitationOverView',
        method: 'POST',
        body,
      }),
      providesTags: ['DashBoardInvitationOverView'], // Cache tag for this endpoint
    }),

       // ✅ Fetch InvitationOverView details
       invitationOverViewDetails: builder.mutation({
        query: (body) => ({
          url: '/vms/invitationOverViewDetails',
          method: 'POST',
          body,
        }),
        providesTags: ['DashBoardInvitationOverViewDetails'], // Cache tag for this endpoint
      }),
             // ✅ Fetch AppointmentAnalytics
             appointmentAnalytics: builder.mutation({
              query: (body) => ({
                url: '/vms/appointmentAnalytics',
                method: 'POST',
                body,
              }),
              providesTags: ['DashBoardappointmentAnalytics'], // Cache tag for this endpoint
            }),
      

    // ✅ Approve an appointment
    approvedAppointment: builder.mutation({
      query: (body) => ({
        url: '/vms/approvedAppointment',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['DashBoardAppointmentStatusCount'], // Invalidate cache for appointment details
    }),

    // ✅ Fetch appointment details by date range
    appointmentDetailsByDateRange: builder.mutation({
      query: (body) => ({
        url: '/vms/appointmentDetailsByDateRange',
        method: 'POST',
        body,
      }),
    }),

    // ✅ Search by visitor mobile number
    searchByVisitorMobileNo: builder.query({
      query: (MobileNo) => ({
        url: `/vms/searchByVisitorMobileNo/${MobileNo}`,
      }),
    }),

    // ✅ Create a new appointment
    createAppointment: builder.mutation({
      query: (body) => ({
        url: '/vms/createAppointment',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['DashBoardAppointmentStatusCount'], // Invalidate cache for appointment details
    }),

    // ✅ Fetch appointment details by ID
    appointmentDetailsByid: builder.query({
      query: (AppointmentId) => ({
        url: `/vms/appointmentDetailsById/${AppointmentId}`,
      })
    }),

    // ✅ Check-in an appointment
    checkInAppointment: builder.mutation({
      query: (body) => ({
        url: '/vms/checkInAppointment',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['DashBoardAppointmentStatusCount'], // Invalidate cache for appointment details
    }),
    checkOutAppointment: builder.mutation({
      query: (body) => ({
        url: '/vms/checkOutAppointment',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['DashBoardAppointmentStatusCount'], // Invalidate cache for appointment details
    }),

    inviteVisitor: builder.mutation({
      query: (body) => ({
        url: '/vms/inviteAppointment',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['DashBoardAppointmentStatusCount'], // Invalidate cache for appointment details
    }),
    // ✅ Fetch visitor pass details by AppointmentId
    getVisitorPassDetails: builder.query({
      query: (AppointmentId) => ({
        url: `/vms/visitorPassDetails/${AppointmentId}`,
      })
    }),
  }),
});
// Export hooks for usage in components
export const {
  useDashBoardAppointmentStatusCountMutation,
  useDashBoardAppointmentStatusDetailsMutation,
  useApprovedAppointmentMutation,
  useAppointmentDetailsByDateRangeMutation,
  useSearchByVisitorMobileNoQuery,
  useCreateAppointmentMutation,
  useAppointmentDetailsByidQuery,
  useCheckInAppointmentMutation,
  useCheckOutAppointmentMutation,
  useInviteVisitorMutation,
  useInvitationOverViewMutation,
  useInvitationOverViewDetailsMutation,
  useAppointmentAnalyticsMutation
} = vmsApi;