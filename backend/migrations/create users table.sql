CREATE TABLE `users` (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  firstName varchar(25) NOT NULL,
  middleName varchar(25) NOT NULL,
  lastName varchar(25) NOT NULL,
  role int NOT NULL,
  createdAt datetime NOT NULL,
  grade varchar(10) NULL
) DEFAULT CHARSET=utf8mb4;