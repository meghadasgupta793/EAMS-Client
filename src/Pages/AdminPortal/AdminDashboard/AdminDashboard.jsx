import React, { useContext } from 'react'
import './adminDashboard.css'
import { ThemeContext } from '../../../ThemeContext'
import Header from '../../../Components/Header/Header'
import Widgets from '../../../Components/AdminDashboard/Widgets/Widgets'
import AdminDashboardPiechart from '../../../Components/AdminDashboard/Charts/PieChart/AdminDashboardPiechart'
import AdminDashboardBarChart from '../../../Components/AdminDashboard/Charts/BarChart/AdminDashboardBarChart'
import LatestAttendance from '../../../Components/AdminDashboard/LatestAttendance/LatestAttendance'
import Navigation from '../../../Components/Navigation/Navigation'

const AdminDashboard = () => {

    const { DarkTheme } = useContext(ThemeContext)

    const colors = ['#D6E8EE', '#97CADB', '#018ABE'];
    const data = [
        { id: 0, value: 27, label: 'On Time' },
        { id: 1, value: 30, label: 'Late Arrival' },
        { id: 2, value: 40, label: 'Early Departures' },
        { id: 3, value: 50, label: 'Absent' },
    ];



    return (
        <div className='adminDashboard'>
        
            <Header />

            <div className='dashboard'>
                <div className='box box1'><LatestAttendance /></div>
                <div className='box box2'><Widgets type="Present" count='8890' /></div>
                <div className='box box3'><Widgets type="Late Arrival" count='82' /></div>
                <div className='box box4'><Widgets type="Early Exit" count='856' /></div>
                <div className='box box5'><Widgets type="Absent" count='878' /></div>
                <div className='box box6'><Widgets type="Week-off" count='809' /></div>
                <div className='box box7'><Widgets type="On-Leave" count='809' /></div>
                <div className='box box8'><AdminDashboardPiechart data={data} colors={colors} title="Employee Attendance Overview" /></div>
                <div className='box box9'><AdminDashboardBarChart /></div>


            </div>
        </div>
    )
}

export default AdminDashboard
