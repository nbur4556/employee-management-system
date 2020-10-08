const mysql = require('mysql');
const envvar = require('./envvar');

class DbConnection {
    constructor(database, user = 'root', password = envvar.mysqlPassword, host = 'localhost', port = 3306) {
        this.connection = mysql.createConnection({
            host: host,
            port: port,
            user: user,
            password: password,
            database: database
        });
    }

    testConnection() {
        this.connection.connect(err => {
            if (err) throw err;

            console.log(`Successfully connected to MySQL database`);
        });
    }

    // Create data on the database
    create(tableName, colNames) {

    }

    // Read data on the database
    read(tableName, query = '*') {
        return new Promise((resolve, reject) => {
            this.connection.query(`SELECT ${query} FROM ${tableName}`, (err, res) => {
                if (err) reject(err);

                resolve(res);
                this.connection.end();
            });
        });
    }

    // Update data on the database
    update() {

    }

    // Delete data on the database
    delete() {

    }
}

const employeeManagementConnection = new DbConnection('employee_management_db');
// employeeManagementConnection.testConnection();

// READ TEST
employeeManagementConnection.read('fake')
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.log(err);
    });

module.exports = DbConnection;