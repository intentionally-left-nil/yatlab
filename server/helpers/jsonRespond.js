const respond = (res, payload) => {
  res.header('Content-Type', 'application/json');
  if (payload.error && process.env.NODE_ENV === 'production') {
    ['stack', 'result', 'query', 'code', 'received'].forEach(field => delete payload.error[field]);
  }
  res.send(JSON.stringify(payload));
};

module.exports = respond;
