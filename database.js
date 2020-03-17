const mysql = require('mysql');

require('dotenv').config()

//MySQL Database and connection

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB,
    multipleStatements: true
});

db.connect((err) => {

    if (err) {
        console.log("Error connecting to database : " + err);
    }
    console.log("Connected to Database Successfuly 👍")

});

module.exports = db;