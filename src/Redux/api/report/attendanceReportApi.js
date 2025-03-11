import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../../features/baseQueryWithReauth';

export const attendanceReportApi = createApi({
    reducerPath: 'rawReportApi',
    baseQuery: baseQueryWithReauth,

    endpoints: (builder) => ({
       

        empDateWiseReport: builder.mutation({
            query: (body) => ({
                url: "/attendanceReport/empDateWiseReport",
                method: "POST",
                body: body
            })
        })
    }),
});

export const {
    useEmpDateWiseReportMutation
} = attendanceReportApi;
