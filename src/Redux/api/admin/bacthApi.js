import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../../features/baseQueryWithReauth';

export const batchApi = createApi({
    reducerPath: 'batchApi',
    baseQuery: baseQueryWithReauth,

    endpoints: (builder) => ({
        getAllBatch: builder.query({
            query: () => "/batches/allBatches",
            providesTags: ['Batch'],
        }),

        getBatchById: builder.query({
            query: (id) => `/batches/${id}`,
            providesTags: ['Batch'],
        }),

        createBatch: builder.mutation({
            query: ({ Code, Name }) => ({
                url: "/batches/createBatch",
                method: "POST",
                body: { Code, Name }
            }),
            invalidatesTags: ['Batch'],
        }),

        updateBatch: builder.mutation({
            query: ({ id, Code, Name }) => ({
                url: `/batches/updateBatch/${id}`,
                method: 'PUT',
                body: { Code, Name }
            }),
            invalidatesTags: ['Batch'],
        }),

        deleteBatch: builder.mutation({
            query: (id) => ({
                url: `/batches/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Batch'],
        }),
    }),
});

export const {
    useGetAllBatchQuery,
    useGetBatchByIdQuery,
    useCreateBatchMutation,
    useUpdateBatchMutation,
    useDeleteBatchMutation
} = batchApi;
