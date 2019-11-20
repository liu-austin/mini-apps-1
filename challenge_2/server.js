// jshint esversion:6
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
// const db = require('./db');
const router = require('./router');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '/client/dist')));
// app.post('/reports', (req, res) => {
//   console.log(req.body);
//   console.log(JSON.parse(req.body.jsondata));
// });

app.use('/', router);

app.listen(3000, () => console.log('Server is listening on port:', port));
