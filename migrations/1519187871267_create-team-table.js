exports.up = (pgm) => {
  pgm.createTable('teams', {
    id: {
      type: 'string',
      unique: true,
      primaryKey: true,
      notNull: true,
      primary: true,
      comment: "The slack team ID",
    },
    access_token: {
      type: 'string',
      comment: "The slack access token for the team",
    }
  });
};

exports.down = (pgm) => {
  pgm.dropTable('teams');
};
