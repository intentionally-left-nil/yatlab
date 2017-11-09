import { RtmClient } from '@slack/client';

const start = ({token}) => {
  const rtm = new RtmClient(token);
  rtm.start();
};

export { start };
