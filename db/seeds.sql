USE employee_db;
-- Marketing, Design, Engineering, Finance, Legal
INSERT INTO department (name)
VALUES
('Marketing'),
('Design'),
('Engineering'),
('Finance'),
('Legal'),
('?');

INSERT INTO role (title, salary, department_id)
VALUES 
('Marketing Manager', 100000, 1),
('Marketing Associate', 60000, 1),
('Graphic Designer', 70000, 2),
('UI/UX Designer', 80000, 2),
('Software Engineer', 120000, 3),
('Junior Software Engineer', 80000, 3),
('Accountant', 90000, 4),
('Financial Analyst', 100000, 4),
('Lawyer', 110000, 5),
('Paralegal', 80000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('John', 'Smith', 1, NULL),
('Jane', 'Doe', 2, 1),
('Bob', 'Smith', 3, NULL),
('Sally', 'Smith', 4, 3),
('Joe', 'Doe', 5, NULL),
('Mary', 'Smith', 6, 5),
('Tom', 'Smith', 7, NULL),
('Sue', 'Doe', 8, 7),
('Mike', 'Smith', 9, NULL),
('Jill', 'Doe', 10, 9);