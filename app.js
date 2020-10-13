const inquirer = require('inquirer');
const DatabaseConnection = require('./database-connection.js');
const envvar = require('./envvar.js');

// Initialize database connection
dbConnect = new DatabaseConnection('employee_management_db', 'root', envvar.mysqlPassword, 'localhost', 3306);
dbConnect.testConnection();

// Select employee manager action
async function selectAction() {
    // Select initial action
    let { action } = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'Choose an action',
        choices: ['Add', 'Edit', 'View', 'Delete', 'Quit']
    });

    // If action is not to quit application, continue
    if (action !== 'Quit') {
        let { category } = await inquirer.prompt({
            type: 'list',
            name: 'category',
            message: 'Choose a category',
            choices: ['Employee', 'Role', 'Department']
        });

        switch (`${action} ${category}`) {
            case 'Add Employee':
                addEmployee();
                break;
            case 'Edit Employee':
                editOnDatabase('employee', ['first_name', 'last_name', 'role_id', 'manager_id']);
                break;
            case 'View Employee':
                viewFromDatabase('employee');
                break;
            case 'Delete Employee':
                deleteFromDatabase('employee');
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Edit Role':
                editOnDatabase('role', ['title', 'salary', 'department_id']);
                break;
            case 'View Role':
                viewFromDatabase('role');
                break;
            case 'Delete Role':
                deleteFromDatabase('role');
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'Edit Department':
                editOnDatabase('department', ['name']);
                break;
            case 'View Department':
                viewFromDatabase('department');
                break;
            case 'Delete Department':
                deleteFromDatabase('department');
                break;
            default:
                break;
        }
    } else { dbConnect.endConnection(); }
}

// Create new employee and add to database
async function addEmployee() {
    let { firstName, lastName, roleName, managerName } = await inquirer.prompt([{
        type: 'input',
        name: 'firstName',
        message: 'Enter new employees first name:'
    }, {
        type: 'input',
        name: 'lastName',
        message: 'Enter new employees last name:'
    }, {
        type: 'list',
        name: 'roleName',
        message: 'Select a role for new employee',
        choices: await dbConnect.getSelectionOptions('role')
    }, {
        type: 'list',
        name: 'managerName',
        message: 'Select a manager for new employee',
        choices: await dbConnect.getSelectionOptions('employee')
    }]);

    // Gets id from choice string
    let managerId = getIdFromChoice(managerName);
    let roleId = getIdFromChoice(roleName);

    await dbConnect.sendQuery(
        `INSERT INTO employee(first_name, last_name, role_id, manager_id) 
        VALUE('${firstName}', '${lastName}', ${roleId}, ${managerId})`
    );

    selectAction();
}

// Create new role and add to database
async function addRole() {
    let { title, salary, departmentName } = await inquirer.prompt([{
        type: 'input',
        name: 'title',
        message: 'Enter title of new role:'
    }, {
        type: 'number',
        name: 'salary',
        message: 'Enter annual salary for new role:'
    }, {
        type: 'list',
        name: 'departmentName',
        message: 'Enter department ID for new role:',
        choices: await dbConnect.getSelectionOptions('department')
    }]);

    // Error handling
    if (salary) {
        // Gets id from choice string
        let departmentId = getIdFromChoice(departmentName);

        await dbConnect.sendQuery(
            `INSERT INTO role(title, salary, department_id) 
            VALUE('${title}', ${salary}, ${departmentId})`
        );
    }
    else {
        console.error('Could not add role, salary is not a number');
    }

    selectAction();
}

// Create new department and add to database
async function addDepartment() {
    let { name } = await inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'Enter name of new department'
    });

    dbConnect.sendQuery(
        `INSERT INTO department(name) VALUE('${name}')`
    );

    selectAction();
}

// View all results from table
function viewFromDatabase(tableName) {
    dbConnect.sendQuery(`SELECT * FROM ${tableName}`)
        .then(res => {
            for (let i = 0; i < res.length; i++) {
                console.log(res[i]);
            }
        }).then(() => {
            selectAction();
        });
}

// Edit data from database
function editOnDatabase(tableName, choices) {
    inquirer.prompt([{
        type: 'list',
        name: 'updateField',
        message: 'Select field to update',
        choices: choices
    }, {
        type: 'number',
        name: 'id',
        message: `Enter ${tableName} ID to update:`,
    }, {
        type: 'input',
        name: 'newValue',
        message: 'Enter new value:',
    }]).then(res => {
        dbConnect.sendQuery(
            `UPDATE ${tableName} SET ${res.updateField} = "${res.newValue}" WHERE id = ${res.id}`
        ).then(() => {
            selectAction();
        });
    })
}

// Delete data from database
async function deleteFromDatabase(tableName) {
    let { deleteItem } = await inquirer.prompt({
        type: 'list',
        name: 'deleteItem',
        message: `Select ${tableName} to delete`,
        choices: await dbConnect.getSelectionOptions(tableName)
    });

    // Gets id from choice string
    let deleteId = getIdFromChoice(deleteItem);

    await dbConnect.sendQuery(`DELETE FROM ${tableName} WHERE id="${deleteId}"`);
    selectAction();
}

function getIdFromChoice(choice) {
    let arr = choice.split(':');
    return arr[0];
}

// Start Application
selectAction();