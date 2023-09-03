// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    isAdmin: false,
  },
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
      state.isAdmin = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.isAdmin = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectIsAdmin = (state) => state.auth.isAdmin;
export default authSlice.reducer;
