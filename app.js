const inquirer = require('inquirer');
const DatabaseConnection = require('./database-connection.js');
const envvar = require('./envvar.js');

dbConnect = new DatabaseConnection('employee_management_db', 'root', envvar.mysqlPassword, 'localhost', 3306);
dbConnect.testConnection();

// Select employee manager action
inquirer.prompt({
    type: 'list',
    name: 'action',
    message: 'Choose an action',
    choices: ['Add Employee', 'Edit Employee', 'View Employees', 'Add Role', 'View Roles', 'Add Department', 'View Departments']
}).then(response => {
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

// Create new employee and add to database
function addEmployee() {
    inquirer.prompt([{
        type: 'input',
        name: 'firstName',
        message: 'Enter new employees first name:'
    }, {
        type: 'input',
        name: 'lastName',
        message: 'Enter new employees last name: '
    }, {
        type: 'number',
        name: 'roleId',
        message: 'Enter new employees role id: '
    }, {
        type: 'number',
        name: 'managerId',
        message: 'Enter new employees manager id: '
    }]).then(response => {
        dbConnect.sendQuery(
            `INSERT INTO employee(first_name, last_name, role_id, manager_id) 
            VALUE('${response.firstName}', '${response.lastName}', ${response.roleId}, ${response.managerId})`
        );
    });
}

// Edit an employee role in the database
function editEmployee() {
    let updateField = 'first_name';
    let newValue = 'Name';
    let roleId = 1;

    dbConnect.sendQuery(`UPDATE employee SET ${updateField} = "${newValue}" WHERE id = ${roleId}`);
}

// View all employee roles in the database
function viewEmployees() {
    dbConnect.sendQuery('SELECT * FROM employee')
        .then(
            (res) => { console.log(res); }
        );
}

// Create new role and add to database
function addRole() {
    // let title = 'Test Title';
    // let salary = 40000;
    // let departmentId = 1;

    inquirer.prompt([{
        type: 'input',
        name: 'title',
        message: 'Enter title of new role: '
    }, {
        type: 'number',
        name: 'salary',
        message: 'Enter annual salary for new role: '
    }, {
        type: 'number',
        name: 'departmentId',
        message: 'Enter department ID for new role: '
    }]).then(response => {
        dbConnect.sendQuery(
            `INSERT INTO role(title, salary, department_id) 
            VALUE('${response.title}', ${response.salary}, ${response.departmentId})`
        );
    });
}

// View all roles in the employee database
function viewRoles() {
    dbConnect.sendQuery('SELECT * FROM role')
        .then(
            (res) => { console.log(res); }
        );
}

// Create a department in the employee database
function addDepartment() {
    let name = 'Test Name';

    dbConnect.sendQuery(
        `INSERT INTO department(name) VALUE('${name}')`
    );
}

// View all departments in the employee database
function viewDepartments() {
    dbConnect.sendQuery('SELECT * FROM department')
        .then(
            (res) => { console.log(res); }
        );
}