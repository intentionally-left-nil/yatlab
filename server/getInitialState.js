const { getUser } = require('./helpers/authentication');

const getInitialState = (cookies) => {
  const user = getUser(cookies);
  if (!user) { return {}; }
  return {};
};

module.exports = getInitialState;
