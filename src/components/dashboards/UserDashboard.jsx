import React, { useEffect, useState } from "react";
import "./UserDashboard.css";
import axios from "axios";

const UserDashboard = () => {
  const [user, setUser] = useState({ name: "", userId: "", role: "" });
  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  user.userId = localStorage.getItem("userId");
  user.role = localStorage.getItem("role");
  user.name = localStorage.getItem("name");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("role");

    if (userId && role) {
      setUser((prevUser) => ({ ...prevUser, userId, role }));
      fetchAttendanceHistory(userId);
    }
  }, []);

  const fetchAttendanceHistory = async (userId) => {
    console.log("userId:", userId);
    console.log("user.role:", user.role);

    try {
      const response = await axios.get(`http://localhost:5000/api/myRoutes/attendance/${userId}?role=${user.role}`);
      setAttendanceHistory(response.data);
    } catch (err) {
      console.error("Error fetching attendance history:", err);
      setError("Failed to fetch attendance history.");
    }
  };

  const handleClockIn = async () => {
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/myRoutes/clock-in", {
        userId: user.userId,
        role: user.role
      });
      setMessage("You have successfully clocked in!");
      setError("");
      fetchAttendanceHistory(user.userId);
    } catch (err) {
      console.error("Clock In Error:", err);
      setError(err.response?.data?.error || "Error clocking in.");
      setMessage("");
    } finally {
      setLoading(false);
    }
  };

  const handleClockOut = async () => {
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/myRoutes/clock-out", {
        userId: user.userId,
        role: user.role
      });
      setMessage("You have successfully clocked out!");
      setError("");
      fetchAttendanceHistory(user.userId);
    } catch (err) {
      console.error("Clock Out Error:", err);
      setError(err.response?.data?.error || "Problem clocking out.");
      setMessage("");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.removeItem("userId");
      localStorage.removeItem("role");
      window.location.href = "/";
    }, 1000);
  };

  const getTotalHours = (records) => {
    return records.reduce((sum, record) => {
      if (record.clock_out) {
        const diff = new Date(record.clock_out) - new Date(record.clock_in);
        return sum + diff / 3600000;
      }
      return sum;
    }, 0);
  };

  const isThisWeek = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    return date >= startOfWeek && date <= endOfWeek;
  };

  const isThisMonth = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  };

  const thisWeekRecords = attendanceHistory.filter((record) => isThisWeek(record.date));
  const thisMonthRecords = attendanceHistory.filter((record) => isThisMonth(record.date));

  const totalWeekHours = getTotalHours(thisWeekRecords).toFixed(2);
  const totalMonthHours = getTotalHours(thisMonthRecords).toFixed(2);

  return (
    <div className="dashboard-container">
      {loading && (
        <div className="loading-overlay">
          <div className="loader"></div>
          <p>Loading...</p>
        </div>
      )}
      <nav className="sidebar">
        <h2>Clocking System</h2>
        <ul>
          <li><a href="/clocking">Dashboard</a></li>
          <li><a href="/attendance">Weekly Attendance</a></li>
          <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
        </ul>
      </nav>

      <div className="user-dashboard">
        <header className="dashboard-header">
          <h1>Welcome, {user.name}</h1>
          {error && <div className="error-message">{error}</div>}
        </header>

        <section className="clocking-section">
          <h2>Clocking</h2>
          {message && <div className="clock-success-message">{message}</div>}
          {error && <div className="clock-error-message">{error}</div>}

          <button className="clock-in-btn" onClick={handleClockIn}>Clock In</button>
          <button className="clock-out-btn" onClick={handleClockOut}>Clock Out</button>
        </section>

        <section className="attendance-history">
          <h2>Attendance History</h2>
          {attendanceHistory.length === 0 ? (
            <p>No attendance records yet.</p>
          ) : (
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
                {attendanceHistory.map((record) => (
                  <tr key={record.id}>
                    <td>{record.date.slice(0, 10)}</td>
                    <td>{new Date(record.clock_in).toLocaleTimeString()}</td>
                    <td>{record.clock_out ? new Date(record.clock_out).toLocaleTimeString() : "Not Clocked Out"}</td>
                    <td>
                      {record.clock_out
                        ? ((new Date(record.clock_out) - new Date(record.clock_in)) / 3600000).toFixed(2) + " hrs"
                        : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        <section className="statistics">
          <h2>Statistics</h2>
          <p>Total Hours This Week: {totalWeekHours} hrs</p>
          <p>Total Hours This Month: {totalMonthHours} hrs</p>
        </section>
      </div>
    </div>
  );
};

export default UserDashboard;
