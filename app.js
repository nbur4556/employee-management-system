const inquirer = require('inquirer');
const DatabaseConnection = require('./database-connection.js');
const envvar = require('./envvar.js');

dbConnect = new DatabaseConnection('employee_management_db', 'root', envvar.mysqlPassword, 'localhost', 3306);
dbConnect.testConnection();

// Select employee manager action
inquirer.prompt({
    type: 'list',
    name: 'action',
    message: 'Choose an action: ',
    choices: ['Add Employee', 'Edit Employee', 'View Employees', 'Delete Employee', 'Add Role',
        'View Roles', 'Delete Role', 'Add Department', 'View Departments', 'Delete Department']
}).then(response => {
    switch (response.action) {
        case 'Add Employee':
            addEmployee();
            break;
        case 'Edit Employee':
            editEmployee();
            break;
        case 'View Employees':
            viewFromDatabase('employee');
            break;
        case 'Delete Employee':
            deleteFromDatabase('employee');
            break;
        case 'Add Role':
            addRole();
            break;
        case 'View Roles':
            viewFromDatabase('role');
            break;
        case 'Delete Role':
            deleteFromDatabase('role');
            break;
        case 'Add Department':
            addDepartment();
            break;
        case 'View Departments':
            viewFromDatabase('department');
            break;
        case 'Delete Department':
            deleteFromDatabase('department');
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
// function viewEmployees() {
//     dbConnect.sendQuery('SELECT * FROM employee')
//         .then(
//             res => { console.log(res); }
//         );
// }

// Create new role and add to database
function addRole() {
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
// function viewRoles() {
//     dbConnect.sendQuery('SELECT * FROM role')
//         .then(
//             res => { console.log(res); }
//         );
// }

// Create new department and add to database
function addDepartment() {
    inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'Enter name of new department'
    }).then(response => {
        dbConnect.sendQuery(
            `INSERT INTO department(name) VALUE('${response.name}')`
        );
    });
}

// View all departments in the employee database
// function viewDepartments() {
//     dbConnect.sendQuery('SELECT * FROM department')
//         .then(
//             res => { console.log(res); }
//         );
// }

function viewFromDatabase(tableName) {
    dbConnect.sendQuery(`SELECT * FROM ${tableName}`)
        .then(res => {
            console.log(res);
        });
}

function deleteFromDatabase(tableName) {
    inquirer.prompt({
        type: 'number',
        name: 'id',
        message: `Enter ${tableName} ID to delete: `
    }).then(response => {
        dbConnect.sendQuery(`DELETE FROM ${tableName} WHERE id="${response.id}"`);
    });
}