// jshint esversion:6
const db = require('./db');

const dbHelpers = {
    getAll: (req, cb) => {
        db.query((`select f1._name, f1.email, f2.line1, f2.line2, f2._state, f2.zipcode, f3.creditcard, f3.expirydate, f3.cvv, f3.zipcode from f1 inner join f2 on f2.userid = ${req.params.userid} inner join f3 on f3.userid = ${req.params.userid}`), (err, results) => {
            if (err) {
                cb(err);
            } else {
                cb(null, results);
            }
        });
    },

    getUser: (req, cb) => {
        console.log(req.params);
        db.query((`select * from f1 where email = "${req.params.email}"`), (err, results) => {
            if (err) {
                cb(err);
            } else {
                console.log(results);
                cb(null, results);
            }
        });
    },
    postUser: (req, cb) => {
        db.query((`insert into f1 (_name, email, _password) values ("${req.body._name}", "${req.body.email}", "${req.body._password}")`), (err, results) => {
            if (err) {
                cb(err);
            } else {
                cb(null, results);
            }
        });
    },
    getShipping: (req, cb) => {
        db.query((`select * from f2 where userid = ${req.params.userid}`), (err, results) => {
            if (err) {
                cb(err);
            } else {
                cb(null, results);
            }
        });
    },
    postShipping: (req, cb) => {
        db.query((`insert into f2 (line1, line2, _state, zipcode, userid) values ("${req.body.line1}", "${req.body.line2}", "${req.body._state}", "${req.body.zipcode}", "${req.body.userid}")`), (err, results) => {
            if (err) {
                cb(err);
            } else {
                cb(null, results);
            }
        });
    },
    getBilling: (req, cb) => {
        db.query((`select * from f3 where userid = ${req.params.userid}`), (err, results) => {
            if (err) {
                cb(err);
            } else {
                cb(null, results);
            }
        });
    },
    postBilling: (req, cb) => {
        db.query((`insert into f3 (creditcard, expirydate, cvv, zipcode, userid) values ("${req.body.creditcard}", "${req.body.expirydate}", "${req.body.cvv}", "${req.body.zipcode}", "${req.body.userid}")`), (err, results) => {
            if (err) {
                cb(err);
            } else {
                cb(null, results);
            }
        });
    }
};

module.exports = dbHelpers;