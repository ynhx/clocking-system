import React, { useState } from 'react';
import './HRLogin.css';
import { Link, useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';

const HRLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [attendanceHistory, setAttendanceHistory] = useState([]);

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handle_email_input = (e) => {
        setEmail(e.target.value);
    };

    const handle_password_input = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = async () => {
        setError('');
        setLoading(true);

        if (!email || !password) {
            setError('Please enter both email and password.');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/myRoutes/hr-login', {
                email,
                password
            });

            // Save to local storage and navigate
            localStorage.setItem('email', response.data.email);
            setAttendanceHistory(response.data.attendanceHistory || []);
            navigate('/hr-dashboard');
        } catch (err) {
            console.error('Login error:', err);
            setError(err?.response?.data?.error || 'Login failed');
        } finally {
            setLoading(false);
        }
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
                <span className="admin-text">Admin </span>
                <span className="login-text">Login</span>
            </h1>

            {error && <div className="hr-error">{error}</div>}
            {loading && <div className="hr-loading">Logging in...</div>}

            <div className="hr-inputs">
                <div className="hr-input">
                    <i className="fas fa-at"></i>
                    <input
                        type="email"
                        name="hrEmail"
                        value={email}
                        onChange={handle_email_input}
                        placeholder="email address"
                    />
                </div>
                <div className="hr-input">
                    <i className="fas fa-key"></i>
                    <input
                        type="password"
                        name="hrPassword"
                        value={password}
                        onChange={handle_password_input}
                        placeholder="password"
                    />
                </div>
            </div>

            <div className="hr-submit-container">
                <button type="submit" className="hr-login-button" onClick={handleLogin}>
                    Log in
                </button>
            </div>
        </div>
    );
};

export default HRLogin;
