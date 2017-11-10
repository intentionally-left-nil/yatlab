import { start } from './server';

const token = process.env.SLACK_BOT_TOKEN;
start({token});
