import fs from 'fs';
import path from 'path';

const dataPath = path.join(__dirname, 'data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const getRegex = (acronym) => new RegExp(`\\b${acronym}(?:s|'s)?\\b`, 'i');

const acronyms = [];
for (let [acronym, {definition, description}] of Object.entries(data)) {
  acronyms.push({
    acronym,
    regex: getRegex(acronym),
    definition,
    description,
  });
}

const getAcronyms = (text) => acronyms.filter(({regex}) => regex.test(text));

export { getAcronyms };
