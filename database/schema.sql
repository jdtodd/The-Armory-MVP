DROP DATABASE IF EXISTS TheArmory;

CREATE DATABASE TheArmory;

USE TheArmory;

CREATE TABLE Users (
  id INT NOT NULL AUTO_INCREMENT,
  username CHAR(20) NOT NULL,
  password TINYTEXT NOT NULL,
  PRIMARY KEY (id),
  UNIQUE (username)
);

CREATE TABLE Favorites (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  game JSON NOT NULL,
  PRIMARY KEY (id)
);

ALTER TABLE Favorites
ADD FOREIGN KEY (user_id) REFERENCES Users(id);

