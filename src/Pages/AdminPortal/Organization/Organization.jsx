import React, { useContext } from 'react'
import './organization.css'

import { ThemeContext } from '../../../ThemeContext'
import Header from '../../../Components/Header/Header'
import OrganizationDataTable from '../../../Components/Admin/OrganizationDataTable/OrganizationDataTable'
import OuTemplate from '../../../Components/Admin/OuTemplate/OuTemplate'

const Organization = () => {

    return (
        <div className='organization'>
            <Header />
          
            <OrganizationDataTable />
        </div>
    )
}

export default Organization
