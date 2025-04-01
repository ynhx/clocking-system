import React from 'react';
import './ResetPassword.css';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Login = () => {

    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate('/account-found');
    };

    const handleBack = () => {
        navigate('/');
    }

    return (
        <div className="reset-password-full-container">
            <h1 className="account-recovery-text">Account Recovery</h1>
        <div className="reset-password-container">
            <h1 className="reset-password-title">Help Us Recognize You</h1>
            <div className="find-account-container">
                <div className="email-prompt">
                    <label>Enter your school/work email address below to find your account:</label>
                    <input type="email" name="email" placeholder="Email address" />
                </div>
            </div>
            <div className="find-account-buttons">
                <button type="submit" className="reset-back-button" onClick={handleBack}>Back</button>
                <button type="submit" className="reset-submit-button" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
        </div>
    )
}

export default Login;
