import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [attendanceHistory, setAttendanceHistory] = useState([]);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogin = async () => {
        setError('');
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/myRoutes/login', {
                email,
                password
            });

            if (response.data.firstLogin) {
                navigate('/setup-password', { state: { email, role: response.data.role } });
                const userId = response.data.userId;
                localStorage.setItem('userId', userId);
                localStorage.setItem('role', response.data.role);
                localStorage.setItem('name', response.data.email);

                setAttendanceHistory(response.data.attendanceHistory);
            } else {
                const userId = response.data.userId;
                localStorage.setItem('userId', userId);
                localStorage.setItem('role', response.data.role);
                localStorage.setItem('name', response.data.email);
                navigate('/user-dashboard');
                
                setAttendanceHistory(response.data.attendanceHistory);
            }
        } catch (err) {
            console.error('Login error:', err);
            setError(err.response?.data?.error || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            {loading && (
                <div className="loading-overlay">
                    <div className="loader"></div>
                    <p>Loading...</p>
                </div>
            )}
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
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email address"
                    />
                </div>
                <div className="input">
                    <i className="fas fa-lock"></i>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="password"
                    />
                    <span className="tooltip-icon">
                        <i className="fas fa-question-circle"></i>
                        <span className="tooltip-text">Use the password user if this is your first time logging in.</span>
                    </span>
                </div>
            </div>
            {error && <div className="login-error-message">{error}</div>}
            <div className="submit-container">
                <button type="submit" className="login-button" onClick={handleLogin}>Log in</button>
            </div>
            <div className="forgot-password">
                <Link to="/reset-password">Forgot password?</Link>
            </div>
        </div>
    );
}

export default Login;
