const express = require('express');
const { Client } = require('pg');
const { signIn } = require('./sign_in_controller');
const { addTeam } = require('./team_controller');

const client = new Client();
const router = express.Router();

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});

router.get('/sign-in', signIn);
router.get('/add-team', addTeam);

module.exports = router;
