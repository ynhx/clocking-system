import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UsersList.css';

const UsersList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/myRoutes/all-users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    const [newUser, setNewUser] = useState({
        email: '',
        studentNumber: '',
        role: 'Student'
    });

    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser({
            ...newUser,
            [name]: value
        });
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        if (!newUser.email || !newUser.studentNumber || !newUser.role) {
            alert("All fields are required!");
            return;
        }

        try {
            let endpoint;
            if (newUser.role === 'Student') {
                endpoint = 'http://localhost:5000/api/myRoutes/students';
            } else if (newUser.role === 'Supervisor') {
                endpoint = 'http://localhost:5000/api/myRoutes/supervisors';
            } else {
                endpoint = 'http://localhost:5000/api/myRoutes/hr';
            }

            const response = await axios.post(endpoint, newUser);
            console.log('User added:', response.data);

            setUsers([...users, { ...newUser, id: response.data.id }]);
            setNewUser({
                email: '',
                studentNumber: '',
                role: 'Student'
            });
            setIsFormVisible(false);
        } catch (error) {
            console.error('Error adding user:', error);
            alert('There was an error adding the user. Please try again.');
        }
    };

    const handleEditUser = (index) => {
        const userToEdit = users[index];
        setNewUser({ ...userToEdit, id: userToEdit.id });
        setIsFormVisible(true);
    };

    const handleDeleteUser = (index) => {
        const updatedUsers = users.filter((_, i) => i !== index);
        setUsers(updatedUsers);
    };

    return (
        <div className="hr-dashboard-container">
            <h1 className="admin-title">Admin Dashboard</h1>

            <div className="add-user-container">
                <button className="add-user-button" onClick={() => setIsFormVisible(true)}>
                    Add user
                </button>
            </div>

            {isFormVisible && <div className="overlay" onClick={() => setIsFormVisible(false)}></div>}

            {isFormVisible && (
                <div className={`user-form-container ${isFormVisible ? 'show' : ''}`}>
                    <h2>Add a User</h2>
                    <form onSubmit={handleAddUser}>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email address"
                            value={newUser.email}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="studentNumber"
                            placeholder="Student number/Staff number"
                            value={newUser.studentNumber}
                            onChange={handleInputChange}
                        />
                        <select
                            name="role"
                            value={newUser.role}
                            onChange={handleInputChange}
                        >
                            <option value="Student">Student</option>
                            <option value="Supervisor">Supervisor</option>
                            <option value="HR">HR</option>
                        </select>
                        <div className="add-user-buttons-container">
                            <button className="add-user-cancel-button" onClick={() => setIsFormVisible(false)}>
                                Cancel
                            </button>
                            <button className="add-user-form-button" type="submit">{newUser.id ? 'Update User' : 'Add User'}</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="user-list-container">
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>User Number</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.studentNumber}>
                                <td>{user.email}</td>
                                <td>{user.studentNumber}</td>
                                <td>{user.role}</td>
                                <td>
                                    <button onClick={() => handleEditUser(user.studentNumber)}>Edit</button>
                                    <button onClick={() => handleDeleteUser(user.studentNumber)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsersList;
