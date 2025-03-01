import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../../features/baseQueryWithReauth';

export const designationApi = createApi({
    reducerPath: 'designationsApi',
    baseQuery: baseQueryWithReauth,

    endpoints: (builder) => ({
        getAllDesignation: builder.query({
            query: () => "/designations/allDesignation",
            providesTags: ['Designation'],
        }),

        getDesignationById: builder.query({  // ✅ Fixed: Changed mutation to query
            query: (id) => `/designations/${id}`, // ✅ Removed unnecessary object wrapper
            providesTags: ['Designation'],
        }),

        createDesignation: builder.mutation({
            query: ({ Code, Name }) => ({
                url: "/designations/createDesignation",
                method: "POST",
                body: { Code, Name }
            }),
            invalidatesTags: ['Designation'],
        }),

        updateDesignation: builder.mutation({
            query: ({ id, Code, Name }) => ({
                url: `/designations/updateDesignation/${id}`,
                method: 'PUT',
                body: { Code, Name }
            }),
            invalidatesTags: ['Designation'],
        }),

        deleteDesignation: builder.mutation({
            query: (id) => ({
                url: `/designations/${id}`, // Remove 'deleteDepartment' if not needed
                method: 'DELETE',
            }),
            invalidatesTags: ['Designation'],
        }),
    }),
});

export const {
    useGetAllDesignationQuery,
    useGetDesignationByIdQuery, // ✅ Properly named export
    useCreateDesignationMutation,
    useUpdateDesignationMutation,
    useDeleteDesignationMutation
} = designationApi;