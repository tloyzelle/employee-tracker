DROP DATABASE IF EXISTS manage_db;

CREATE DATABSE manage.db;

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
    FOREIGN KEY (manager_id) REFERENCES manager(id),
    PRIMARY KEY (id)
)

INSERT INTO department (name)
VALUES ('Programming'), ('IT'), ('Customer Service');

INSERT INTO role (title, salary, department_id)
VALUES ('Jr. Programmer', 27.00, 1), ('Moderate Programmer', 35.00, 2), ('Snr. Programmer', 45.00, 3), ('Technician', 37.00, 4), ('Customer Service', 30.00, 5), ('Customer Service Manager', 43.00, 6);

INSERT INTO  employee (first_name, last_name, role_id, manager_id)
VALUES ('Lily','Orr', 1, NULL), ('Chrstine', 'Dawson', 1, NULL), ('Ben', 'Purvis', 2, NULL), ('Hayden', 'Matthews', 3, 1), ('Dalton', 'Anderson', 4, NULL), ('Joey', 'Marks', 4, 2), ('Maddy', 'Moorefield', 5, NULL), ('Jessica', 'Stevens', 6, 3);