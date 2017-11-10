import { getAcronyms } from './acronyms';

const sendAcronym = ({botWeb, dmId, acronym}) => {
  const { description, definition } = acronym;
  let message;
  if (definition) {
    message = `${acronym.acronym} stands for ${definition}.`;
  } else {
    message = `${acronym.acronym}: `;
  }

  if (description) {
    message += description;
  }
  botWeb.chat.postMessage(dmId, message, { as_user: false });
};

const getMessageAcronyms = ({web, channel, ts}) => {
  const channelType = channel[0] === 'G' ? 'groups' : 'channels';
  return web[channelType].replies(channel, ts).then((response) => {
    const text = response.messages[0].text;
    const acronyms = getAcronyms(text);;
    if (!acronyms.length) {
      return Promise.reject();
    }
    return Promise.resolve(acronyms);
  });
};

const handleReactionAdded = ({web, botWeb, message}) => {
  const {channel, ts} = message.item;
  let acronyms, dmId;
  getMessageAcronyms({web, channel, ts})
    .then((a) => (acronyms = a))
    .then(() => botWeb.im.open(message.user))
    .then((response) => (dmId = response.channel.id))
    .then(() => {
      for (let acronym of acronyms) {
        sendAcronym({botWeb, dmId, acronym});
      }
    });
};

export default handleReactionAdded;
