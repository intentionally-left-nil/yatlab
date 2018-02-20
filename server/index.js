const app = require('./app')

const PORT = process.env.PORT || 3001;

// Why don't I need http createServer
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`)
});
app.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  switch (error.code) {
    case 'EACCES':
      console.error(`${PORT} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${PORT} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});
