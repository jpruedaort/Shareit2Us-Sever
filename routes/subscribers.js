const express = require("express");
const router = express.Router();

const mysqlConnection = require("./database");
const d = new Date();
const year = d.getUTCFullYear();
const month = d.getUTCMonth() + 1;
const date = d.getUTCDate();
const dateCreated = `${year}-${month}-${date}`;

router.get("/", (req, res) => {
	mysqlConnection.query("SELECT * FROM codegroup", (err, rows, fields) => {
		if (!err) {
			res.json(rows);
		} else {
			console.log(err);
		}
	});
});

router.get("/api/validatecode/:code", (req, res) => {
	const { code } = req.params;
	mysqlConnection.query(
		"SELECT * FROM codegroup WHERE uniquecode =? ",
		[code],
		(err, rows, fields) => {
			if (!err) {
				res.json(rows);
			} else {
				console.log(err);
			}
		}
	);
});

router.post("/api/", (req, res) => {
	const { code } = req.body;
	const query = `INSERT INTO codegroup (uniquecode, dateupload) values (?)`;
	const values = [code, dateCreated];
	mysqlConnection.query(query, [values], (err, rows, fields) => {
		if (!err) {
			res.json({ Status: "post sent" });
		} else {
			console.log(err);
		}
	});
});

router.post("/api/createnewgroup", (req, res) => {
	codelist = [];
	for (let i = 0; i < 10; i++) {
		let randomChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		var randomCharsList = randomChars.split("");
		var charIndex = Math.floor(Math.random() * (45 - 0 + 1));
		codelist.push(randomCharsList[charIndex]);
	}

	stringcode = codelist.join("");
	const query = `INSERT INTO codegroup (uniquecode, dateupload) values (?)`;
	const values = [stringcode, dateCreated];
	mysqlConnection.query(query, [values], (err, rows, fields) => {
		if (!err) {
			res.json({ code: stringcode });
		} else {
			console.log(err);
		}
	});
});

router.post("/api/sendmessage", (req, res) => {
	const { name, textarea, code } = req.body;
	const query = `INSERT INTO message (ownerid, mcontent,dateupload,name) values(
		(Select id from codegroup where uniquecode=${code}),
		${textarea},
		"${dateCreated}",
		${name}
		)`;
	mysqlConnection.query(query, [], (err, rows, fields) => {
		if (!err) {
			res.json({ result: "posted" });
			console.log("posted");
		} else {
			console.log(err);
		}
	});
});

router.get("/api/requestmessage/:code", (req, res) => {
	const { code } = req.params;
	let query = `select message.name , message.dateupload , message.mcontent from message inner join codegroup on message.ownerid=codegroup.id where codegroup.uniquecode="${code}";`;
	mysqlConnection.query(query, [], (err, rows, field) => {
		if (!err) {
			res.json(rows);
		} else {
			console.log(err);
		}
	});
});

module.exports = router;
