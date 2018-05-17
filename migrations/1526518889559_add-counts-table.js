exports.up = (pgm) => {
  pgm.createTable('acronyms_users', {
    team_id: {
      type: 'string',
      unique: false,
      notNull: true,
      references: 'teams'
    },
    user_id: {
      type: 'string',
      unique: false,
      notNull: true,
    },
    count: {
      type: 'integer',
      unique: false,
      default: 0,
    },
  });
  pgm.createIndex('acronyms_users', ['team_id', 'user_id']);
};

exports.down = (pgm) => {
  pgm.dropIndex('acronyms_users', ['team_id', 'user_id']);
  pgm.dropTable('acronyms_users');
};
