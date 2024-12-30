import React, { useContext } from 'react'
import './employee.css'
import { ThemeContext } from '../../../ThemeContext'
import Header from '../../../Components/Header/Header'
import EmployeeDataTable from '../../../Components/Admin/EmployeeDataTable/EmployeeDataTable'

const Employee = () => {

    const { DarkTheme } = useContext(ThemeContext)


    return (
        <div className={`employee ${DarkTheme && "dark"}`}>
            <Header />
         
            <EmployeeDataTable />
        </div>
    )
}

export default Employee
