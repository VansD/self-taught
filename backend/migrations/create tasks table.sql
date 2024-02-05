CREATE TABLE `tasks` (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  title varchar(256) NOT NULL,
  taskType int NOT NULL,
  text varchar(2048) NULL,
  score int NOT NULL,
  imgUrl varchar(1024) NULL,
  answers JSON NULL,
  createdAt datetime NOT NULL,
  updatedAt datetime NULL,
  deletedAt datetime NULL,
  userId int NOT NULL,
  FOREIGN KEY (userId) REFERENCES users(id)
) DEFAULT CHARSET=utf8mb4;
