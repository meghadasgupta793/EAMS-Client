import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null }, // Store token in state
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;

      // Store user and token in Redux state
      state.user = user;
      state.token = token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null; // Clear token on logout
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
