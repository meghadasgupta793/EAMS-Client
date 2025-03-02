import { createSlice } from '@reduxjs/toolkit';

// Helper function to get token from localStorage
const getInitialToken = () => {
  return localStorage.getItem('token') || null;
};

// Helper function to get user from localStorage
const getInitialUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: getInitialUser(), // Initialize user from localStorage
    token: getInitialToken(), // Initialize token from localStorage
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;

      // Store user and token in Redux state
      state.user = user;
      state.token = token;

      // Persist user and token in localStorage
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;

      // Clear user and token from localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;