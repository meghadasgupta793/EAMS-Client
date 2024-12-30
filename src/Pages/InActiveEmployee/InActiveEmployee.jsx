import React, { useContext } from 'react'
import './inActiveEmployee.css'
import { ThemeContext } from '../../ThemeContext'
import Header from '../../Components/Header/Header'

const InactiveEmployee = () => {

    const { DarkTheme } = useContext(ThemeContext)


    return (
        <div className={`inActiveEmployee ${DarkTheme && "dark"}`}>
            <Header />
            <h1>InactiveEmployee</h1>
        </div>
    )
}

export default InactiveEmployee
