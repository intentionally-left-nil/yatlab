import { getAcronyms } from './acronyms';

const parseMessage = ({web, message}) => {
  const acronyms = getAcronyms(message.text);
  if (acronyms.length) {
    console.log(web.reactions.add('question', { channel: message.channel, timestamp: message.ts}));
  }
};

export { parseMessage };
