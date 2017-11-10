import { RtmClient, WebClient, CLIENT_EVENTS, RTM_EVENTS } from '@slack/client';
import parseMessage from './parseMessage';
import handleReactionAdded from './handleReactionAdded';

const addEvents = ({rtm, web, botWeb}) => {
  let botUser;

  rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (data) => {
    botUser = data.self.id;
  });

  rtm.on(RTM_EVENTS.MESSAGE, (message) => {
    parseMessage({botWeb, message});
  });

  rtm.on(RTM_EVENTS.REACTION_ADDED, (message) => {
    if (message.item.type === 'message' && message.user === botUser) {
      console.log('reaction by myself');
    } else {
      handleReactionAdded({web, botWeb, message});
    }
  });
};

const start = ({botToken, accessToken}) => {
  const rtm = new RtmClient(botToken);
  const web = new WebClient(accessToken);
  const botWeb = new WebClient(botToken);
  addEvents({rtm, web, botWeb});
  rtm.start();
};

export { start };
