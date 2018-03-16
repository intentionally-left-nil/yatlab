exports.up = (pgm) => {
  pgm.addColumns('teams', {
    version: {
      type: 'integer',
      comment: 'The version the team was installed with, in case it needs to be reinstalled'
    },
  });
};


exports.down = (pgm) => {
  pgm.dropColumns(table, ['version']);
};
