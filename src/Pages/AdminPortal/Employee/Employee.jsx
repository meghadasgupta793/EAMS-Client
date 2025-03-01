import React, { useContext } from 'react'
import './employee.css'
import Header from '../../../Components/Header/Header'
import EmployeeDataTable from '../../../Components/Admin/EmployeeDataTable/EmployeeDataTable'

const Employee = () => {




    return (
        <div className='employee'>
            <Header />
         
            <EmployeeDataTable />
        </div>
    )
}

export default Employee
