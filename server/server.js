require('dotenv').config();

const express = require('express');
const app = express();

const cors = require('cors');
const morgan = require('morgan');

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

const client = require('./db-client');

app.post('/api/auth/signup', (req, res) => {
  const { email, password } = req.body;

  if(!email || !password) {
    res.status(400).send({
      error: 'email and password are required'
    });
    return;
  }

  client.query(`
    SELECT count(*)
    FROM users
    WHERE email = $1
  `,
  [email])
    .then(results => {
      if(results.rows[0].count > 0) {
        res.status(400).send({ error: 'email already in use' });
        return;
      }

      client.query(`
        INSERT INTO users (email, password)
        values ($1, $2)
        returning id, email
      `,
      [email, password])
        .then(results => res.send(results.rows[0]));
    });
});

app.post('/api/auth/signin', (req, res) => {
  const { email, password } = req.body;

  if(!email || !password) {
    res.status(400).send({
      error: 'email and password are required'
    });
    return;
  }

  client.query(`
    SELECT id, email, password
    FROM users
    WHERE email = $1
  `,
  [email])
    .then(results => {
      const row = results.rows[0];
      if(!row || row.password !== password) {
        res.status(401).send({ error: 'invalid email or password' });
        return;
      }

      res.send({
        id: row.id,
        email: row.email
      });
    });
});

const chalk = require('chalk');

const color = chalk.gray.bgWhite;

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(color('SERVER BE SERVING ON', 3000)));

