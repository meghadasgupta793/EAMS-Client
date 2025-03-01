import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../../features/baseQueryWithReauth';

export const ouApi = createApi({
    reducerPath: 'ouApi',
    baseQuery: baseQueryWithReauth,

    endpoints: (builder) => ({
        getAllOu: builder.query({
            query: () => "/ou/getAllOu",
            providesTags: ['OU'],
        }),

        getOuById: builder.query({
            query: (id) => `/ou/${id}`,
            providesTags: ['OU'],
        }),

createOu: builder.mutation({
    query: ({ OUCode, OUName, OUType, ParentOU, OwnerID }) => ({
        url: "/ou/createOu",
        method: "POST",
        body: { OUCode, OUName, OUType, ParentOU, OwnerID },
    }),
    invalidatesTags: ['OU'],
}),

        updateOu: builder.mutation({
            query: (data) => {
                console.log("API Request Payload:", data); // Log the payload before sending
                return {
                    url: `/ou/updateOu/${data.id}`,
                    method: 'PUT',
                    body: data, // Ensure data is being sent correctly
                };
            },
            invalidatesTags: ['OU'],
        }),


        deleteOu: builder.mutation({
            query: (id) => ({
                url: `/ou/deleteOu/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['OU'],
        }),



        getAllOuType: builder.query({
            query: () => "/ou/getAllOuType",
            providesTags: ['OUType'],
        }),

        getOuTypeById: builder.query({
            query: (id) => `/ou/ouType/${id}`,
            providesTags: ['OUType'],
        }),

        createOuType: builder.mutation({
            query: ({ OUType }) => ({
                url: "/ou/createOuType",
                method: "POST",
                body: { OUType }
            }),
            invalidatesTags: ['OUType'],
        }),

        updateOuType: builder.mutation({
            query: ({ id, OUType }) => ({
                url: `/ou/updateOuType/${id}`,
                method: 'PUT',
                body: { OUType }
            }),
            invalidatesTags: ['OUType'],
        }),

        deleteOuType: builder.mutation({
            query: (id) => ({
                url: `/ou/deleteOuType/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['OUType'],
        }),



        getAllOuOwner: builder.query({
            query: () => "/ou/getAllOuOwner",
            providesTags: ['OUOwner'],
        }),

        getOuOwnerById: builder.query({
            query: (id) => `/ou/ouOwner/${id}`,
            providesTags: ['OUOwner'],
        }),

        createOuOwner: builder.mutation({
            query: ({ Name, MobNo, EmailID, SecondaryEmailID }) => ({
                url: "/ou/createOuOwner",
                method: "POST",
                body: { Name, MobNo, EmailID, SecondaryEmailID }
            }),
            invalidatesTags: ['OUOwner'],
        }),

        updateOuOwner: builder.mutation({
            query: ({ id, Name, MobNo, EmailID, SecondaryEmailID }) => ({
                url: `/ou/updateOuOwner/${id}`,
                method: 'PUT',
                body: { id, Name, MobNo, EmailID, SecondaryEmailID }
            }),
            invalidatesTags: ['OUOwner'],
        }),

        deleteOuOwner: builder.mutation({
            query: (id) => ({
                url: `/ou/deleteOuOwner/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['OUOwner'],
        }),
    }),
});

export const {
    useGetAllOuQuery,
    useGetOuByIdQuery,
    useCreateOuMutation,
    useUpdateOuMutation,
    useDeleteOuMutation,

    useGetAllOuOwnerQuery,
    useGetOuOwnerByIdQuery,
    useCreateOuOwnerMutation,
    useUpdateOuOwnerMutation,
    useDeleteOuOwnerMutation,

    useGetAllOuTypeQuery,
    useGetOuTypeByIdQuery,
    useCreateOuTypeMutation,
    useUpdateOuTypeMutation,
    useDeleteOuTypeMutation,
} = ouApi;
