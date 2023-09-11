const path = require('node:path');
const fs = require('node:fs');
const _ = require('lodash');
const s = require('underscore.string');
const list = require('./sensitive-fields');

// and we also want to add a prefixed AND affixed `_field` and `_input`
const arr = [...list];
for (const key of arr) {
  for (const str of ['field', 'input']) {
    list.push(`${str}_${key}`, `${key}_${str}`);
  }
}

const fields = _.uniq(
  _.reduce(
    list,
    (memo, str) => {
      memo.push(
        s.titleize(str),
        s.camelize(str),
        s.camelize(str).toLowerCase(),
        s.camelize(str).toUpperCase(),
        s.underscored(str),
        s.humanize(str)
      );
      return memo;
    },
    []
  )
);

fs.writeFileSync(
  path.join(__dirname, 'index.json'),
  JSON.stringify(fields, null, 2),
  'utf8'
);
