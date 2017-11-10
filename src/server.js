import { RtmClient, WebClient, RTM_EVENTS } from '@slack/client';
import { parseMessage } from './messageParser';

const addEvents = (rtm, web) => {
  rtm.on(RTM_EVENTS.MESSAGE, (message) => {
    console.log('message', message);
    parseMessage({web, message});
  });
};

const start = ({token}) => {
  const rtm = new RtmClient(token);
  const web = new WebClient(token);
  addEvents(rtm, web);
  rtm.start();
};

export { start };
