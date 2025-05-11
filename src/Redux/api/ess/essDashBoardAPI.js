import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../../features/baseQueryWithReauth';

export const essDashBoardApi = createApi({
  reducerPath: 'essDashBoardApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getEmployeeUpcomingHolidays: builder.mutation({
      query: ({ EmployeeID }) => ({
        url: "essDashBoard/getEmployeeUpcomingHolidays",
        method: "POST",
        body: { EmployeeID },
      }),
    }),
    getOccasions: builder.query({
      query: () => ({
        url: "essDashBoard/getoccasions",
        method: "GET",
      }),
    }),
  }),
});

export const { 
  useGetEmployeeUpcomingHolidaysMutation,
  useGetOccasionsQuery 
} = essDashBoardApi;
