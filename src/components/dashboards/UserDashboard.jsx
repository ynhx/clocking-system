import React, { useState, useRef, useEffect } from 'react';
import './UserDashboard.css'; 

const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="dropdown" ref={dropdownRef}>
            <button className="dropbtn" onClick={toggleDropdown}>
                User ▼
            </button>
            {isOpen && (
                <div className="dropdown-content">
                    <a href="#">Profile</a>
                    <a href="#">Status</a>
                    <a href="#">Logout</a>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
