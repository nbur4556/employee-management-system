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
            this.connection.end();
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

const employeeManagementConnection = new DbConnection('employee_management_db');
// employeeManagementConnection.testConnection();

// CREATE TEST
// employeeManagementConnection.sendQuery('INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUE("Billie", "Jean", 15, 7)')
//     .then(
//         (res) => { console.log(res); }
//     );

// READ TEST
// employeeManagementConnection.sendQuery('SELECT * FROM employee')
//     .then(
//         (res) => { console.log(res); }
//     );

// UPDATE TEST
// employeeManagementConnection.sendQuery('UPDATE employee SET last_name = "Eilish" WHERE id = 6')
//     .then(
//         (res) => { console.log(res); }
//     );


// DELETE TEST
// employeeManagementConnection.sendQuery('DELETE FROM employee WHERE id = 2')
//     .then(
//         (res) => { console.log(res); }
//     );

module.exports = DbConnection;