const mysql = require("mysql");

const mysqlConnection = mysql.createConnection({
	host: "b2gtcv6svcl4hdnzokb2-mysql.services.clever-cloud.com",
	user: "uungclcapd2mwgib",
	password: "wTOXImHMPaxFLhJXkcwB",
	database: "b2gtcv6svcl4hdnzokb2",
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
