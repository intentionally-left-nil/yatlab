import { getAcronyms } from './acronyms';

const parseMessage = ({botWeb, message}) => {
  const acronyms = getAcronyms(message.text);
  if (acronyms.length) {
    console.log(`adding a reaction to ${message.channel}`);
    botWeb.reactions.add('question', { channel: message.channel, timestamp: message.ts});
  }
};

export default parseMessage;
