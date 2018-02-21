exports.up = (pgm) => {
  pgm.addColumns('teams', {
    bot_user_id: {
      type: 'string',
      comment: 'The slack user_id for the the yatlab bot user'
    },
    bot_access_token: {
      type: 'string',
      comment: 'The slack access_token for the the yatlab bot user'
    },
    name: {
      type: 'string',
      comment: 'The Slack team name',
    },
  });
};

exports.down = (pgm) => {
  pgm.dropColumns(table, ['bot_user_id', 'bot_access_token', 'name']);
};
