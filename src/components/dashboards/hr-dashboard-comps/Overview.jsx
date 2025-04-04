import React, { useEffect, useState } from 'react';
import './Overview.css';

const Overview = () => {

    const [currentDateTime, setCurrentDateTime] = useState('');

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const formattedDate = now.toLocaleDateString('en-ZA', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            const formattedTime = now.toLocaleTimeString('en-ZA', {
                hour: '2-digit',
                minute: '2-digit'
            });
            setCurrentDateTime(`${formattedDate}, ${formattedTime}`);
        };

        updateDateTime();
        const intervalId = setInterval(updateDateTime, 10000);

        return () => clearInterval(intervalId);
    }, []);

    const students = [
        { name: "Yin", clockIn: "8:00", clockOut: "16:00", status: "On time", hoursWorked: "8h" },
        { name: "Alex", clockIn: "9:15", clockOut: "17:30", status: "Late", hoursWorked: "8h 15m" },
        { name: "Jamie", clockIn: "7:50", clockOut: "15:45", status: "On time", hoursWorked: "7h 55m" }
    ];

    const supervisors = [
        { name: "Dipono", clockIn: "8:00", clockOut: "17:22", status: "On time", hoursWorked: "8h" },
        { name: "Matlala", clockIn: "8:53", clockOut: "16:12", status: "Late", hoursWorked: "8h 44m" },
        { name: "Happiness", clockIn: "N/A", clockOut: "N/A", status: "Not in", hoursWorked: "0h" },
        { name: "Dipono", clockIn: "8:00 AM", clockOut: "4:00 PM", status: "On time", hoursWorked: "8h" }
    ]

    const CircularProgress = ({ percentage }) => {
        const radius = 40;
        const circumference = 2 * Math.PI * radius;
        const strokeDashoffset = circumference - (percentage / 100) * circumference;

        return (
            <div className="circular-progress-container">
                <svg width="100" height="100" viewBox="0 0 100 100">
                    <circle
                        cx="50"
                        cy="50"
                        r={radius}
                        stroke="#ddd"
                        strokeWidth="10"
                        fill="none"
                    />
                    <circle
                        cx="50"
                        cy="50"
                        r={radius}
                        stroke="#4CAF50"
                        strokeWidth="10"
                        fill="none"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        transform="rotate(-90 50 50)"
                    />
                    <text x="50" y="55" textAnchor="middle" fontSize="16px" fill="#333">
                        {percentage}%
                    </text>
                </svg>
            </div>
        );
    };

    return (
        <div className="whole-overview-wrapper">
            <div className="overview-header">
                <div className="overview-heading-text">
                    <h1>Overview</h1>
                </div>
                <div className="overview-date-text">
                    <h2>Today</h2>
                    <h3>{currentDateTime}</h3>
                </div>
            </div>
            <div className="overview-actual-content">
                <div className="hr-dashboard-overview-container">
                    <div className="overview-clock-in-details">
                        <div className="hr-clock-in-summary">
                            <div className="recently-clocked-in">
                                <p>Recently clocked in</p>
                                <ul>
                                    <li>Tommy clocked in at 8:30 - <span className="late-clock-in-status">Late</span></li>
                                    <li>Rosey clocked in at 8:12 - <span className="late-clock-in-status">Late</span></li>
                                    <li>Maria clocked in at 8:06 - <span className="late-clock-in-status">Late</span></li>
                                </ul>
                            </div>
                            <div className="earliest-clock-ins">
                                <p>Earliest clock-ins</p>
                                <ul>
                                    <li>Josh clocked in at 7:35 - <span className="early-clock-in-status">On time</span></li>
                                    <li>Chris clocked in at 7:48 - <span className="early-clock-in-status">On time</span></li>
                                    <li>Paige clocked in at 8:01 - <span className="late-clock-in-status">Late</span></li>
                                </ul>
                            </div>
                        </div>
                        <div className="overview-clocking-records">
                            <div className="students-overview-clocking-records">
                                <div className="overview-clocking-records-header">
                                    <h3>Students clocking records today</h3>
                                </div>
                                <div className="overview-clocking-records-table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Clock-in Time</th>
                                                <th>Clock-out Time</th>
                                                <th>Status</th>
                                                <th>Hours Worked</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {students.map((user, index) => (
                                                <tr key={index}>
                                                    <td>{user.name}</td>
                                                    <td>{user.clockIn}</td>
                                                    <td>{user.clockOut}</td>
                                                    <td className={`status-cell ${user.status.toLowerCase().replace(" ", "-")}`}>
                                                        {user.status}
                                                    </td>
                                                    <td>{user.hoursWorked}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="supervisors-overview-clocking-records">
                                <div className="overview-clocking-records-header">
                                    <h3>Supervisors clocking records today</h3>
                                </div>
                                <div className="overview-clocking-records-table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Clock-in Time</th>
                                                <th>Clock-out Time</th>
                                                <th>Status</th>
                                                <th>Hours Worked</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {supervisors.map((user, index) => (
                                                <tr key={index}>
                                                    <td>{user.name}</td>
                                                    <td>{user.clockIn}</td>
                                                    <td>{user.clockOut}</td>
                                                    <td className={`status-cell ${user.status.toLowerCase().replace(" ", "-")}`}>
                                                        {user.status}
                                                    </td>
                                                    <td>{user.hoursWorked}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="overview-clock-in-reports">
                        <div className="attendance-container">
                            <h3>Attendance percentage</h3>
                            <div className="attendance-charts">
                                <div>
                                    <p>Supervisors:</p>
                                    <CircularProgress percentage={32} />
                                </div>
                                <div>
                                    <p>Students:</p>
                                    <CircularProgress percentage={70} />
                                </div>
                            </div>
                        </div>
                        <div className="hr-summary-section">
                            <h2>Summary</h2>
                            <ol>
                                <li>Riley has not been to work in <span className="duration-text">4 days</span></li>
                                <li>Josh has come to work for a month without missing a day</li>
                                <li>Tommy has been late for <span className="duration-text">8 days straight</span></li>
                                <li>Paige has worked overtime <span className="good-duration text">3 days this week</span></li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Overview;
