import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../../features/baseQueryWithReauth';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithReauth,

  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ UserName, Password }) => ({
        url: '/user/Login',
        method: 'POST',  // ✅ Make sure this is POST
        headers: {
          Authorization: `Basic ${btoa(`${UserName}:${Password}`)}`, // Encode credentials in Base64
          'Content-Type': 'application/json',
        },
        body: {}, // ✅ Even if empty, body should exist for POST requests
      }),
    }),


    getAllUsers: builder.query({
      query: () => '/user/allUsers',
      providesTags: ['Users'],
    }),


    logout: builder.mutation({
      query: () => ({
        url: '/user/LogOut',
        method: 'POST',
      }),
    }),


    
  }),
});

export const { useGetAllUsersQuery, useLoginMutation, useLogoutMutation } = userApi;
