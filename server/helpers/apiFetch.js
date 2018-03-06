const fetch = require('node-fetch');
const getPort = require('./getPort');

const apiFetch = (req, url) => {
  const headers = {
    'Content-type': 'application/json',
    cookie: req.headers.cookie,
  };

  const base = `http://localhost:${getPort()}`;
  const fetchData = fetch(`${base}/api/${url}`, {headers}).then((response) => {
    return response.text().then(body => ({response, body}));
  })
  .catch(() => reject(({ok: false, error: "Fetch failed unexpectedly"})));

  return fetchData.then(({response, body}) => {
    body = JSON.parse(body);
    body.status = response.status;
    return response.ok ? Promise.resolve(body) : Promise.reject(body);
  });
};

module.exports = apiFetch;
