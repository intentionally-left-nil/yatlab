import { getAcronyms } from './acronyms';

const sendAcronym = ({rtm, dmId, acronym}) => {
  const message = `${acronym.acronym} stands for ${acronym.definition}`;
  rtm.sendMessage(message, dmId).then(response => console.log('yay', response));
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

const handleReactionAdded = ({web, rtm, message}) => {
  const {channel, ts} = message.item;
  let acronyms, dmId;
  getMessageAcronyms({web, channel, ts})
    .then((a) => (acronyms = a))
    .then(() => web.im.open(message.user))
    .then((response) => (dmId = response.channel.id))
    .then(() => {
      for (let acronym of acronyms) {
        sendAcronym({rtm, dmId, acronym});
      }
    });
};

export default handleReactionAdded;
