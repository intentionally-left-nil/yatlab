const jwt = require('jsonwebtoken');
const stringify = require('querystring').stringify;
const fetch = require('node-fetch');
const jsonRespond = require('./jsonRespond');

const twoWeeksInSeconds = 60 * 60 * 24 * 14;

const getAccessToken = ({code, subRoute}) => {
  const params = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uri: `${process.env.URL_BASE}/api/${subRoute}`,
    code,
  };
  const href = `https://slack.com/api/oauth.access?${stringify(params)}`;
  const download = fetch(href)
    .then(response => response.text())
    .then(body => JSON.parse(body))
    .catch(() => ({ok: false, error: "Unable to reach oauth.access"}));

  return download
    .then(response => response.ok ?
      Promise.resolve(response) :
      Promise.reject(response));
};

const generateToken = (data) => {
  const token = jwt.sign(data, process.env.JWT_SECRET, { algorithm: 'HS256', expiresIn: twoWeeksInSeconds });
  return token
};

const setUser = (response, {id, name, team}) => {
  const token = generateToken({sub: id, name, team});
  const value = `Bearer ${token}`;
  const prod = !!process.env.NODE_ENV === 'production';
  const maxAge = twoWeeksInSeconds * 1000;
  response.cookie('Authorization', value, { maxAge, httpOnly: prod, secure: prod });
};

const unsetUser = (cookies) => {
  cookies.remove('Authorization');
};

const getUser = (cookies) => {
  const auth = cookies.get('Authorization');
  let user = null;
  if (auth && auth.startsWith('Bearer ')) {
    const token = auth.slice('Bearer '.length);
    try {
      user = jwt.verify(token, process.env.JWT_SECRET);
    } catch(e) {
      user = null;
    }
  }
  return user;
};

const isAuthorized = (user, desiredAccess) => {
  let authorized = false;
  if (user) {
    const {team: desiredTeam, user: desiredUser} = desiredAccess;
    authorized = ((!desiredTeam || user.team === desiredTeam) &&
      (!desiredUser || user.sub === desiredUser));
  }
  return authorized;
};

const respondUnauthorized = (res) => {
  jsonRespond(res, {error: 'Unauthorized'}, 403);
};

module.exports = { setUser, getUser, unsetUser, getAccessToken, isAuthorized, respondUnauthorized };
