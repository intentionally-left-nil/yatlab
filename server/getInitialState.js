const { getUser } = require('./helpers/authentication');

const getInitialState = (cookies) => {
  return new Promise((resolve, reject) => {
    const user = getUser(cookies);
    if (user) {
      resolve({user: true})
    }
    else {
      resolve({user: false});
    }
  });
};

module.exports = getInitialState;
