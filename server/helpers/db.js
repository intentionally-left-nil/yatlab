const pgp = require('pg-promise')();
console.debug("Connecting to ", process.env.DATABASE_URL);
const db = pgp(process.env.DATABASE_URL);
module.exports = db;
