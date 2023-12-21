// Purpose: main entry point for the application
const inquirer = require('inquirer');   
const database = require('./connection.js'); // for server

require('console.table'); // for displaying data in a clean table format


database.connect(function(err) {
    if (err) throw err;
    console.log("Connected as id " + database.threadId + "\n");
    start();
});



// View all departments
function viewAllDepartments() {
    database.query('SELECT * FROM department', function(err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
}

// Other actions

