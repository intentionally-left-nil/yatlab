import { RtmClient, RTM_EVENTS } from '@slack/client';
import { parseMessage } from './messageParser';

const addEvents = (rtm) => {

  rtm.on(RTM_EVENTS.MESSAGE, (message) => {
    console.log('message', message);
    parseMessage(message);
  });
};

const start = ({token}) => {
  const rtm = new RtmClient(token);
  addEvents(rtm);
  rtm.start();
};

export { start };
