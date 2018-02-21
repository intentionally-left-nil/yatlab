const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const stringify = require('querystring').stringify;
const authentication = require('../helpers/authentication');

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});

router.get('/sign_in', (req, res, next) => {
  const code = req.query.code;
  if (code) {
    const params = {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: `${process.env.URL_BASE}/api/sign_in`,
      code,
    };
    const href = `https://slack.com/api/oauth.access?${stringify(params)}`;
    fetch(href)
      .then(response => response.text())
      .then((body) => {
        const response = JSON.parse(body);
        if (response.ok) {
          const {access_token, user: {name, id}, team: {id: team_id}} = response;
          authentication.setUser(res, {id, name});
          res.redirect('/');
        } else {
          error = response.error;
          res.redirect(`/?${stringify({error})}`);
        }
      })
      .catch(() => {
        res.redirect(`/?${stringify({error: "Unknown"})}`);
      });
  } else {
    const error = req.query.error || "Unknown";
    res.redirect(`/?${stringify({error})}`);
  }
});

router.get('/authorized', (req, res, next) => {

   const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
   console.log(fullUrl);
  res.json({})
});

router.get('/', (req, res, next) => {
  res.json({})
});


module.exports = router;
