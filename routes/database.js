const mysql = require("mysql");
require("dotenv").config();

let dbconnection = process.env.DATABASE_CONNECTION_DATA;
console.log(dbconnection);

const mysqlConnection = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB,
});

mysqlConnection.connect(function (err) {
	if (err) {
		console.log(err);
		return;
	} else {
		console.log("Db is connected");
	}
});

module.exports = mysqlConnection;
