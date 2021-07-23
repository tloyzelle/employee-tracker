DROP DATABASE IF EXISTS manager_DB;

CREATE DATABASE manager_DB;

USE manager_DB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary DECIMAL(10,2) NULL,
  department_id INT NULL,
  FOREIGN KEY (department_id) REFERENCES department(id),
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT NULL,
  manager_id INT NULL,
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id),
  PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUES ('Programming'), ('IT'), ('Customer Service');

INSERT INTO role (title, salary, department_id)
VALUES ('Jr. Programmer', 27.00, 1), ('Moderate Programmer', 35.00, 1), ('Snr. Programmer', 45.00, 1), ('Technician', 37.00, 2), ('Customer Service', 30.00, 3), ('Customer Service Manager', 43.00, 3);

INSERT INTO  employee (first_name, last_name, role_id, manager_id)
VALUES ('Lily','Orr', 1, NULL), ('Chrstine', 'Dawson', 1, NULL), ('Ben', 'Purvis', 1, NULL), ('Hayden', 'Matthews', 2, 1), ('Dalton', 'Anderson', 3, NULL), ('Joey', 'Marks', 1, 2), ('Maddy', 'Moorefield', 3, NULL), ('Jessica', 'Stevens', 2, 3);