const inquirer = require('inquirer');
const DatabaseConnection = require('./database-connection.js');
const envvar = require('./envvar.js');

dbConnect = new DatabaseConnection('employee_management_db', 'root', envvar.mysqlPassword, 'localhost', 3306);
dbConnect.testConnection();

inquirer.prompt({
    type: 'list',
    name: 'action',
    message: 'Choose an action',
    choices: ['Add Employee', 'Edit Employee', 'View Employees', 'Add Role', 'View Roles', 'Add Department', 'View Departments']
}).then((response) => {
    switch (response.action) {
        case 'Add Employee':
            addEmployee();
            break;
        case 'Edit Employee':
            editEmployee();
            break;
        case 'View Employees':
            viewEmployees();
            break;
        case 'Add Role':
            addRole();
            break;
        case 'View Roles':
            viewRoles();
            break;
        case 'Add Department':
            addDepartment();
            break;
        case 'View Departments':
            viewDepartments();
            break;
        default:
            break;
    }
});

function addEmployee() {
    console.log('addEmployee');
}

function editEmployee() {
    console.log('editEmployee');
}

function viewEmployees() {
    dbConnect.sendQuery('SELECT * FROM employee')
        .then(
            (res) => { console.log(res); }
        );
}

function addRole() {
    console.log('addRole');
}

function viewRoles() {
    dbConnect.sendQuery('SELECT * FROM role')
        .then(
            (res) => { console.log(res); }
        );
}

function addDepartment() {
    console.log('addDepartment');
}

function viewDepartments() {
    dbConnect.sendQuery('SELECT * FROM department')
        .then(
            (res) => { console.log(res); }
        );
}