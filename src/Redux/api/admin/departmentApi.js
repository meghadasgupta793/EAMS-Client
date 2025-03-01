import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../../features/baseQueryWithReauth';

export const departmentApi = createApi({
    reducerPath: 'departmentsApi',
    baseQuery: baseQueryWithReauth,

    endpoints: (builder) => ({
        getAllDepartment: builder.query({
            query: () => "/departments/allDepartment",
            providesTags: ['Department'],
        }),

        getDepartmentById: builder.query({  // ✅ Fixed: Changed mutation to query
            query: (id) => `/departments/${id}`, // ✅ Removed unnecessary object wrapper
            providesTags: ['Department'],
        }),

        createDepartment: builder.mutation({
            query: ({ Code, Name }) => ({
                url: "/departments/createDepartment",
                method: "POST",
                body: { Code, Name }
            }),
            invalidatesTags: ['Department'],
        }),

        updateDepartment: builder.mutation({
            query: ({ id, Code, Name }) => ({
                url: `/departments/updateDepartment/${id}`,
                method: 'PUT',
                body: { Code, Name }
            }),
            invalidatesTags: ['Department'],
        }),

        deleteDepartment: builder.mutation({
            query: (id) => ({
                url: `/departments/${id}`, // Remove 'deleteDepartment' if not needed
                method: 'DELETE',
            }),
            invalidatesTags: ['Department'],
        }),
    }),
});

export const {
    useGetAllDepartmentQuery,
    useGetDepartmentByIdQuery, // ✅ Fixed: Properly named export
    useCreateDepartmentMutation,
    useUpdateDepartmentMutation,
    useDeleteDepartmentMutation
} = departmentApi;
