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
    database: 'manager_DB'
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
    ]).then(function(val) {
        switch (val.choice) {
            case "Employee List":
              viewAllEmployees();
            break;
    
          case "Employee Roles":
              viewAllRoles();
            break;
          case "Employee Departments":
              viewAllDepartments();
            break;
          
          case "Employee Updates":
                addEmployee();
              break;
    
          case "Add Employee":
                updateEmployee();
              break;
      
            case "Add Role for Employee":
                addRole();
              break;
      
            case "Add Employee Department":
                addDepartment();
              break;
    
            }
    })
}

//view employees
function viewAllEmployees() {
    connection.query('SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, " " ,e.last_name) AS Manager FROM employee INNER JOIN role on role_id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_if = e.id',
    function (err, res) {
        if (err) throw err
        console.table(res)
        startPrompt()
    })
}

//view roles
function viewAllRoles() {
    connection.query('SELECT employee.first_name, employee.last_name, role.title AS TITLE FROM employee JOIN role ON employee.role_id = role.id;',
    function(err, res) {
        if (err) throw err
        console.table(res)
        startPrompt()
    })
}

//view departments
function viewAllDepartments() {
    connection.query('SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee FROM employee JOIN role ON employee.role_id = role.id JOIN  department ON role.department_id = department.id ORDER BY employee.id;',
    function(err, res) {
        if (err) throw err
        console.table(res)
        startPrompt()
    })
}


//adding employees
function addEmployee() {
    inquirer
    .prompt([
        {
            type: 'input',
            message: 'What is the employees first name?',
            name: 'firstName'
        },
        {
            type: 'input',
            message: 'What is the employees last name?',
            name: 'lastName'
        },
        {
            type: 'input',
            message: 'What is the employees role id?',
            name: 'addEmployRole'
        },
        {
            type: 'input',
            message: 'What is the employees manger id?',
            name: 'addManager'
        }
    ])
    .then(function (res) {
        const firstName = res.firstName;
        const lastName = res.lastName;
        const employRoleID = res.addEmployRole;
        const employManID = res.addManager;
        const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${firstName}", "${lastName}", "${employRoleID}" "${emplyManID}")`;
        connection.query(query, function (err, res) {
            if (err) {
                throw err;
            }
            console.table(res);
            startPrompt()
        })
    })
}

//updating employee
function updateEmployee() {
    connection.query("SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;", function(err, res) {
     if (err) throw err
     console.log(res)
     inquirer
     .prompt([
       {
         type: "input",
         message: "Enter the employee's ID you want to be updated",
         name: "updateEmploy"
       },
       {
         type: "input",
         message: "Enter the new role ID for that employee",
         name: "newRole"
       }
     ])
     .then(function (res) {
         const updateEmploy = res.updateEmploy;
         const newRole = res.newRole;
         const queryUpdate = `UPDATE employee SET role_id = "${newRole}" WHERE id = "${updateEmploy}"`;
         connection.query(queryUpdate, function (err, res) {
           if (err) {
             throw err;
           }
           console.table(res);
            startPrompt()
        })
  
    });
  });

  }

//adding employee role
function addRole() { 
    connection.query("SELECT role.title AS Title, role.salary AS Salary FROM role",   function(err, res) {
      inquirer.prompt([
          {
            name: "Title",
            type: "input",
            message: "What is the roles Title?"
          },
          {
            name: "Salary",
            type: "input",
            message: "What is the Salary?"
  
          } 
      ]).then(function(res) {
          connection.query(
              "INSERT INTO role SET ?",
              {
                title: res.Title,
                salary: res.Salary,
              },
              function(err) {
                  if (err) throw err
                  console.table(res);
                  startPrompt();
              }
          )
  
      });
    });
    }

//adding department
function addDepartment() { 

    inquirer.prompt([
        {
          name: "name",
          type: "input",
          message: "What Department would you like to add?"
        }
    ]).then(function(res) {
        var query = connection.query(
            "INSERT INTO department SET ? ",
            {
              name: res.name
            
            },
            function(err) {
                if (err) throw err
                console.table(res);
                startPrompt();
            }
        )
    })
  }