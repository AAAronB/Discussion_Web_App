--Create database script for Berties books

--Create the database
CREATE DATABASE myForum;
USE myForum;

--Create the tables
CREATE TABLE Users (id INT AUTO_INCREMENT, first_name VARCHAR(50),last_name VARCHAR(50), username VARCHAR(20), password VARCHAR(20),
email VARCHAR(50), hashedPassword VARCHAR(100), PRIMARY KEY(id));
CREATE TABLE Post (id INT AUTO_INCREMENT,name VARCHAR(50),
topic VARCHAR(50),username VARCHAR(20),content VARCHAR(2000),PRIMARY KEY(id),FOREIGN KEY (username) REFERENCES Users(username));
--Create the app user and give it access to the database
CREATE USER 'appuser'@'localhost' IDENTIFIED WITH mysql_native_password BY 'app2027';
GRANT ALL PRIVILEGES ON myForum.* TO 'appuser'@'localhost';