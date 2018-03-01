const { getUser } = require('./helpers/authentication');
const apiFetch = require('./helpers/apiFetch');

const getInitialState = (req) => {
  const user = getUser(req.universalCookies);
  if (!user) return Promise.resolve({});

  const team = apiFetch(`teams/${user.team}`, req)
    .then(({name}) => ({name}))
    .catch(() => null);

  return Promise.all([team]).then(([team]) => ({team}));
};

module.exports = getInitialState;
