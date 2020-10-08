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
}

const employeeManagementConnection = new DbConnection('employee_management_db');
employeeManagementConnection.testConnection();

module.exports = DbConnection;