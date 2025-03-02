import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logout } from './authSlice';
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
  // Perform the API request
  const result = await baseQuery(args, api, extraOptions);

  // Check for authentication failure (invalid/expired token)
  if (result.error) {
    const { status, data } = result.error;

    // Handle token expiration or invalid token
    if (
      (status === 403 && (data?.message === 'Invalid token' || data?.message === 'Token expired')) ||
      status === 401
    ) {
      api.dispatch(logout()); // Dispatch logout action
    }
  }

  return result;
};

export default baseQueryWithReauth;