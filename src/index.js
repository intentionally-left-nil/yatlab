import { start } from './server';
import express from 'express';

const botToken = process.env.SLACK_BOT_TOKEN;
const accessToken = process.env.SLACK_ACCESS_TOKEN;
start({botToken, accessToken});

const app = express();
app.get('/', (req, res) => {
  res.send('Hello Yatlab!');
});
app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), () => {
  console.log(`Listening on port ${app.get('port')}`);
});
