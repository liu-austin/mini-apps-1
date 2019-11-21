// jshint esversion:6
const mysql = require('mysql');

const dbName = 'checkout';
const db = mysql.createConnection({
    user: 'austinliu',
    database: dbName
});

db.connect((err) => {
    if (err) {
        console.log(`Connection error: ${err.stack}.`);
    } else {
        console.log(`Connected to mySQL database: ${dbName}`);
    }
});

module.exports = db;
