exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.dropColumns('acronyms_users', 'team_id');
  pgm.addColumns('acronyms_users', {
    acronym_id: {
      type: 'integer',
      unique: false,
      notNull: true,
      references: 'acronyms'
    },
  });
  pgm.addIndex('acronyms_users', 'acronym_id');
};

exports.down = (pgm) => {
  pgm.addColumns('acronyms_users', {
    team_id: {
      type: 'string',
      unique: false,
      notNull: true,
      references: 'teams'
    }
  });
};
