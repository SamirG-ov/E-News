CREATE DATABASE ENewsWeb;
USE ENewsWeb;
CREATE TABLE UserT
(
U_ID int NOT NULL PRIMARY KEY AUTO_INCREMENT,
email varchar(255) NOT NULL,
status varchar(255) NOT NULL,
username varchar(255) NOT NULL,
password varchar(255) NOT NULL
);

CREATE TABLE AdminT
(
Admin_ID int NOT NULL,
email varchar(255) NOT NULL,
username varchar(255) NOT NULL,
status varchar(255) NOT NULL,
password varchar(255) NOT NULL,
PRIMARY KEY (Admin_ID)
);

CREATE TABLE Publisher
(
U_ID int NOT NULL,
U_username varchar(255) NOT NULL,
U_Email varchar(255) NOT NULL,
U_password varchar(255) NOT NULL,
rating int,
PublishedA int,
U_status varchar(255) NOT NULL,
PRIMARY KEY (U_ID),
FOREIGN KEY (U_ID) REFERENCES UserT(U_ID)
);


CREATE TABLE Author
(
email varchar(255) NOT NULL,
phone int NOT NULL UNIQUE,
name1 varchar(255) NOT NULL,
PRIMARY KEY(email)
);

CREATE TABLE Article
(
A_ID int NOT NULL PRIMARY KEY AUTO_INCREMENT,
U_ID int NOT NULL,
date1 date NOT NULL,
content varchar(3000) NOT NULL,
title varchar(255) NOT NULL,
pic varchar(255) NOT NULL,
P_Category varchar(255),
FOREIGN KEY (U_ID) REFERENCES UserT(U_ID)
);

CREATE TABLE Viewer
(
U_ID int NOT NULL,
U_username varchar(255) NOT NULL,
U_email varchar(255) NOT NULL,
storage1 varchar(255),
U_password varchar(255) NOT NULL,
U_status varchar(255) NOT NULL,
FOREIGN KEY(U_ID) REFERENCES UserT(U_ID),
PRIMARY KEY (U_ID)
);

CREATE TABLE NON_REG 
(
U_ID int NOT NULL,
U_username varchar(255) NOT NULL,
U_Email varchar(255) NOT NULL,
PRIMARY KEY (U_ID),
FOREIGN KEY (U_ID) REFERENCES UserT(U_ID)
);

CREATE TABLE Category
(
Title varchar(255) NOT NULL,
type1 varchar(255) NOT NULL,
PFlag boolean NOT NULL,
Province varchar(255) NOT NULL,
WFlag boolean NOT NULL,
Country varchar(255) NOT NULL,
GFlag boolean NOT NULL,
gtype varchar(255) NOT NULL,
SFlag boolean NOT NULL,
stype varchar(255) NOT NULL,
PRIMARY KEY(Title)
);

CREATE TABLE Comment1
(
A_ID int NOT NULL,
C_ID int NOT NULL PRIMARY KEY AUTO_INCREMENT,
U_ID int NOT NULL,
username varchar(255) NOT NULL,
aComment varchar(500),
FOREIGN KEY (A_ID) REFERENCES Article(A_ID),
FOREIGN KEY (U_ID) REFERENCES UserT(U_ID)
);

CREATE TABLE Rates
(
U_ID int NOT NULL,
A_ID int NOT NULL,
rating int NOT NULL,
CONSTRAINT PKR PRIMARY KEY (U_ID , A_ID),
FOREIGN KEY (U_ID) REFERENCES UserT(U_ID),
FOREIGN KEY (A_ID) REFERENCES Article(A_ID)
);

CREATE TABLE Saves
(
U_ID int NOT NULL,
A_ID int NOT NULL,
S_ID int NOT NULL UNIQUE,
CONSTRAINT PKS PRIMARY KEY (U_ID, A_ID),
FOREIGN KEY (U_ID) REFERENCES UserT(U_ID),
FOREIGN KEY (A_ID) REFERENCES Article(A_ID)
);

CREATE TABLE Has
(
A_ID int NOT NULL,
C_title varchar(255) NOT NULL,
FOREIGN KEY (A_ID) REFERENCES Article(A_ID),
FOREIGN KEY (C_title) REFERENCES Category(Title),
CONSTRAINT PKH PRIMARY KEY (A_ID, C_title)
);


