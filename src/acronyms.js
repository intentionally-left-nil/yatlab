const data = {
  swig: 'sub wildly important goal',
  wig: 'wildly important goal',
};

const getRegex = (acronym) => new RegExp(`\\b${acronym}(?:s|'s)?\\b`, 'i');

const acronyms = [];
for (let [acronym, definition] of Object.entries(data)) {
  acronyms.push({
    acronym,
    regex: getRegex(acronym),
    definition,
  });
}

const getAcronyms = (text) => acronyms.filter(({regex}) => regex.test(text));

export { getAcronyms };
