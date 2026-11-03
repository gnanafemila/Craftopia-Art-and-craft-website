/*
================================================================================
FILE: database.sql
PURPOSE: Create database and tables for Craftopia
INSTRUCTIONS: Run this SQL in phpMyAdmin or MySQL command line
================================================================================
*/

-- Create database
CREATE DATABASE IF NOT EXISTS craftopia_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Use the database
USE craftopia_db;

-- Drop tables if they exist (for fresh start)
DROP TABLE IF EXISTS likes;
DROP TABLE IF EXISTS favorites;
DROP TABLE IF EXISTS event_registrations;
DROP TABLE IF EXISTS crafts;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS users;

-- Create users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create crafts table
CREATE TABLE crafts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    difficulty VARCHAR(50) NOT NULL,
    time_required VARCHAR(100),
    materials TEXT,
    instructions TEXT,
    video_url VARCHAR(500),
    image_url VARCHAR(500),
    media_type ENUM('image', 'video') DEFAULT 'image',
    likes_count INT DEFAULT 0,
    views_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_category (category),
    INDEX idx_difficulty (difficulty),
    INDEX idx_user_id (user_id),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create events table
CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    event_type ENUM('online', 'offline') NOT NULL,
    event_date DATE NOT NULL,
    event_time TIME NOT NULL,
    location VARCHAR(255),
    price DECIMAL(10, 2) DEFAULT 0.00,
    max_participants INT,
    current_participants INT DEFAULT 0,
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_event_date (event_date),
    INDEX idx_event_type (event_type),
    INDEX idx_category (category),
    INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create likes table
CREATE TABLE likes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    craft_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (craft_id) REFERENCES crafts(id) ON DELETE CASCADE,
    UNIQUE KEY unique_like (user_id, craft_id),
    INDEX idx_user_id (user_id),
    INDEX idx_craft_id (craft_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create favorites table
CREATE TABLE favorites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    craft_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (craft_id) REFERENCES crafts(id) ON DELETE CASCADE,
    UNIQUE KEY unique_favorite (user_id, craft_id),
    INDEX idx_user_id (user_id),
    INDEX idx_craft_id (craft_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create event registrations table
CREATE TABLE event_registrations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('registered', 'cancelled') DEFAULT 'registered',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    UNIQUE KEY unique_registration (user_id, event_id),
    INDEX idx_user_id (user_id),
    INDEX idx_event_id (event_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample users (passwords are hashed - all passwords are "password123")
INSERT INTO users (name, email, password) VALUES
('John Doe', 'john@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'),
('Jane Smith', 'jane@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'),
('Mike Johnson', 'mike@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');

-- Insert sample crafts
INSERT INTO crafts (user_id, title, description, category, difficulty, time_required, materials, instructions, image_url, likes_count, views_count) VALUES
(1, 'Paper Quilling Art', 'Create beautiful decorative designs using rolled paper strips', 'Paper Crafts', 'Medium', '2-3 hours', 'Colored paper strips, glue, quilling tool, cardboard', 'Step 1: Cut paper into strips. Step 2: Roll the strips. Step 3: Shape and glue.', 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=800', 45, 230),
(2, 'Macrame Wall Hanging', 'Beautiful boho-style wall decoration using macrame techniques', 'Home Decor', 'Medium', '3-4 hours', 'Cotton rope, wooden dowel, scissors, measuring tape', 'Step 1: Cut rope to length. Step 2: Create knots. Step 3: Shape the design.', 'https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?w=800', 78, 345),
(1, 'Origami Flowers', 'Delicate paper flowers perfect for decoration', 'Paper Crafts', 'Easy', '1-2 hours', 'Origami paper, wire stems, green tape', 'Step 1: Fold paper into flower shape. Step 2: Attach to stem. Step 3: Arrange.', 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=800', 92, 456);

-- Insert sample events
INSERT INTO events (user_id, title, description, category, event_type, event_date, event_time, location, price, max_participants, current_participants, image_url) VALUES
(1, 'Watercolor Painting Workshop', 'Learn basic watercolor techniques', 'Painting', 'offline', '2026-04-15', '14:00:00', 'Art Studio, Downtown', 45.00, 20, 8, 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800'),
(2, 'Online Pottery Masterclass', 'Virtual pottery class for beginners', 'Pottery', 'online', '2026-04-20', '18:00:00', 'Zoom Meeting', 30.00, 50, 15, 'https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?w=800'),
(3, 'Jewelry Making Workshop', 'Create your own unique jewelry pieces', 'Jewelry', 'offline', '2026-04-25', '10:00:00', 'Community Center', 55.00, 15, 5, 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800');

/*
================================================================================
TESTING CREDENTIALS
================================================================================

You can test login with these accounts:

Email: john@example.com
Password: password123

Email: jane@example.com
Password: password123

Email: mike@example.com
Password: password123

OR create a new account using the register page!

================================================================================
*/
