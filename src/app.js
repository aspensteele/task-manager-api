const express = require('express');
const bodyParser = require('body-parser');
const tasksRouter = require('./routes/tasks');

const app = express();
app.use(bodyParser.json());
app.use('/tasks', tasksRouter);

module.exports = app;