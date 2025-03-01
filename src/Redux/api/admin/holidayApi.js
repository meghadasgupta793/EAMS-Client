import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../../features/baseQueryWithReauth';

export const holidayApi = createApi({
    reducerPath: 'holidayApi',
    baseQuery: baseQueryWithReauth,

    endpoints: (builder) => ({
        getAllHolidays: builder.query({
            query: () => "/holiday/holidayList",
            providesTags: ['Holiday'],
        }),

        getHolidayById: builder.query({
            query: (id) => `/holiday/holiday/${id}`,
            providesTags: ['Holiday'],
        }),

        createHoliday: builder.mutation({
            query: ({ Name, StartDate, EndDate}) => ({
                url: "/holiday/holidayCreate",
                method: "POST",
                body: { Name, StartDate, EndDate }
            }),
            invalidatesTags: ['Holiday'],
        }),

        updateHoliday: builder.mutation({
            query: ({ id,Name, StartDate, EndDate }) => ({
                url: `/holiday/updateHoliday/${id}`,
                method: 'PUT',
                body: { id,Name, StartDate, EndDate}
            }),
            invalidatesTags: ['Holiday'],
        }),

        deleteHoliday: builder.mutation({
            query: (id) => ({
                url: `/holiday/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Holiday'],
        }),
        getAllHolidayGroup: builder.query({
            query: () => "/holiday/holidayGroup",
            providesTags: ['HolidayGroup'],
        }),
        createHolidayGroup: builder.mutation({
            query: ({ Name}) => ({
                url: "/holiday/holidayGroup",
                method: "POST",
                body: { Name }
            }),
            invalidatesTags: ['HolidayGroup'],
        }),
        getHolidayListForGroupAssingment: builder.query({
            query: (id) => `/holiday/holidayByGroup/${id}`,
            providesTags: ['HolidayForAssingment'],
        }),
        assingHolidayInGroup: builder.mutation({
            query: ({ GroupID, HolidayID, CreatedBy}) => ({
                url: "/holiday/assignHolidayInAHolidayGroup",
                method: "POST",
                body: {  GroupID, HolidayID, CreatedBy }
            }),
            invalidatesTags: ['HolidayForAssingment','HolidayGroup'],
        }),
        unAssignHolidayFromAHolidayGroup: builder.mutation({
            query: ({ GroupID, HolidayID}) => ({
                url: "/holiday/unAssignHolidayFromAHolidayGroup",
                method: "POST",
                body: {  GroupID, HolidayID }
            }),
            invalidatesTags: ['HolidayGroup'],
        }),

        deleteHolidayGroup: builder.mutation({
            query: (id) => ({
                url: `/holiday/holidayGroup/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['HolidayGroup'],
        }),

        
    }),
  
      
});

export const {
    useGetAllHolidaysQuery,
    useGetHolidayByIdQuery,
    useCreateHolidayMutation,
    useUpdateHolidayMutation,
    useDeleteHolidayMutation,
    useGetAllHolidayGroupQuery,
    useCreateHolidayGroupMutation,
    useGetHolidayListForGroupAssingmentQuery,
    useAssingHolidayInGroupMutation,
    useUnAssignHolidayFromAHolidayGroupMutation,
    useDeleteHolidayGroupMutation
} = holidayApi;
