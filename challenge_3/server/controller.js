// jshint esversion:6
const dbHelpers = require('./db/dbHelper');

const controller = {
    getAll: (req, res) => {
        dbHelpers.getAll(req, (err, results) => {
            if (err) {
                console.log(err);
                res.status(404).send(err);
            } else {
                res.status(200).send(results);
            }
        });
    },

    getf1: (req, res) => {
        dbHelpers.getUser(req, (err, results) => {
            if (err) {
                console.log(err);
                res.status(404).send(err);
            } else {
                res.status(200).send(results);
            }
        });
    },

    postf1: (req, res) => {
        dbHelpers.postUser(req, (err, results) => {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            } else {
                res.status(201).send(results);
            }
        });
    },

    getf2: (req, res) => {
        dbHelpers.getShipping(req, (err, results) => {
            if (err) {
                console.log(err);
                res.status(404).send(err);
            } else {
                res.status(200).send(results);
            }
        });
    },

    postf2: (req, res) => {
        dbHelpers.postShipping(req, (err, results) => {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            } else {
                res.status(201).send(results);
            }
        });
    },

    getf3: (req, res) => {
        dbHelpers.getBilling(req, (err, results) => {
            if (err) {
                res.status(404).send(err);
            } else {
                res.status(200).send(results);
            }
        });
    },

    postf3: (req, res) => {
        dbHelpers.postBilling(req, (err, results) => {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            } else {
                res.status(201).send(results);
            }
        });
    }
};

module.exports = controller;