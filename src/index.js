import { start } from './server';
import { argv } from 'yargs';

if (argv.start || true) {
  const token = process.env.SLACK_BOT_TOKEN;
  start({token});
}
