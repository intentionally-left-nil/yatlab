const stringify = require('querystring').stringify;
const {
  getAccessToken,
  getUser,
  setUser,
  isAuthorized,
  respondUnauthorized
} = require('../helpers/authentication');
const db = require('../helpers/db');
const jsonRespond = require('../helpers/jsonRespond');
const version = 2; // Needs to stay in sync with src/helpers/version

// Example response from Slack
// access_token: 'xoxp-ACCESS-TOKEN',
//   scope: 'identify,bot,channels:history,groups:history,chat:write:bot,identity.basic',
//   user_id: 'USER_ID_HERE',
//   team_name: 'TEAM_NAME',
//   team_id: 'TEAM_ID',
//   bot:
//    { bot_user_id: 'BOT_USER_ID',
//      bot_access_token: 'xoxb-BOT-ACCESS-TOKEN' } }
const saveTeam = (response) => {
  const {
    access_token: accessToken,
    team_id: teamId,
    team_name: name,
    bot: {
      bot_user_id: botUserId,
      bot_access_token: botAccessToken,
    },
  } = response;
  const values = [teamId, accessToken, botUserId, botAccessToken, name, version];
  const statement = '\
    INSERT INTO teams(id, access_token, bot_user_id, bot_access_token, name, version) \
    VALUES($1, $2, $3, $4, $5, $6) \
    ON CONFLICT(id) DO UPDATE \
    SET access_token = $2, \
    bot_user_id = $3, \
    bot_access_token = $4, \
    name = $5, \
    version = $6';
  return db.none(statement, values)
  .then(Promise.resolve(response))
  .catch(error => Promise.reject({ok: false, error}));
};

const handleFailure = (res, error = "Unknown") => {
  res.redirect(`/?${stringify({error})}`);
};

const create = (req, res, next) => {
  const code = req.query.code;
  if (code) {
    getAccessToken({code, subRoute: 'teams/create'})
      .then(saveTeam)
      .then((response) => {
        res.redirect('/');
      })
      .catch(response => handleFailure(res, response.error));
  } else {
    handleFailure(res, req.query.error);
  }
};

const show = (req, res, next) => {
  const user = getUser(req.universalCookies);
  const id = req.params.id;
  if (isAuthorized(user, {team: id})) {
  db.one('SELECT name, version from teams WHERE id = ${id}', {id})
    .then(({name, version}) => jsonRespond(res, {id, name, version}))
    .catch((error) => {
      const status = error.name === "QueryResultError" ? 404: 500;
      jsonRespond(res, {error}, status)
    });
  } else {
    respondUnauthorized(res);
  }
};

module.exports = {
  create,
  show,
};
