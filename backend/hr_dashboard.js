const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const crypto = require('crypto'); // Import crypto for random password generation

const app = express();
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'clocking_system'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to database');
});

// Middleware to check if the user is an HR
function isHR(req, res, next) {
    const { role } = req.body;
    if (role !== 'HR') {
        return res.status(403).json({ message: 'Access denied. Only HRs can access this dashboard.' });
    }
    next();
}

// Function to generate a random password
function generateRandomPassword() {
    return crypto.randomBytes(8).toString('hex'); // Generates a 16-character random password
}

// Endpoint to add a user
app.post('/add-user', isHR, async (req, res) => {
    const { name, surname, student_number, role } = req.body;

    // Validate student number and generate email
    if (!student_number) {
        return res.status(400).json({ message: 'Student number is required.' });
    }
    const email = `${student_number}@tut4life.ac.za`;

    // Check if student number already exists
    const checkQuery = 'SELECT * FROM users WHERE student_number = ?';
    db.query(checkQuery, [student_number], async (err, results) => {
        if (err) throw err;

        if (results.length > 0) {
            return res.status(400).json({ message: 'Student number already exists.' });
        }

        // Generate and hash the password
        const plainPassword = generateRandomPassword();
        const hashedPassword = await bcrypt.hash(plainPassword, 10);

        // Insert user into the database
        const insertQuery = 'INSERT INTO users (name, surname, email, role, student_number, password) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(insertQuery, [name, surname, email, role, student_number, hashedPassword], (err, result) => {
            if (err) throw err;
            res.status(201).json({ 
                message: 'User added successfully.', 
                generatedPassword: plainPassword // Return the plain password to the HR
            });
        });
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
