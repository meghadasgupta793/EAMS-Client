import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../../features/baseQueryWithReauth';

export const shiftApi = createApi({
    reducerPath: 'shiftApi',
    baseQuery: baseQueryWithReauth,

    endpoints: (builder) => ({
        getAllShifts: builder.query({
            query: () => "/shift/allShifts",
            providesTags: ['Shift'],
        }),

        getShiftByCode: builder.query({
            query: (Code) => `/shift/getShift/${Code}`,
            providesTags: ['Shift'],
        }),

        createShift: builder.mutation({
            query: ({ Code, Name, StartTime, EndTime, LateAfter, LateCalculatedFrom, EarlyExitBefore }) => ({
                url: "/shift/createShift",
                method: "POST",
                body: { Code, Name, StartTime, EndTime, LateAfter, LateCalculatedFrom, EarlyExitBefore },
            }),
            invalidatesTags: ['Shift'],
        }),

        updateShift: builder.mutation({
            query: ({ Code, ...updatedData }) => ({
                url: `/shift/updateShift/${Code}`,
                method: 'PUT',
                body: updatedData, // Exclude redundant Code in body
            }),
            invalidatesTags: ['Shift'],
        }),

        deleteShift: builder.mutation({
            query: (shiftCode) => ({
                url: `/shift/${shiftCode}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Shift'],
        }),

        createAutoShiftGroup: builder.mutation({
            query: ({ AutoShiftGroup }) => ({
                url: "/shift/autoShiftGroup",
                method: "POST",
                body: { AutoShiftGroup },
            }),
            invalidatesTags: ['AutoShiftGroup'],
        }),

        getAllAutoShiftGroup: builder.query({
            query: () => "/shift/autoShiftGroup",
            providesTags: ['AutoShiftGroup'],
        }),

        deleteAutoShiftGroup: builder.mutation({
            query: (id) => ({
                url: `/shift/autoShiftGroup/${id}`, // Corrected URL path
                method: 'DELETE',
            }),
            invalidatesTags: ['AutoShiftGroup'],
        }),

        getUnAssignedShiftList: builder.query({
            query: (id) => `/shift/getShiftForAssigment/${id}`, // Fixed function name and assumed corrected endpoint
            providesTags: ['UnAssignedShift'],
        }),

        assignAutoShift: builder.mutation({
            query: ({ AutoShiftGroupID,ShiftCode,EntryThreshold,EndThreshold }) => ({
                url: "/shift/assignAutoShift",
                method: "POST",
                body: { AutoShiftGroupID,ShiftCode,EntryThreshold,EndThreshold },
            }),
            invalidatesTags: ['AutoShiftGroup','UnAssignedShift'],
        }),

        unAssignAutoShift: builder.mutation({
            query: ({ shiftCode,AutoShiftGroupID }) => ({
                url: "/shift/unAssignAutoShift",
                method: "POST",
                body: { shiftCode,AutoShiftGroupID },
            }),
            invalidatesTags: ['AutoShiftGroup','UnAssignedShift'],
        }),
    }),
});

export const {
    useGetAllShiftsQuery,
    useGetShiftByCodeQuery,
    useCreateShiftMutation,
    useUpdateShiftMutation,
    useDeleteShiftMutation,
    useGetAllAutoShiftGroupQuery,
    useCreateAutoShiftGroupMutation,
    useDeleteAutoShiftGroupMutation,
    useUnAssignAutoShiftMutation,
    useAssignAutoShiftMutation,
    useGetUnAssignedShiftListQuery, // Fixed function name
} = shiftApi;
