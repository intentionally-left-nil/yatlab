import { start } from './server';
import { argv } from 'yargs';

if (argv.start) {
  const token = process.env.SLACK_BOT_TOKEN;
  start({token});
}
