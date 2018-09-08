require('dotenv').config();
const client = require('../db-client');
const goals = require('./goals.json');
const users = require('./users.json');

Promise.all(
  users.map(user => {
    return client.query(`
      INSERT INTO users (email, password)
      VALUES ($1, $2);
    `,
    [user.email, user.password]
    ).then(result => result.rows[0]);
  })
)
  .then(() => {
    return Promise.all(
      goals.map(goal => {
        return client.query(`
          INSERT INTO goals (goal, complete, user_id)
          VALUES ($1, $2, $3);
        `,
        [goal.goal, goal.complete, goal.userId]
        ).then(result => result.rows[0]);
      })
    );
  })
  .then(
    () => console.log('SEEDED THE DATA!!!'),
    err => console.error(err)
  )
  .then(() => client.end());