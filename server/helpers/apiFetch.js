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
  .catch(() => Promise.reject(({ok: false, error: "Fetch failed unexpectedly"})));

  return fetchData.then(({response, body}) => {
    const parsedBody = JSON.parse(body);
    parsedBody.status = response.status;
    return response.ok ? Promise.resolve(parsedBody) : Promise.reject(parsedBody);
  });
};

module.exports = apiFetch;
