import { getAcronyms } from './acronyms';

const parseMessage = (message) => {
  const acronyms = getAcronyms(message.text);
  console.log(acronyms);
};

export { parseMessage };
