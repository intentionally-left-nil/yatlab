const apiFetch = (path, options = {}) => {
  const defaultOptions = {
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    credentials: 'same-origin',
  };

  const fetchData = fetch(path, Object.assign({}, defaultOptions, options))
    .then(response => response.text().then(body => ({ response, body })))
    .catch(() => Promise.reject(({ ok: false, error: 'Fetch failed unexpectedly' })));

  return fetchData.then(({ response, body }) => {
    const parsedBody = JSON.parse(body);
    parsedBody.status = response.status;
    return response.ok ? Promise.resolve(parsedBody) : Promise.reject(parsedBody);
  });
};

export default apiFetch;
