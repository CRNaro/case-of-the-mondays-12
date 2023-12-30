const inquirer = require('inquirer'); // for prompts
const connection = require('./connection');
const mysql = require('mysql2');

function viewAllEmployees() {
    const query = `
    SELECT 
        e.id AS employee_id, 
        e.first_name, e.last_name, 
        r.title AS job_title, 
        d.name AS department, 
        r.salary, 
        CONCAT(m.first_name, " ", m.last_name) AS manager 
    FROM 
        employee e 
    INNER JOIN 
        role r ON e.role_id = r.id 
    INNER JOIN 
        department d ON r.department_id = d.id 
    LEFT JOIN 
        employee m ON e.manager_id = m.id`;
    connection.query(query, function(err, res, fields) {
        if (err) throw err;
        console.table(res);
        start();
    });
}

function viewAllEmployeesByDepartment() {
    const query = `
        SELECT 
            e.id AS employee_id,
            e.first_name AS employee_first_name,
            e.last_name AS employee_last_name,
            d.name AS department,
            m.id AS manager_id,
            m.first_name AS manager_first_name,
            m.last_name AS manager_last_name
        FROM
            employee e
        INNER JOIN
            employee m ON e.manager_id = m.id
        LEFT JOIN
            role r ON e.role_id = r.id
        LEFT JOIN
            department d ON r.department_id = d.id
`;
    connection.query(query, function(err, res, fields) {
        if (err) throw err;
        console.table(res);
        start();
    });
}

function viewAllEmployeesByManager() {
    const query = ` 
    SELECT 
        e.id AS employee_id,
        e.first_name AS employee_first_name,
        e.last_name AS employee_last_name,
        d.name AS department,
        m.id AS manager_id,
        m.first_name AS manager_first_name,
        m.last_name AS manager_last_name
    FROM
        employee e
    LEFT JOIN
        employee m ON e.manager_id = m.id
    LEFT JOIN
        role r ON e.role_id = r.id
    LEFT JOIN
        department d ON r.department_id = d.id
`;
    connection.query(query, function(err, res, fields) {
        if (err) throw err;
        console.table(res);
        start();
    });
}

function addEmployee() { // *** need to add manager_id
    inquirer.prompt([
        {
            name: 'firstName',
            type: 'input',
            message: 'What is the employee\'s first name?'
        },
        {
            name: 'lastName',
            type: 'input',
            message: 'What is the employee\'s last name?'
        },
        {
            name: 'roleId',
            type: 'input',
            message: 'What is the employee\'s role ID?'
        },
        {
            name: 'managerId',
            type: 'input',
            message: 'What is the employee\'s manager ID?'
        }
    ])
    .then(answer => {
        connection.query('INSERT INTO employee SET ?', {
            first_name: answer.firstName,
            last_name: answer.lastName,
            role_id: answer.roleId,
            manager_id: answer.managerId
        }, function(err, res) {
            if (err) throw err;
            console.log('Employee added!');
            start();
        });
    });
}

function removeEmployee() { // *** need to add manager_id
    inquirer.prompt({
        name: 'id',
        type: 'input',
        message: 'What is the employee\'s ID?'
    })
    .then(answer => {
        connection.query('DELETE FROM employee WHERE ?', {
            id: answer.id
        }, function(err, res) {
            if (err) throw err;
            console.log('Employee removed!');
            start();
        });
    });
}

function updateEmployeeRole() { 
    inquirer.prompt([
        {
            name: 'id',
            type: 'input',
            message: 'What is the employee\'s ID?'
        },
        {
            name: 'roleId',
            type: 'input',
            message: 'What is the employee\'s new role ID?'
        }
    ])
    .then(answer => {
        connection.query('UPDATE employee SET ? WHERE ?', [
            {
                role_id: answer.roleId
            },
            {
                id: answer.id
            }
        ], function(err, res) {
            if (err) throw err;
            console.log('Employee role updated!');
            start();
        });
    });
}

function updateEmployeeManager() { 
    inquirer.prompt([
        {
            name: 'id',
            type: 'input',
            message: 'What is the employee\'s ID?'
        },
        {
            name: 'managerId',
            type: 'input',
            message: 'What is the employee\'s new manager ID?'
        }
    ])
    .then(answer => {
        connection.query('UPDATE employee SET ? WHERE ?', [
            {
                manager_id: answer.managerId
            },
            {
                id: answer.id
            }
        ], function(err, res) {
            if (err) throw err;
            console.log('Employee manager updated!');
            start();
        });
    });
}

function viewAllRoles() {
    connection.query('SELECT * FROM role', function(err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
}

function addRole() {
    connection.query('SELECT * FROM department', function(err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                name: 'title',
                type: 'input',
                message: 'What is the role\'s title?'
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What is the role\'s salary?'
            },
            {
                name: 'departmentId',
                type: 'input',
                message: 'What is the role\'s department ID?'
            }
        ])
        .then(answer => {
            connection.query('INSERT INTO role SET ?', {
                title: answer.title,
                salary: answer.salary,
                department_id: answer.departmentId
            }, function(err, res) {
                if (err) throw err;
                console.log('Role added!');
                start();
            });
        });
    });
}

function removeRole() {
    inquirer.prompt({
        name: 'id',
        type: 'input',
        message: 'What is the role\'s ID?'
    })
    .then(answer => {
        connection.query('DELETE FROM role WHERE ?', {
            id: answer.id
        }, function(err, res) {
            if (err) throw err;
            console.log('Role removed!');
            start();
        });
    });
}

function viewAllDepartments() {
    connection.query('SELECT * FROM department', function(err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
}

function addDepartment() {
    inquirer.prompt({
        name: 'name',
        type: 'input',
        message: 'What is the department\'s name?'
    })
    .then(answer => {
        connection.query('INSERT INTO department SET ?', {
            name: answer.name
        }, function(err, res) {
            if (err) throw err;
            console.log('Department added!');
            modifySeedsSqlFile(answer.name); //start();
        });
    });
}

function modifySeedsSqlFile(departmentName) {
    const fs = require('fs');
    fs.appendFile('seeds.sql', `\nINSERT INTO department (name) VALUES ("${departmentName}");`, function(err) {
        if (err) throw err;
        console.log('Department added to seeds.sql!');
        start();
    });
}

function removeDepartment() {
    inquirer.prompt({
        name: 'id',
        type: 'input',
        message: 'What is the department\'s ID?'
    })
    .then(answer => {
        connection.query('DELETE FROM department WHERE ?', {
            id: answer.id
        }, function(err, res) {
            if (err) throw err;
            console.log('Department removed!');
            start();
        });
    });
}

function quit() {
    console.log('Goodbye!');
    process.exit(); //  or  connection.end();
}


function start() {
    inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add department',
            'Add role',
            'Add employee',
            'Update employee role',
            'Remove department',
            'Remove role',
            'Remove employee',
            'View all employees by department',
            'View all employees by manager',
            'Update employee manager',
            'Quit'
        ]
    })
    .then(answer => {
        switch (answer.action) {
            case 'View all employees':
                viewAllEmployees();
                break;
            case 'View all employees by department':
                viewAllEmployeesByDepartment();
                break;
            case 'View all employees by manager':
                viewAllEmployeesByManager();
                break;
            case 'Add employee':
                addEmployee();
                break;
            case 'Remove employee':
                removeEmployee();
                break;
            case 'Update employee role':
                updateEmployeeRole();
                break;
            case 'Update employee manager':
                updateEmployeeManager();
                break;
            case 'View all roles':
                viewAllRoles();
                break;
            case 'Add role':
                addRole();
                break;
            case 'Remove role':
                removeRole();
                break;
            case 'View all departments':
                viewAllDepartments();
                break;
            case 'Add department':
                addDepartment();
                break;
            case 'Remove department':
                removeDepartment();
                break;
            case 'Quit':
                quit();  // changed from connection.end();
                break;
        }
    });
}
start();