const pgp = require('pg-promise')();

exports.up = (pgm) => new Promise((resolve) => {
  const db = pgp(process.env.DATABASE_URL);
  db.none('UPDATE teams SET version = 1 WHERE version IS NULL').then(resolve);
});


exports.down = (pgm) => {
};
