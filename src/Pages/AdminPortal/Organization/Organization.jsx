import React, { useContext } from 'react'
import './organization.css'

import { ThemeContext } from '../../../ThemeContext'
import Header from '../../../Components/Header/Header'
import OrganizationDataTable from '../../../Components/Admin/OrganizationDataTable/OrganizationDataTable'
import OuTemplate from '../../../Components/Admin/OuTemplate/OuTemplate'

const Organization = () => {
    const { DarkTheme } = useContext(ThemeContext)
    return (
        <div className={`organization ${DarkTheme && "dark"}`}>
            <Header />
          
            <OrganizationDataTable />
        </div>
    )
}

export default Organization
