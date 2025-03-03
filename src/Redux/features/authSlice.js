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
    user: getInitialUser(),
    token: getInitialToken(),
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.clear();
      sessionStorage.clear();
    },
    logoutAndRedirect: (state) => {
      state.user = null;
      state.token = null;
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/Login"; // Redirect after logout
    },
  },
});

export const { setCredentials, logout, logoutAndRedirect } = authSlice.actions;
export default authSlice.reducer;
