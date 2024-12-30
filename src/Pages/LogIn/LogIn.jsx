import React from 'react'
import './LogIn.css'

const LogIn = () => {
    return (
        <div className='login'>
            <div className='login-title'><h1>Login</h1></div>
            <div className='login-container'>
                <div className='login-left'></div>
                <div className='login-right'>
                    <div className='login-form-box'>
                        <form>
                            <p>UserName</p>
                            <input type='text' placeholder='Please Enter Username' />
                            <p>Password</p>
                            <input type='password' placeholder='......' />
                            <input type='submit' placeholder='Submit' />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LogIn
