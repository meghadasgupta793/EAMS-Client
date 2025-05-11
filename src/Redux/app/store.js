import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';

import authReducer from '../features/authSlice';
import { userApi } from '../api/admin/userApi';
import { vmsApi } from '../api/vms/vmsApi';
import { departmentApi } from '../api/admin/departmentApi';
import { designationApi } from '../api/admin/designationApi';
import cropImageReducer from '../slice/cropImageSlice';  // Import the new cropImage slice
import sidebarReducer from '../slice/sidebarSlice';  //
import { categoryApi } from '../api/admin/categoryApi';
import { batchApi } from '../api/admin/bacthApi';
import { ouApi } from '../api/admin/ouApi';
import { shiftApi } from '../api/admin/shiftApi';
import { holidayApi } from '../api/admin/holidayApi';
import { employeeApi } from '../api/admin/employeeApi';
import { essAttendanceApi } from '../api/ess/employeeAttendance';
import { adminDashboardApi } from '../api/admin/adminDashboardApi';
import { approvalSetupApi } from '../api/admin/approvalSetupApi';
import { rawReportApi } from '../api/report/rawReportApi';
import { attendanceReportApi } from '../api/report/attendanceReportApi';
import { essDashBoardApi } from '../api/ess/essDashBoardAPI';




export const store = configureStore({
  reducer: {
    auth: authReducer,
    cropImage: cropImageReducer,  // Add cropImage reducer
    sidebar: sidebarReducer, // Add sidebar reducer
    [userApi.reducerPath]: userApi.reducer,
    [vmsApi.reducerPath]: vmsApi.reducer,
    [departmentApi.reducerPath]:departmentApi.reducer,
    [designationApi.reducerPath]:designationApi.reducer,
    [categoryApi.reducerPath]:categoryApi.reducer,
    [batchApi.reducerPath]:batchApi.reducer,
    [ouApi.reducerPath]:ouApi.reducer,
    [shiftApi.reducerPath]:shiftApi.reducer,
    [holidayApi.reducerPath]:holidayApi.reducer,
    [employeeApi.reducerPath]:employeeApi.reducer,
    [essAttendanceApi.reducerPath]:essAttendanceApi.reducer,
    [adminDashboardApi.reducerPath]:adminDashboardApi.reducer,
    [approvalSetupApi.reducerPath]:approvalSetupApi.reducer,
    [rawReportApi.reducerPath]:rawReportApi.reducer,
    [attendanceReportApi.reducerPath]:attendanceReportApi.reducer,
    [essDashBoardApi.reducerPath]:essDashBoardApi.reducer

  },



  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      vmsApi.middleware,
      departmentApi.middleware,
      designationApi.middleware,
      categoryApi.middleware,
      batchApi.middleware,
      ouApi.middleware,
      shiftApi.middleware,
      holidayApi.middleware,
      employeeApi.middleware,
      essAttendanceApi.middleware,
      adminDashboardApi.middleware,
      approvalSetupApi.middleware,
      rawReportApi.middleware,
      attendanceReportApi.middleware,
      essDashBoardApi.middleware

    ),
});

setupListeners(store.dispatch);

export default store;