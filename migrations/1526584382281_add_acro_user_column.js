exports.up = (pgm) => {
  pgm.addColumns('acronyms_users', {
    acro_user: {
      type: 'string',
      unique: true,
      primaryKey: true,
      notNull: true,
      primary: true,
      comment: "The combination of user id and acronym id",
    },
  });
};

exports.down = (pgm) => {
  pgm.dropColumns('acronyms_users', 'acro_user');
};
