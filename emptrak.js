const mysql = require('mysql');
const inquirer = require('inquirer');

//creating connection for sql database
const connection = mysql.createConnection({
    host: 'localhost',
    //port
    port: '3306',
    //username
    user: 'root',
    //password and database
    password: 'Otter1163427!',
    databse: 'manage.db'
});
//beginning connection
connection.connect(function(err) {
    if (err) throw errconsole.log('connected as id' + connection.threadId)
    startPrompt();
});

//function which prompt user for what action they should take
function startPrompt() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'Where would you like to go?',
            name: 'choice',
            choices: [
                'Employees List',
                'Employees Roles',
                'Employee Departments',
                'Employee Updates',
                'Add Employee',
                'Add Role for Employee',
                'Add Employee Department'
            ]
        }
    ])
}