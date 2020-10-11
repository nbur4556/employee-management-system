const inquirer = require('inquirer');

inquirer.prompt({
    type: 'list',
    name: 'action',
    message: 'Choose an action',
    choices: ['Add Employee', 'Edit Employee', 'View Employees', 'Add Role', 'View Roles', 'Add Department', 'Departments']
}).then((response) => {
    console.log(response);
});