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
    .then(acronyms => jsonRespond(res, { acronyms }))
    .catch((error) => {
      const status = error.name === "QueryResultError" ? 404: 500;
      jsonRespond(res, {error}, status)
    })
};

const create = (req, res, next) => {
  if (!handleAuth(req)) {
    return;
  }
  const teamId = req.params.team_id;
  const user = getUser(req.universalCookies);
  const data = {
    name: req.body.name,
    means: req.body.means,
    description: req.body.description,
    addedBy: user.name,
    teamId,
  };
  db.one('INSERT INTO acronyms(name, means, description, added_by, team_id) VALUES(${name}, ${means}, ${description}, ${addedBy}, ${teamId}) RETURNING id, added_by', data)
    .then(({ id, added_by }) => jsonRespond(res, { id, added_by }))
    .catch((error) => {
      const status = error.name === "QueryResultError" ? 404: 500;
      jsonRespond(res, {error}, status)
    });
};

const put = (req, res, next) => {
  if (!handleAuth(req)) {
    return;
  }
  const user = getUser(req.universalCookies);
  const data = {
    name: req.body.name,
    means: req.body.means,
    description: req.body.description,
    addedBy: user.name,
    id: req.params.id,
    teamId: req.params.team_id,
  };
  db.none('UPDATE acronyms SET name = ${name}, means = ${means}, description = ${description}, added_by = ${addedBy} WHERE id = ${id} AND team_id = ${teamId}', data)
    .then(() => jsonRespond(res, {}));
};

const del = (req, res, next) => {
  if (!handleAuth(req)) {
    return;
  }
  const data = {
    id: req.params.id,
    teamId: req.params.team_id,
  };

  db.none('DELETE FROM acronyms WHERE id = ${id} AND team_id = ${teamId};', data)
    .then(() => jsonRespond(res, {}));
};

module.exports = { index, create, put, del };
