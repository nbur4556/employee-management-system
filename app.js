const inquirer = require('inquirer');

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
    console.log('viewEmployees');
}

function addRole() {
    console.log('addRole');
}

function viewRoles() {
    console.log('viewRoles');
}

function addDepartment() {
    console.log('addDepartment');
}

function viewDepartments() {
    console.log('viewDepartments');
}