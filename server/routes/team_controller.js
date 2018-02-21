const stringify = require('querystring').stringify;
const { getAccessToken, setUser } = require('../helpers/authentication');
const db = require('../helpers/db');

const saveTeam = (response) => {
  const {access_token: accessToken, team_id: teamId} = response;
  return db.none('INSERT INTO teams(id, access_token) VALUES($1, $2) ON CONFLICT DO NOTHING', [teamId, accessToken])
  .then(Promise.resolve(response))
  .catch(error => Promise.reject({ok: false, error});
};

const handleFailure = (res, error = "Unknown") => {
  res.redirect(`/?${stringify({error})}`);
};

const addTeam = (req, res, next) => {
  const code = req.query.code;
  if (code) {
    getAccessToken({code, subRoute: 'add-team'})
      .then(saveTeam)
      .then((response) => {
        res.redirect('/');
      })
      .catch(response => handleFailure(res, response.error));
  } else {
    handleFailure(res, req.query.error);
  }
};

module.exports = {
  addTeam,
};
