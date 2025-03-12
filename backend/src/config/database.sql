CREATE DATABASE car_rental_system;

USE car_rental_system;


-- Stores details of registered users, including admin and customers.-- 
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- Hashed password
    phone VARCHAR(15),
    role ENUM('customer', 'admin') DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Stores information about available rental cars.-- 
CREATE TABLE cars (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    brand VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    year INT NOT NULL,
    type ENUM('Sedan', 'SUV', 'Hatchback', 'Luxury', 'Electric') NOT NULL,
    price_per_day DECIMAL(10,2) NOT NULL,
    fuel_type ENUM('Petrol', 'Diesel', 'Electric', 'Hybrid') NOT NULL,
    transmission ENUM('Manual', 'Automatic') NOT NULL,
    seats INT NOT NULL,
    availability BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Stores multiple images for each car
CREATE TABLE car_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    car_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE CASCADE
);


-- Stores rental bookings made by users.-- 
CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    car_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    total_price DECIMAL(10,2) NOT NULL CHECK (total_price >= 0),
    status ENUM('Pending', 'Confirmed', 'Cancelled', 'Completed') DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT chk_dates CHECK (start_date < end_date),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_car_id (car_id)
);


USE car_rental_system;
SELECT * FROM users;
SELECT * FROM cars;
SELECT * FROM car_images;
SELECT * FROM bookings;


SHOW DATABASES;

DROP TABLE cars;
DROP TABLE car_images;
DROP TABLE bookings;



SELECT * FROM bookings;

-- DESC users;-- 
-- SHOW COLUMNS FROM cars;


-- ALTER TABLE cars DROP COLUMN image_url;-- 



