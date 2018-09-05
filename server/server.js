require('dotenv').config();

const express = require('express');
const app = express();

const cors = require('cors');
const morgan = require('morgan');

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// const client = require('./db-client');

const chalk = require('chalk');

const color = chalk.gray.bgWhite;

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(color('SERVER BE SERVING ON', 3000)));

