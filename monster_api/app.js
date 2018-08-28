const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/', routes);

app.listen(port, () => {
    console.log(`Listing on port: ${port}`);
});

app.use((err, req, res, next) => {
    res.json(err);
});

module.exports = app;