import React, { useContext } from 'react'
import './home.css'
import { ThemeContext } from '../../ThemeContext'
import { UserContext } from '../../StoreContext/UserContext';

import AdminDashboard from '../AdminPortal/AdminDashboard/AdminDashboard'
import EmployeeDashboard from '../EmployeePortal/EmployeeDashboard/EmployeeDashboard'

const Home = () => {

    const { DarkTheme } = useContext(ThemeContext);
    const { userRole } = useContext(UserContext); // Consume UserContext

 


     return (
        <div className={`home ${DarkTheme && 'dark'}`}>
            {userRole === 'admin' ? <AdminDashboard /> : <EmployeeDashboard />}
        </div>
    );
};

export default Home
