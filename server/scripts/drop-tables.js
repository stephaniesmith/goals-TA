require('dotenv').config();
const client = require('../db-client');

client.query(`
  DROP TABLE IF EXISTS goals;
  DROP TABLE IF EXISTS users;
`)
  .then(
    () => console.log('DROPPED THEM TABLES!!!'),
    err => console.log(err)
  )
  .then(() => {
    client.end();
  });