import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Login = () => {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogin = () => {
        navigate('/user-dashboard');
    };

    return (
        <div className="container">
            <div className="profile-container">
                <div className="profile-icon" onClick={toggleDropdown}>
                    <i className="fas fa-user-circle"></i>
                </div>
                {dropdownOpen && (
                    <div className="dropdown-menu">
                        <Link to="/hr-login">
                            <i className="fas fa-exchange-alt"></i>
                            Switch user
                        </Link>
                        <Link to="/help-page">
                            <i className="fas fa-question-circle"></i>
                            Help
                        </Link>
                    </div>
                )}
            </div>
            <h1 className="login-title">Login</h1>
            <div className="inputs">
                <div className="input">
                    <i className="fas fa-envelope"></i>
                    <input type="email" name="email" placeholder="email address" />
                </div>
                <div className="input">
                    <i className="fas fa-lock"></i>
                    <input type="password" name="password" placeholder="password" />
                </div>
            </div>
            <div className="submit-container">
                <button type="submit" className="login-button" onClick={handleLogin}>Log in</button>
            </div>
            <div className="forgot-password">
                <Link to="/reset-password">Forgot password?</Link>
            </div>
        </div>
    )
}

export default Login;


