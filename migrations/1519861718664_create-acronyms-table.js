exports.up = (pgm) => {
  pgm.createTable('acronyms', {
    id: {
      type: 'SERIAL',
      unique: true,
      notNull: true,
      primaryKey: true,
    },
    name: {
      type: 'string',
      unique: false,
      notNull: false,
      comment: 'The acronym itself',
    },
    means: {
      type: 'string',
      unique: false,
      notNull: false,
      comment: 'The expansion of the acronym',
    },
    description: {
      type: 'string',
      unique: false,
      notNull: false,
      comment: 'A detailed description of the acronym',
    },
    team_id: {
      type: 'string',
      unique: false,
      references: 'teams'
    },
    added_by: {
      type: 'string',
      unique: false,
      notNull: true,
      comment: 'The user name of the person adding the FAQ',
    },
  });
};

exports.down = (pgm) => {
    pgm.dropTable('acronyms');
};
