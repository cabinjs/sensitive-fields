const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const s = require('underscore.string');

const list = require('./sensitive-fields');

// and we also want to add a prefixed AND affixed `_field` and `_input`
list.forEach(key => {
  ['field', 'input'].forEach(str => {
    list.push(`${str}_${key}`);
    list.push(`${key}_${str}`);
  });
});

const fields = _.uniq(
  _.reduce(
    list,
    (memo, str) => {
      const arr = [];
      arr.push(s.titleize(str));
      arr.push(s.camelize(str));
      arr.push(s.camelize(str).toLowerCase());
      arr.push(s.camelize(str).toUpperCase());
      arr.push(s.underscored(str));
      arr.push(s.humanize(str));
      return memo.concat(arr);
    },
    []
  )
);

fs.writeFileSync(
  path.join(__dirname, 'index.json'),
  JSON.stringify(fields, null, 2),
  'utf8'
);
