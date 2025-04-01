import React, { useState } from 'react';
import './HRLogin.css';
import { Link, useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

const HRLogin = () => {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogin = () => {
        navigate('/hr-dashboard');
    };

    return (
        <div className="hr-container">
            <div className="hr-profile-container">
                <div className="hr-profile-icon" onClick={toggleDropdown}>
                    <i className="fas fa-user-circle"></i>
                </div>
                {dropdownOpen && (
                    <div className="hr-dropdown-menu">
                        <Link to="/">
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
            <h1 className="hr-login-title">
                <span className="admin-text">Admin </span><span className="login-text">Login</span>
            </h1>
            <div className="hr-inputs">
                <div className="hr-input">
                    <i className="fas fa-at"></i>
                    <input type="email" name="hrEmail" placeholder="email address" />
                </div>
                <div className="hr-input">
                    <i className="fas fa-key"></i>
                    <input type="password" name="hrPassword" placeholder="password" />
                </div>
            </div>
            <div className="hr-submit-container">
                <button type="submit" className="hr-login-button" onClick={handleLogin}>Log in</button>
            </div>
        </div>
    )
}

export default HRLogin;
