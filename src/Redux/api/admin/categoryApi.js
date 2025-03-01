import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../../features/baseQueryWithReauth';

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: baseQueryWithReauth,

    endpoints: (builder) => ({
        getAllCategory: builder.query({
            query: () => "/categorys/allCategories",
            providesTags: ['Category'],
        }),

        getCategoryById: builder.query({
            query: (id) => `/categorys/${id}`,
            providesTags: ['Category'],
        }),

        createCategory: builder.mutation({
            query: ({ Code, Name }) => ({
                url: "/categorys/createCategory",
                method: "POST",
                body: { Code, Name }
            }),
            invalidatesTags: ['Category'],
        }),

        updateCategory: builder.mutation({
            query: ({ id, Code, Name }) => ({
                url: `/categorys/updateCategory/${id}`,
                method: 'PUT',
                body: { Code, Name }
            }),
            invalidatesTags: ['Category'],
        }),

        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `/categorys/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Category'],
        }),
    }),
});

export const {
    useGetAllCategoryQuery,
    useGetCategoryByIdQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation
} = categoryApi;
