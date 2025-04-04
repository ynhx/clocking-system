CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    surname VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    role ENUM('HR', 'Supervisor', 'Student') NOT NULL,
    student_number VARCHAR(20) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
