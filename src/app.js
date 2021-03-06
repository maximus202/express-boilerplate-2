require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');

const app = express();

app.use(helmet());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello, world!')
});

//conditionally returns an error message based on the environment
app.use(function errorHandler(error, req, res, next) {
    let response

    if (NODE_ENV === 'production') {
        response = {
            error:
            {
                message: 'server error'
            }
        };
    }
    else {
        console.error(error)
        response = {
            message: error.message, error
        }
    }

    res.status(500).json(response);
});


module.exports = app;