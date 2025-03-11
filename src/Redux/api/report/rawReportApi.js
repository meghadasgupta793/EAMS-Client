import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../../features/baseQueryWithReauth';

export const rawReportApi = createApi({
    reducerPath: 'rawReportApi',
    baseQuery: baseQueryWithReauth,

    endpoints: (builder) => ({
       

        getAttendanceRawData: builder.mutation({
            query: (body) => ({
                url: "/rawReport/getAttendanceRawData",
                method: "POST",
                body: body
            })
        })
    }),
});

export const {
    useGetAttendanceRawDataMutation
} = rawReportApi;
