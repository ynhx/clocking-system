/*import React, { useState } from 'react';
import './HRDashboard.css';

const HRDashboard = () => {
    const [users, setUsers] = useState([
        { name: 'John', surname: 'Doe', email: 'john.doe@example.com', phone: '123-456-7890', studentNumber: 'S12345' },
        { name: 'Jane', surname: 'Smith', email: 'jane.smith@example.com', phone: '987-654-3210', studentNumber: 'S67890' }
    ]);

    return (
        <div className="hr-dashboard-container">
            <div className="add-user-container">
                <button type="submit" className="add-user-button">Add User</button>
            </div>
            <div className="user-list-container">
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Student Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td>{user.name}</td>
                                <td>{user.surname}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{user.studentNumber}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default HRDashboard;*/
import React, { useState } from 'react';
import './HRDashboard.css';

const HRDashboard = () => {
    const [users, setUsers] = useState([
        { email: 'john.doe@example.com', studentNumber: 'S12345', role: 'Student' },
        { email: 'jane.smith@example.com', studentNumber: 'S67890', role: 'Supervisor' }
    ]);

    const [newUser, setNewUser] = useState({
        email: '',
        studentNumber: '',
        role: 'Student' // Default role
    });

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser({
            ...newUser,
            [name]: value
        });
    };

    // Add or update user
    const handleAddUser = (e) => {
        e.preventDefault();
        if (!newUser.email || !newUser.studentNumber || !newUser.role) {
            alert("All fields are required!");
            return;
        }

        if (newUser.id) {
            // If there's an 'id' (indicating edit mode), update the user
            const updatedUsers = users.map(user =>
                user.id === newUser.id ? newUser : user
            );
            setUsers(updatedUsers);
        } else {
            // Otherwise, add a new user
            setUsers([...users, { ...newUser, id: Date.now() }]);
        }

        // Reset form fields
        setNewUser({
            email: '',
            studentNumber: '',
            role: 'Student' // Reset role to default
        });

        // Hide the form after submission
        document.getElementById("user-form").style.display = 'none';
    };

    // Edit user details
    const handleEditUser = (index) => {
        const userToEdit = users[index];
        setNewUser({ ...userToEdit, id: userToEdit.id }); // Ensure the ID is preserved
        document.getElementById("user-form").style.display = 'block';
    };

    // Delete user from the list
    const handleDeleteUser = (index) => {
        const updatedUsers = users.filter((_, i) => i !== index);
        setUsers(updatedUsers);
    };

    return (
        <div className="hr-dashboard-container">
            {/* Admin Title */}
            <h1 className="admin-title">Admin Dashboard</h1>

            <div className="add-user-container">
                <button className="add-user-button" onClick={() => document.getElementById("user-form").style.display = 'block'}>
                    Add User
                </button>
            </div>
            
            {/* Add User Form */}
            <div id="user-form" className="user-form-container" style={{ display: 'none' }}>
                <form onSubmit={handleAddUser}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={newUser.email}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="studentNumber"
                        placeholder="Student Number/Staff Number"
                        value={newUser.studentNumber}
                        onChange={handleInputChange}
                    />

                    {/* Role Selector */}
                    <select
                        name="role"
                        value={newUser.role}
                        onChange={handleInputChange}
                    >
                        <option value="Student">Student</option>
                        <option value="Supervisor">Supervisor</option>
                        <option value="HR">HR</option>
                    </select>

                    <button type="submit">{newUser.id ? 'Update User' : 'Add User'}</button>
                </form>
                <button onClick={() => document.getElementById("user-form").style.display = 'none'}>Cancel</button>
            </div>

            <div className="user-list-container">
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Student Number</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user.id}>
                                <td>{user.email}</td>
                                <td>{user.studentNumber}</td>
                                <td>{user.role}</td>
                                <td>
                                    <button onClick={() => handleEditUser(index)}>Edit</button>
                                    <button onClick={() => handleDeleteUser(index)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default HRDashboard;


// Removed name and surname columns from the table



