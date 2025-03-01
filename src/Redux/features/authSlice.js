import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import baseQueryWithReauth from './baseQueryWithReauth';

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null },
  reducers: {
    setCredentials: (state, action) => {
      const userData = action.payload;

      // Store user information in cookies
      Cookies.set('user', JSON.stringify(userData), { expires: 7, path: '' });

      // Set the user in the Redux state
      state.user = userData;
    },
    logout: (state, action) => {
      state.user = null;

      // Remove user from cookies
      Cookies.remove('user');
   

      // Manually invalidate cache for specific queries
      action.asyncDispatch(baseQueryWithReauth.util.invalidateTags(['Users', 'Departments']));
    },
    loadCredentials: (state) => {
      // Check if the user exists in cookies and load into the state
      const user = Cookies.get('user');

      if (user) {
        state.user = JSON.parse(user);
      }
    },
  },
});

export const { setCredentials, logout, loadCredentials } = authSlice.actions;
export default authSlice.reducer;
