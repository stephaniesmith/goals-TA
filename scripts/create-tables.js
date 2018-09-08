require('dotenv').config();
const client = require('../db-client');

client.query(`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(256) NOT NULL,
    password VARCHAR(256) NOT NULL
  );
  CREATE TABLE IF NOT EXISTS goals (
    id SERIAL PRIMARY KEY,
    goal VARCHAR(256) NOT NULL,
    complete BOOLEAN DEFAULT false,
    user_id INTEGER NOT NULL REFERENCES users(id)        
  );
`)
  .then(
    () => console.log('CREATED THEM TALBES!!!'),
    err => console.error(err)
  )
  .then(() => client.end());