const stringify = require('querystring').stringify;
const fetch = require('node-fetch');
const authentication = require('../helpers/authentication');

const getAccessToken = (code) => {
  const params = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uri: `${process.env.URL_BASE}/api/sign-in`,
    code,
  };
  const href = `https://slack.com/api/oauth.access?${stringify(params)}`;
  return fetch(href)
  .then(response => response.text())
  .then(body => JSON.parse(body))
  .catch(() => ({ok: false, error: "Unable to reach oauth.access"}));
};

const signIn = (req, res, next) => {
  const code = req.query.code;
  getAccessToken(code);
  if (code) {
    getAccessToken(code)
      .then((response) => {
        if (response.ok) {
          const {access_token, user: {name, id}, team: {id: teamId}} = response;
          authentication.setUser(res, {id, name, team: teamId});
          res.redirect('/');
        } else {
          error = response.error;
          res.redirect(`/?${stringify({error})}`);
        }
      });
  } else {
    const error = req.query.error || "Unknown";
    res.redirect(`/?${stringify({error})}`);
  }
};

module.exports = {
  signIn,
};
