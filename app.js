require('./config/config');
require('./models/db');
require('./config/passportConfig');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const authentication = require('./routes/authentication.router');
var app = express();

// middleware
app.use(bodyParser.json());
app.use(cors());
const path=require('path');
app.use(passport.initialize());
app.use('/auth', authentication);
app.use(express.static(__dirname + '/dist'));

// error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
    else{
        console.log(err);
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/dist/index.html'))
  });
// start server
app.listen(process.env.PORT, () => console.log(`Server started at port : ${process.env.PORT}`));