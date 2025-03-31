import React, { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Login = () => {

    return (
        <div className="container">
            <h1 className="login-title">Login</h1>
            <div className="inputs">
                <div className="input">
                    <i className="fas fa-envelope"></i>
                    <input type="email" placeholder="email address" />
                </div>
                <div className="input">
                    <i className="fas fa-lock"></i>
                    <input type="password" placeholder="password" />
                </div>
            </div>
            <div className="submit-container">
                <button type="submit" className="login-button">Log in</button>
            </div>
            <div className="forgot-password">
                <Link to="/reset-password">Forgot password?</Link>
            </div>
        </div>
    )
}

export default Login;
