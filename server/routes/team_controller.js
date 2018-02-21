const stringify = require('querystring').stringify;
const { getAccessToken, setUser } = require('../helpers/authentication');
const db = require('../helpers/db');

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
  return db.none('INSERT INTO teams(id, access_token, bot_user_id, bot_access_token, name) VALUES($1, $2, $3, $4, $5) ON CONFLICT DO NOTHING', [teamId, accessToken, botUserId, botAccessToken, name])
  .then(Promise.resolve(response))
  .catch(error => Promise.reject({ok: false, error}));
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
