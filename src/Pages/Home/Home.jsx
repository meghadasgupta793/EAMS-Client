import React, { useContext } from 'react'
import './home.css'
import { UserContext } from '../../StoreContext/UserContext';

import AdminDashboard from '../AdminPortal/AdminDashboard/AdminDashboard'
import EmployeeDashboard from '../EmployeePortal/EmployeeDashboard/EmployeeDashboard'
import VMSDashboard from '../VMSPortal/VMSDashboard/VMSDashboard'

const Home = () => {

   
    const { userRole } = useContext(UserContext); // Consume UserContext


 

    return (
        <div className='home'>
            {userRole === 'admin' ? (
                <AdminDashboard />
            ) : userRole === 'vms' ? (
                <VMSDashboard />
            ) : (
                <EmployeeDashboard />
            )}
        </div>

    );
};

export default Home
