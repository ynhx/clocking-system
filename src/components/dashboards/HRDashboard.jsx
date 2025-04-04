import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './HRDashboard.css';
import { FaHome, FaUserFriends, FaChartLine, FaSignOutAlt } from 'react-icons/fa';

const HRDashboard = () => {
    return (
        <div className="hr-dashboard-container">
            <nav className="hr-dashboard-sidebar">
                <h1>Admin</h1>
                <ul>
                    <li>
                        <NavLink to="/hr-dashboard/" end className={({ isActive }) => isActive ? "active-link" : ""}>
                            <FaHome />
                            <span>Overview</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/hr-dashboard/users" className={({ isActive }) => isActive ? "active-link" : ""}>
                            <FaUserFriends />
                            <span>Users</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/hr-dashboard/reports" className={({ isActive }) => isActive ? "active-link" : ""}>
                            <FaChartLine />
                            <span>Reports</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/hr-login" className={({ isActive }) => isActive ? "active-link" : ""}
                            style={{
                                color: 'red'
                            }}>
                            <FaSignOutAlt />
                            <span>Log out</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <div className="hr-dashboard-main-content">
                <Outlet />
            </div>
        </div>
    );
}

export default HRDashboard;
