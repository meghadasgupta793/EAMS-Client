import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './App.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navigation from './Components/Navigation/Navigation';
import { ThemeContext } from './ThemeContext';
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

function App() {
  const [DarkTheme, setDarkTheme] = useState(true);

  return (
    <ThemeContext.Provider value={{ DarkTheme, setDarkTheme }}>
      <UserProvider>
        <FaceRecognitionProvider>
          <Router>
            <MainAppContent />
          </Router>
        </FaceRecognitionProvider>

      </UserProvider>
    </ThemeContext.Provider>
  );
}

// Main component containing the routing logic and conditional rendering
function MainAppContent() {
  const location = useLocation();

  return (
    <div className="App">
      {/* Only render Navigation if not on the /Login page */}
      {location.pathname !== "/Login" && <Navigation />}
      <Routes>
        <Route path="/Login" element={<LogIn />} />
        <Route path="/" element={<Home />} />
        <Route path="/EmployeeDashboard" element={<EmployeeDashboard />} />
        <Route path="/MyLeave" element={<MyLeave />} />
        <Route path="/ApplyAttendance" element={<ApplyAttendance />} />
        <Route path="/ApplyTour" element={<ApplyTour />} />
        <Route path="/MyProfileUpdate" element={<MyProfileUpdate />} />
        <Route path="/MyApprovalHierarchy" element={<MyApprovalHierarchy />} />
        <Route path="/Organization" element={<Organization />} />
        <Route path="/newOU" element={<CreateOU />} />
        <Route path="/updateOU" element={<UpdateOU />} />
        <Route path="/OuOwnerandOuOwner" element={<OuTypeOuOwner />} />
        <Route path="/department" element={<Department />} />
        <Route path="/newDepartment" element={<CreateDepartment />} />
        <Route path="/updateDepartment" element={<UpdateDepartment />} />
        <Route path="/designation" element={<Designation />} />
        <Route path="/newDesignation" element={<CreateDesignation />} />
        <Route path="/updateDesignation" element={<UpdateDesignation />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/newEmployee" element={<CreateEmployee />} />
        <Route path="/updateEmployee" element={<UpdateEmployee />} />
        <Route path="/inActiveEmployeee" element={<InActiveEmployee />} />
        <Route path="/newinActiveEmployee" element={<CreateInActiveEmployee />} />
        <Route path="/shift" element={<Shift />} />
        <Route path="/newShift" element={<CreateShift />} />
        <Route path="/updateShift" element={<UpdateShift />} />
        <Route path="/autoShiftScheme" element={<AutoShiftScheme />} />
        <Route path="/holiday" element={<Holiday />} />
        <Route path="/newHoliday" element={<CreateHoliday />} />
        <Route path="/updateHoliday" element={<UpdateHoliday />} />
        <Route path="/holidayGroup" element={<HolidayGroup />} />
        <Route path="/approvalSetup" element={<ApprovalSetup />} />
        <Route path="/my-attendance-report" element={<MyAttendanceReport />} />
        <Route path="/notification" element={<MyNotification />} />
        <Route path="/my-Late-Regularization" element={<MyLateRegularization />} />
        <Route path="/my-Early-Regularization" element={<MyEarlyRegularization />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
