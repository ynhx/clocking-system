import React, { useState } from 'react';
import './AccountFound.css';
import { useNavigate } from 'react-router-dom';

const AccountFound = () => {
    const [selectedMethod, setSelectedMethod] = useState('');
    const navigate = useNavigate();

    const handleSelection = (method) => {
        setSelectedMethod(method);
    };

    const handleBack = () => {
        navigate('/reset-password');
    };


    return (
        <div className="account-found-container">
            <h1 className="found-account-recovery-text">Account Recovery</h1>
            <p className="user-details-text">Account found associated with: <b>userEmail</b></p>
            <div className="user-details">
                <ul>
                    <li>name?</li>
                    <li>picture?</li>
                </ul>
            </div>
            <div className="prompt-area">
                <h2 className="prompt-select-text">Select a method to recover your account:</h2>
                <div className="recovery-options">
                    <label className="recovery-option">
                        <input
                            type="radio"
                            name="recoveryMethod"
                            value="email"
                            checked={selectedMethod === 'email'}
                            onChange={() => handleSelection('email')}
                        />
                        <span className="option-text">Send me a code via email</span>
                    </label>
                    <label className="recovery-option">
                        <input
                            type="radio"
                            name="recoveryMethod"
                            value="phone"
                            checked={selectedMethod === 'phone'}
                            onChange={() => handleSelection('phone')}
                        />
                        <span className="option-text">Send me a code via phone number</span>
                    </label>
                    <label className="recovery-option">
                        <input
                            type="radio"
                            name="recoveryMethod"
                            value="security"
                            checked={selectedMethod === 'security'}
                            onChange={() => handleSelection('security')}
                        />
                        <span className="option-text">Answer security questions</span>
                    </label>
                </div>
                <div className="proceed-container">
                    <button className="proceed-back-button" onClick={handleBack}>Back</button>
                    <button className="proceed-button" disabled={!selectedMethod}>
                        Proceed
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AccountFound;