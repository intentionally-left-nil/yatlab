const express = require('express');
const { Client } = require('pg');
const { signIn } = require('./sign_in_controller');
const teamController = require('./team_controller');
const acronymController = require('./acronym_controller');

const client = new Client();
const router = express.Router();

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});

router.get('/teams/:team_id/acronyms', acronymController.index);
router.post('/teams/:team_id/acronyms', acronymController.create);
router.put('/teams/:team_id/acronyms/:id', acronymController.put);
router.delete('/teams/:team_id/acronyms/:id', acronymController.del);

router.get('/sign-in', signIn);
router.get('/teams/create', teamController.create);
router.get('/teams/:id', teamController.show);



module.exports = router;
