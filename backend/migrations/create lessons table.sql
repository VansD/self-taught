CREATE TABLE `lessons` (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  tasks JSON NULL,
  createdAt datetime NOT NULL,
  updatedAt datetime NULL,
  deletedAt datetime NULL,
  userId int NOT NULL,
  FOREIGN KEY (userId) REFERENCES users(id)
) DEFAULT CHARSET=utf8mb4;
