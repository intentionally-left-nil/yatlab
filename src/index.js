import { start } from './server';

const botToken = process.env.SLACK_BOT_TOKEN;
const accessToken = process.env.SLACK_ACCESS_TOKEN;
start({botToken, accessToken});
process.stdin.resume();
