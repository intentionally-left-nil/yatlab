const { getUser } = require('./helpers/authentication');
const apiFetch = require('./helpers/apiFetch');

const getInitialState = (req) => {
  const user = getUser(req.universalCookies);
  if (!user) return Promise.resolve({});
  const team = apiFetch(req, `teams/${user.team}`)
    .then(({id, name, version}) => ({id, name, version}))
    .catch(() => null);

  return Promise.all([team]).then(([team]) => ({team}));
};

module.exports = getInitialState;
