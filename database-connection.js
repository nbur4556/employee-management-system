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

    // Read data on the database
    sendQuery(query) {
        return new Promise((resolve, reject) => {
            this.connection.query(query, (err, res) => {
                if (err) reject(err);

                resolve(res);
                this.connection.end();
            });
        });
    }
}

// const employeeManagementConnection = new DbConnection('employee_management_db');
// employeeManagementConnection.testConnection();

// DELETE TEST
// employeeManagementConnection.sendQuery('DELETE FROM employee WHERE id = 2')
//     .then(
//         (res) => { console.log(res); }
//     );

module.exports = DbConnection;