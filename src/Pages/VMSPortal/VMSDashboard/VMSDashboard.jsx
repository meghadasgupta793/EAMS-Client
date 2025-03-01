import React from 'react';
import './VMSDashboard.css';
import Header from '../../../Components/Header/Header';
import AppointmentStatus from '../../../Components/VMS/VMSDashboardBox/AppointmentStatus/AppointmentStatus';
import VisitorStatus from '../../../Components/VMS/VMSDashboardBox/VisitorStatus/VisitorStatus';
import PreRegistrationInvitations from '../../../Components/VMS/VMSDashboardBox/PreRegistrationInvitations/PreRegistrationInvitations';
import VisitorTracking from '../../../Components/VMS/VMSDashboardBox/VisitorTracking/VisitorTracking';
import VisitorCountTrend from '../../../Components/VMS/VMSDashboardBox/VisitorCountTrend/VisitorCountTrend';

const VMSDashboard = () => {


    return (
        <div className='vmsDashboard'>
            <Header />

            <div className='vmsdashboardBox'>
            
                <div className='vmsbox vmsbox1'><AppointmentStatus /></div>
                <div className='vmsbox vmsbox2'><VisitorTracking /></div>
              {/*<div className='vmsbox vmsbox3'><VisitorStatus /></div>*/}  
                <div className='vmsbox vmsbox4'><PreRegistrationInvitations /></div>
                <div className='vmsbox vmsbox5'> <h1>box 5</h1> <h1>Visitor Count Trend: A graphical representation of the number of visitors over a time period (e.g., daily, weekly, monthly) to identify trends and peak visit times.</h1></div>
                <div className='vmsbox vmsbox6'><VisitorCountTrend/></div>
           
           
            </div>
        </div>
    );
};

export default VMSDashboard;
