const express = require('express');
const { Client } = require('pg')
const router = express.Router();
const { signIn } = require('./sign_in_controller');

const client = new Client();

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});

router.get('/sign-in', signIn);

router.get('/authorized', (req, res, next) => {

   const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
   console.log(fullUrl);
  res.json({})
});

router.get('/', (req, res, next) => {
  res.json({})
});


module.exports = router;
