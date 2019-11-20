// jshint esversion:6
const router = require('express').Router();
const controller = require('./controller');

router.route('/reports')
.get(controller.getAll)
.post(controller.create);

router.route('/reports/:id')
.get(controller.getOne);

module.exports = router;