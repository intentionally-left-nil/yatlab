const db = require('../helpers/db');
const jsonRespond = require('../helpers/jsonRespond');
const {
  getUser,
  isAuthorized,
  respondUnauthorized
} = require('../helpers/authentication');


const handleAuth = (req) => {
  const team = req.params.team_id;
  const user = getUser(req.universalCookies);
  const authorized = isAuthorized(user, {team});
  if (!authorized) {
    respondUnauthorized(res);
  }
  return authorized;
};

const index = (req, res, next) => {
  if (!handleAuth(req)) {
    return;
  }
  const team = req.params.team_id;
  db.any('SELECT id, name, means, description, added_by FROM acronyms a WHERE team_id = ${team}', {team})
    .then(data => jsonRespond(res, data))
    .catch((error) => {
      const status = error.name === "QueryResultError" ? 404: 500;
      jsonRespond(res, {error}, status)
    })
};

const create = (req, res, next) => {
  if (!handleAuth(req)) {
    return;
  }
};

const put = (req, res, next) => {
  if (!handleAuth(req)) {
    return;
  }
};

const del = (req, res, next) => {
  if (!handleAuth(req)) {
    return;
  }
};

module.exports = { index, create, put, del };
