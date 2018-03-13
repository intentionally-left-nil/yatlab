const stringify = require('querystring').stringify;
const { getAccessToken, setUser, unsetUser } = require('../helpers/authentication');

const handleFailure = (res, error = "Unknown") => {
  res.redirect(`/?${stringify({error})}`);
};

const signIn = (req, res, next) => {
  const code = req.query.code;
  if (code) {
    getAccessToken({code, subRoute: 'sign-in'})
      .then((response) => {
        const {access_token, user: {name, id}, team: {id: team}} = response;
        setUser(res, {id, name, team: team});
        res.redirect('/');
      })
      .catch(response => handleFailure(res, response.error));
  } else {
    handleFailure(res, req.query.error);
  }
};

const signOut = (req, res, next) => {
  unsetUser(req.universalCookies);
  res.redirect('/');
};

module.exports = {
  signIn,
  signOut,
};
