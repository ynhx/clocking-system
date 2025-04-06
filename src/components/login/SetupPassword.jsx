import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SetupPassword.css';

const SetupPassword = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { email, role } = location.state || {};

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setError('');
        if (!email || !role) {
            alert('Missing user info');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            await axios.post('http://localhost:5000/api/myRoutes/setup-password', {
                email,
                newPassword,
                userType: role
            });
            navigate('/user-dashboard');
        } catch (err) {
            console.error('Password setup failed:', err);
            setError('Password setup failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="setup-container">
            {loading && (
                <div className="loading-overlay">
                    <div className="loader"></div>
                    <p>Loading...</p>
                </div>
            )}
            <h1>Create a new password</h1>
            <div className="setup-inputs">
                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {error && <div className="setup-error-message">{error}</div>}
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
};

export default SetupPassword;
