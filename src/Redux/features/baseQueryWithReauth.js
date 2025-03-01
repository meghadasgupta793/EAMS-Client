import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logout } from './authSlice';
import Cookies from 'js-cookie';
import config from '../../secrect';

const { url } = config;

// Create a baseQuery instance (reuse it)
const baseQuery = fetchBaseQuery({
  baseUrl: `${url}/api`,
  credentials: "include", // Ensure credentials (cookies) are included
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
      // Clear cookies and dispatch logout
      Cookies.remove('user');  // Remove user info stored in cookies
      api.dispatch(logout());
    }
  }

  return result;
};

export default baseQueryWithReauth;