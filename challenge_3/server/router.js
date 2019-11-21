// jshint esversion:6
const router = require('express').Router();
const controller = require('./controller');

router.route('/f1')
    .post(controller.postf1);

router.route('/f1/:email')
    .get(controller.getf1);

router.route('/f2')
    .post(controller.postf2);

router.route('/f2/:userid')
    .get(controller.getf2);

router.route('/f3')
    .post(controller.postf3);

router.route('/f3/:userid')
    .get(controller.getf3)

router.route('/all/:userid')
    .get(controller.getAll);

module.exports = router;