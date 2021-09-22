const express = require('express');
const controllers = require('./controllers');
const app = express();

app.use(express.json())
app.use('/api', controllers)

module.exports = app;