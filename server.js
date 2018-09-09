require('dotenv').config();

const express = require('express');
const app = express();

const cors = require('cors');
const morgan = require('morgan');

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use(express.static('public'));

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

app.use((req, res, next) => {
  const id = req.get('Authorization');
  if(!id) {
    res.status(403).send({
      error: 'No token found'
    });
    return;
  }

  req.userId = id;

  next();
});

app.get('/api/goals', (req, res, next) => {
  client.query(`
    SELECT
      g.goal,
      g.complete,
      u.id as "userID",
      u.email as user
    FROM goals as g
    JOIN users as u
    ON g.user_id = u.id
    ORDER BY g.user_id;
  `)
    .then(result => {
      res.send(result.rows);
    })
    .catch(next);
});

app.get('/api/goals/me', (req, res, next) => {
  client.query(`
    SELECT id, goal, complete
    FROM goals
    WHERE user_id = $1
  `,
  [req.userId])
    .then(result => {
      res.send(result.rows);
    })
    .catch(next);
});

app.post('/api/goals/me', (req, res, next) => {
  const { goal } = req.body;

  client.query(`
    INSERT INTO goals (goal, user_id)
    VALUES ($1, $2)
    RETURNING *, user_id as "userId";
  `,
  [goal, req.userId])
    .then(result => {
      res.send(result.rows[0]);
    })
    .catch(next);
});

app.put('/api/goals/me', (req, res, next) => {
  const { id, complete } = req.body;

  client.query(`
    UPDATE goals
    SET
      complete = $1
    WHERE id = $2
    AND user_id = $3
    RETURNING *, user_id as "userId";
  `,
  [complete, id, req.userId])
    .then(result => {
      res.send(result.rows[0]);
    })
    .catch(next);
});

const chalk = require('chalk');

const color = chalk.gray.bgWhite;

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(color('SERVER BE SERVING ON', 3000)));

