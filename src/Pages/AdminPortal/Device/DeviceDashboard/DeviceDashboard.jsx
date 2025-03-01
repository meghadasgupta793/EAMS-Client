import React from 'react'
import './DeviceDashboard.css'
import Header from '../../../../Components/Header/Header'
import DeviceHealthStatus from '../../../../Components/Device/DeviceDashboardBox/DeviceHealthStatus/DeviceHealthStatus'

const DeviceDashboard = () => {
    return (
        <>
            <div className='device-dashboard'>
                <Header />
                <div className='device-dashboard-container'>
                    <div className='device-dashboard-box   d-dash-box1'><DeviceHealthStatus /> </div>
                    <div className='device-dashboard-box   d-dash-box2'>Enrollment Status
                        <h3>  Total User, Register User, Un-Register User</h3></div>

                </div>
            </div>
        </>
    )
}

export default DeviceDashboard
