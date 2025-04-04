import React, { useState } from 'react';
import './UsersList.css';

const UsersList = () => {
    const [users, setUsers] = useState([
        { email: 'john.doe@example.com', studentNumber: 'S12345', role: 'Student' },
        { email: 'jane.smith@example.com', studentNumber: 'S67890', role: 'Supervisor' }
    ]);

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

    const handleAddUser = (e) => {
        e.preventDefault();
        if (!newUser.email || !newUser.studentNumber || !newUser.role) {
            alert("All fields are required!");
            return;
        }

        if (newUser.id) {
            const updatedUsers = users.map(user =>
                user.id === newUser.id ? newUser : user
            );
            setUsers(updatedUsers);
        } else {
            setUsers([...users, { ...newUser, id: Date.now() }]);
        }

        setNewUser({
            email: '',
            studentNumber: '',
            role: 'Student'
        });
        setIsFormVisible(false);
    };

    const handleEditUser = (index) => {
        const userToEdit = users[index];
        setNewUser({ ...userToEdit, id: userToEdit.id }); // Ensure the ID is preserved
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

export default UsersList;
