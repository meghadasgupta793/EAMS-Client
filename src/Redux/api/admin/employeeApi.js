import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../../features/baseQueryWithReauth';

export const employeeApi = createApi({
    reducerPath: 'employeeApi',
    baseQuery: baseQueryWithReauth,

    endpoints: (builder) => ({
        getAllEmployees: builder.query({
            query: () => "/employee/allEmployees",
            providesTags: ['Employee'],
        }),
        getAllEmpInfo: builder.query({
            query: () => "/employee/allEmpInfo",
            providesTags: ['EmpInfo'],
        }),

        getEmployeeById: builder.query({
            query: (id) => `/employee/${id}`,
            providesTags: ['Employee'],
        }),
 createEmployee: builder.mutation({
            query: (employeeData) => {
                return {
                    url: '/employee/createEmployee',
                    method: 'POST',
                    body: employeeData,
                };
            },
            invalidatesTags: ['Employee'],
        }),

        updateEmployee: builder.mutation({
            query: ({ id, employeeData }) =>  {
                return {
                    url: `/employee/updateEmployee/${id}`,
                    method: 'PUT',
                    body: employeeData,
                };
            },
            invalidatesTags: ['Employee'],
        }),

        deleteEmployee: builder.mutation({
            query: (id) => ({
                url: `/employee/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Employee'],
        }),

        getEmployeeByempNo: builder.query({
            query: (empNo) =>  {
                return {
                    url: `/employee/getEmployeeByempNo/${empNo}`,
                   
                };
            },
            
          
        }),
        getEmpInfoByeID: builder.query({
            query: (id) =>  {
                return {
                    url: `/employee/getEmpInfoByID/${id}`,
                   
                };
            },
            
          
        }),
    }),
});

export const {
    useGetAllEmployeesQuery,
    useGetAllEmpInfoQuery,
    useGetEmployeeByIdQuery,
    useCreateEmployeeMutation,
    useUpdateEmployeeMutation,
    useDeleteEmployeeMutation,
    useGetEmployeeByempNoQuery,
    useGetEmpInfoByeIDQuery

} = employeeApi;
