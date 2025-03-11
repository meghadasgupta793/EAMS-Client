import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './App.css';

import Navigation from './Components/Navigation/Navigation';
import ProtectedRoute from "./ProtectedRoute"; // Import the ProtectedRoute component
import Home from './Pages/Home/Home';
import Department from './Pages/AdminPortal/Department/Department';
import Employee from './Pages/AdminPortal/Employee/Employee';
import { UserProvider } from './StoreContext/UserContext';
import EmployeeDashboard from './Pages/EmployeePortal/EmployeeDashboard/EmployeeDashboard';
import Organization from './Pages/AdminPortal/Organization/Organization';
import CreateEmployee from './Components/Admin/CreateEmployee/CreateEmployee';
import AutoShiftScheme from './Pages/AdminPortal/AutoShiftScheme/AutoShiftScheme';
import Shift from './Pages/AdminPortal/Shift/Shift';
import CreateShift from './Components/Admin/CreateShift/CreateShift';
import Holiday from './Pages/AdminPortal/Holiday/Holiday';
import CreateHoliday from './Components/Admin/CreateHoliday/CreateHoliday';
import HolidayGroup from './Pages/AdminPortal/HolidayGroup/HolidayGroup';
import InActiveEmployee from './Pages/AdminPortal/InActiveEmployee/InActiveEmployee';
import CreateInActiveEmployee from './Components/Admin/CreateInActiveEmployee/CreateInActiveEmployee';
import Designation from './Pages/AdminPortal/Designation/Designation';
import CreateDepartment from './Components/Admin/CreateDepartment/CreateDepartment';
import CreateDesignation from './Components/Admin/CreateDesignation/CreateDesignation';
import UpdateEmployee from './Components/Admin/UpdateEmployee/UpdateEmployee';
import UpdateDepartment from './Components/Admin/UpdateDepartment/UpdateDepartment';
import UpdateDesignation from './Components/Admin/UpdateDesignation/UpdateDesignation';
import UpdateShift from './Components/Admin/UpdateShift/UpdateShift';
import UpdateHoliday from './Components/Admin/UpdateHoliday/UpdateHoliday';
import CreateOU from './Components/Admin/CreateOU/CreateOU';
import UpdateOU from './Components/Admin/UpdateOU/UpdateOU';
import ApprovalSetup from './Pages/AdminPortal/ApprovalSetup/ApprovalSetup';
import OuTypeOuOwner from './Components/Admin/OuTypeOuOwner/OuTypeOuOwner';
import MyLeave from './Pages/EmployeePortal/MyLeave/MyLeave';
import LogIn from './Pages/LogIn/LogIn';
import ApplyAttendance from './Pages/EmployeePortal/ApplyAttendance/ApplyAttendance';
import ApplyTour from './Pages/EmployeePortal/ApplyTour/ApplyTour';
import MyProfileUpdate from './Pages/EmployeePortal/MyProfileUpdate/MyProfileUpdate';
import { FaceRecognitionProvider } from './StoreContext/FaceRecognitionContext';
import MyApprovalHierarchy from './Pages/EmployeePortal/MyApprovalHierarchy/MyApprovalHierarchy';
import MyAttendanceReport from './Pages/EmployeePortal/MyAttendanceReport/MyAttendanceReport';
import MyNotification from './Pages/EmployeePortal/MyNotification/MyNotification';
import MyLateRegularization from './Pages/EmployeePortal/MyLateRegularization/MyLateRegularization';
import MyEarlyRegularization from './Pages/EmployeePortal/MyEarlyRegularization/MyEarlyRegularization';
import DeviceDashboard from './Pages/AdminPortal/Device/DeviceDashboard/DeviceDashboard';
import UnAssignDeviceList from './Pages/AdminPortal/Device/UnAssignDeviceList/UnAssignDeviceList';
import VMSDashboard from './Pages/VMSPortal/VMSDashboard/VMSDashboard';
import AppointmentStatusTable from './Pages/VMSPortal/Appointment/AppointmentStatusTable/AppointmentStatusTable';
import InviteAppointment from './Pages/VMSPortal/Appointment/InviteAppointment/InviteAppointment';
import DirectAppointment from './Pages/VMSPortal/Appointment/DirectAppointment/DirectAppointment';
import AccessLocation from './Pages/VMSPortal/AccessControl/AccessLocation/AccessLocation';
import VisitorKiosk from './Pages/VMSPortal/Appointment/VisitorKiosk/VisitorKiosk';
import Category from './Pages/AdminPortal/Category/Category';
import Batch from './Pages/AdminPortal/Batch/Batch';
import CreateCategory from './Components/Admin/CreateCategory/CreateCategory';
import UpdateCategory from './Components/Admin/UpdateCategory/UpdateCategory';
import CreateBatch from './Components/Admin/CreateBatch/CreateBatch';
import UpdateBatch from './Components/Admin/UpdateBatch/UpdateBatch';
import CheckIn from './Pages/VMSPortal/Appointment/CheckIn/CheckIn';
import VisitorPass from './Components/VMS/VisitorPass/VisitorPass';
import MyTeam from './Pages/EmployeePortal/MyTeam/MyTeam';
import MyTeamAttendance from './Components/Employee/MyTeamAttendance/MyTeamAttendance';
import VisitorInvitationReview from './Components/VMS/VisitorInvitationReview/VisitorInvitationReview';
import AttendanceRawReport from './Pages/AdminPortal/Reports/AttendanceRawReport/AttendanceRawReport';
import MyTeamsReports from './Pages/EmployeePortal/Reports/MyTeamsReports/MyTeamsReports';

function App() {
  return (
    <UserProvider>
      <Router>
        <MainAppContent />
      </Router>
    </UserProvider>
  );
}

// Main component containing the routing logic and conditional rendering
function MainAppContent() {
  const location = useLocation();

  // Define routes where the Navigation bar should not be shown
  const noNavigationRoutes = ["/Login"];

  // Check if the current route starts with "/visitor-pass" or "/kiosk-appointment"
  const isSpecialRoute = location.pathname.startsWith("/visitor-pass") || location.pathname.startsWith("/kiosk-appointment");

  // Check if the current route is in the noNavigationRoutes array or is a special route
  const shouldShowNavigation = !noNavigationRoutes.includes(location.pathname) && !isSpecialRoute;
  return (
    <div className="App">
      {/* Conditionally render Navigation based on the route */}
      {shouldShowNavigation && <Navigation />}

      <Routes>
        <Route path="/Login" element={<LogIn />} />
        <Route path="/" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/EmployeeDashboard" element={<ProtectedRoute element={<EmployeeDashboard />} />} />
        <Route path="/VMSDashboard" element={<ProtectedRoute element={<VMSDashboard />} />} />
        <Route path="/MyLeave" element={<ProtectedRoute element={<MyLeave />} />} />
        <Route path="/ApplyAttendance" element={<ProtectedRoute element={
          <FaceRecognitionProvider>
            <ApplyAttendance />
          </FaceRecognitionProvider>
        }
        />
        }
        />
        <Route path="/ApplyTour" element={<ProtectedRoute element={<ApplyTour />} />} />
        <Route path="/MyProfileUpdate" element={<ProtectedRoute element={<MyProfileUpdate />} />} />
        <Route path="/MyApprovalHierarchy" element={<ProtectedRoute element={<MyApprovalHierarchy />} />} />
        <Route path="/my-teams" element={<ProtectedRoute element={<MyTeam />} />} />
        <Route path="/my-teams-attendance/:empNo" element={<ProtectedRoute element={<MyTeamAttendance />} />} />
        <Route path="/Organization" element={<ProtectedRoute element={<Organization />} />} />
        <Route path="/newOU" element={<ProtectedRoute element={<CreateOU />} />} />
        <Route path="/updateOU/:id" element={<ProtectedRoute element={<UpdateOU />} />} />
        <Route path="/OuOwnerandOuOwner" element={<ProtectedRoute element={<OuTypeOuOwner />} />} />
        <Route path="/department" element={<ProtectedRoute element={<Department />} />} />
        <Route path="/newDepartment" element={<ProtectedRoute element={<CreateDepartment />} />} />
        <Route path="/updateDepartment/:id" element={<ProtectedRoute element={<UpdateDepartment />} />} />
        <Route path="/designation" element={<ProtectedRoute element={<Designation />} />} />
        <Route path="/newDesignation" element={<ProtectedRoute element={<CreateDesignation />} />} />
        <Route path="/updateDesignation/:id" element={<ProtectedRoute element={<UpdateDesignation />} />} />
        <Route path="/category" element={<ProtectedRoute element={<Category />} />} />
        <Route path="/newCategory" element={<ProtectedRoute element={<CreateCategory />} />} />
        <Route path="/updateCategory/:id" element={<ProtectedRoute element={<UpdateCategory />} />} />
        <Route path="/batch" element={<ProtectedRoute element={<Batch />} />} />
        <Route path="/newBatch" element={<ProtectedRoute element={<CreateBatch />} />} />
        <Route path="/updateBatch/:id" element={<ProtectedRoute element={<UpdateBatch />} />} />
        <Route path="/employee" element={<ProtectedRoute element={<Employee />} />} />
        <Route path="/newEmployee" element={<ProtectedRoute element={<CreateEmployee />} />} />
        <Route path="/updateEmployee/:id" element={<ProtectedRoute element={<UpdateEmployee />} />} />
        <Route path="/inActiveEmployee" element={<ProtectedRoute element={<InActiveEmployee />} />} />
        <Route path="/newinActiveEmployee" element={<ProtectedRoute element={<CreateInActiveEmployee />} />} />
        <Route path="/shift" element={<ProtectedRoute element={<Shift />} />} />
        <Route path="/newShift" element={<ProtectedRoute element={<CreateShift />} />} />
        <Route path="/updateShift/:Code" element={<ProtectedRoute element={<UpdateShift />} />} />
        <Route path="/autoShiftScheme" element={<ProtectedRoute element={<AutoShiftScheme />} />} />
        <Route path="/holiday" element={<ProtectedRoute element={<Holiday />} />} />
        <Route path="/newHoliday" element={<ProtectedRoute element={<CreateHoliday />} />} />
        <Route path="/updateHoliday/:id" element={<ProtectedRoute element={<UpdateHoliday />} />} />
        <Route path="/holidayGroup" element={<ProtectedRoute element={<HolidayGroup />} />} />
        <Route path="/approvalSetup/:id" element={<ProtectedRoute element={<ApprovalSetup />} />} />
        <Route path="/my-attendance-report" element={<ProtectedRoute element={<MyAttendanceReport />} />} />
        <Route path="/notification" element={<ProtectedRoute element={<MyNotification />} />} />
        <Route path="/my-Late-Regularization" element={<ProtectedRoute element={<MyLateRegularization />} />} />
        <Route path="/my-Early-Regularization" element={<ProtectedRoute element={<MyEarlyRegularization />} />} />
        <Route path="/device-dashboard" element={<ProtectedRoute element={<DeviceDashboard />} />} />
        <Route path="/unassign-device-list" element={<ProtectedRoute element={<UnAssignDeviceList />} />} />
        <Route path="/appointment-status" element={<ProtectedRoute element={<AppointmentStatusTable />} />} />
        <Route path="/invite-appointment" element={<ProtectedRoute element={<InviteAppointment />} />} />
        <Route path="/direct-appointment" element={<ProtectedRoute element={<DirectAppointment />} />} />
        <Route path="/kiosk-appointment" element={<ProtectedRoute element={<VisitorKiosk />} />} />
        <Route path="/access-location" element={<ProtectedRoute element={<AccessLocation />} />} />
        <Route path="/vms/appointment/checkIn/:AppointmentId" element={<ProtectedRoute element={<CheckIn />} />} />
        {/* Add the VisitorPass route without ProtectedRoute */}
        <Route path="/visitor-pass/:appointmentId" element={<VisitorPass />} />

        <Route path="/visitor-invitation-review/:token" element={<VisitorInvitationReview />} />

        {/*Reports*/}
        <Route path="/attendanceRawReport" element={<ProtectedRoute element={<AttendanceRawReport />} />} />
        <Route path="/myTeams-report" element={<ProtectedRoute element={<MyTeamsReports />} />} />
      </Routes>
    </div>
  );
}

export default App;