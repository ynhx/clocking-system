import React, { useState } from "react";
import "./UserDashboard.css";

const UserDashboard = () => {
  const [user, setUser] = useState({ name: "John Doe" });

  // Logout handler
  const handleLogout = () => {
    alert("Logged out successfully!");
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <nav className="sidebar">
        <h2>Clocking System</h2> 
        <ul>
          <li><a href="/clocking">Dashboard</a></li>
           <li><a href="/attendance">Weekly Attendance</a></li>
          <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="user-dashboard">
        <header className="dashboard-header">
          <h1>Welcome, {user.name}</h1>
        </header>

        <section className="clocking-section">
          <h2>Clocking</h2>
          <button className="clock-in-btn">Clock In</button>
          <button className="clock-out-btn">Clock Out</button>
        </section>

        <section className="attendance-history">
          <h2>Attendance History</h2>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Clock In</th>
                <th>Clock Out</th>
                <th>Total Hours</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2023-10-01</td>
                <td>09:00 AM</td>
                <td>05:00 PM</td>
                <td>8 hrs</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="statistics">
          <h2>Statistics</h2>
          <p>Total Hours This Week: 40 hrs</p>
          <p>Total Hours This Month: 160 hrs</p>
        </section>
      </div>
    </div>
  );
};

export default UserDashboard;
