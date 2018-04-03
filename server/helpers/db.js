const pgp = require('pg-promise')();
let url = process.env.DATABASE_URL;
if (!url &&
    process.env.DB_PORT_5432_TCP_ADDR &&
    process.env.DB_PORT_5432_TCP_PORT &&
    process.env.DB_ENV_POSTGRES_PASSWORD) {
  url = `postgres://postgres:${process.env.DB_ENV_POSTGRES_PASSWORD}@` +
  `${process.env.DB_PORT_5432_TCP_ADDR}:${process.env.DB_PORT_5432_TCP_PORT}/postgres`;
}
console.debug("Connecting to ", url);
const db = pgp(url);
module.exports = db;
