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

    endConnection() {
        this.connection.end();
    }

    // Read data on the database
    sendQuery(query) {
        return new Promise((resolve, reject) => {
            this.connection.query(query, (err, res) => {
                if (err) reject(err);
                resolve(res);
            });
        });
    }

    async getSelectionOptions(tableName) {
        let arr = new Array();
        let result = await dbConnect.sendQuery(`SELECT * FROM ${tableName}`);

        for (let i = 0; i < result.length; i++) {
            if (tableName === 'employee') {
                arr.push(`${result[i].id}: ${result[i].first_name} ${result[i].last_name}`);
            } else if (tableName === 'role') {
                arr.push(`${result[i].id}: ${result[i].title}`);
            } else if (tableName === 'department') {
                arr.push(`${result[i].id}: ${result[i].name}`);
            }
        }

        return arr;
    }
}

module.exports = DbConnection;