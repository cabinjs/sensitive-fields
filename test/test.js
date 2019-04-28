const test = require('ava');
const _ = require('lodash');

const json = require('..');

test('JSON field exists and is not empty', t => {
  t.true(_.isArray(json) && !_.isEmpty(json));
});
