const { getUser } = require('./helpers/authentication');
const apiFetch = require('./helpers/apiFetch');

const getInitialState = (cookies) => {
  const user = getUser(cookies);
  if (!user) return Promise.resolve({});
  const team = apiFetch(`teams/${user.team}`, cookies)
    .then(({name}) => ({name}))
    .catch(() => null);

  return Promise.all([team]).then(([team]) => ({team}));
};

module.exports = getInitialState;
