import { getAcronyms } from './acronyms';

const parseMessage = ({web, message}) => {
  const acronyms = getAcronyms(message.text);
  if (acronyms.length) {
    console.log(`adding a reaction to ${message.channel}`);
    web.reactions.add('question', { channel: message.channel, timestamp: message.ts});
  }
};

export default parseMessage;
