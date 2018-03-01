const respond = (res, payload, status) => {
  res.header('Content-Type', 'application/json');
  if (!status) {
    status = payload.error? 500 : 200;
  }

  if (payload.error && process.env.NODE_ENV === 'production') {
    ['stack', 'result', 'query', 'code', 'received'].forEach(field => delete payload.error[field]);
  }

  payload.ok = status === 200;

  res.status(status);
  res.send(JSON.stringify(payload));
};

module.exports = respond;
