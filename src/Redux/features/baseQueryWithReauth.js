import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logoutAndRedirect } from './authSlice';  // ✅ Ensure this import is correct
import config from '../../secrect';

const { url } = config;

// Create a baseQuery instance
const baseQuery = fetchBaseQuery({
  baseUrl: `${url}/api`,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token; // Retrieve token from Redux state

    if (token) {
      headers.set('Authorization', `Bearer ${token}`); // Attach token to headers
    }

    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    const { status, data } = result.error;

    if (
      (status === 403 && (data?.message === 'Invalid token' ||data?.message === 'Missing or invalid Authorization header' || data?.message === 'Token expired')) ||
      status === 401
    ) {
      api.dispatch(logoutAndRedirect()); // Dispatch logout with redirect
    }
  }

  return result;
};

export default baseQueryWithReauth;