import React from 'react'
import './nav.css'

const Nav = ({ Icon, title, onClick }) => {
    return (
        <div className='nav' onClick={onClick}>
            {Icon && <Icon className="sidebar-icon" />}
            <h2>{title ? title : null}</h2>
        </div>
    )
}

export default Nav
