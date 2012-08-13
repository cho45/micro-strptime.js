#!/usr/bin/env node

var assert = require('assert');
var strptime = require('../lib/micro-strptime.js').strptime;

assert.ok(strptime('2012', '%Y') instanceof Date);

assert.throws(function () {
	strptime('xxxx', '%Y-%m-%d');
}, 'Failed to parse');

assert.throws(function () {
	strptime('xxxx');
}, 'Missing format');

assert.throws(function () {
	strptime('2012', '%"unknown"');
}, 'Unknown format descripter');

function test (strings, date) {
	strings.forEach(function (i) {
		assert.equal(strptime(i.string, i.format).toString(), date.toString());
	});
}

test([
	 { string: '2012-05-05T09:00:00.00+09:00',                 format : '%Y-%m-%dT%H:%M:%S.%s%Z' },
	 { string: '20120505000000',                               format : '%Y%m%d%H%M%S' },
	 { string: '2012-05-05T09:00:00+09:00',                    format : '%Y-%m-%dT%H:%M:%S%Z' },
	 { string: '2012-05-05 09:00:00+09:00',                    format : '%Y-%m-%d %H:%M:%S%Z' },
	 { string: '2012-05-05 00:00:00+00:00',                    format : '%Y-%m-%d %H:%M:%S%Z' },
	 { string: '2012-05-05 00:00:00Z',                         format : '%Y-%m-%d %H:%M:%S%Z' },
	 { string: '05/May/2012:09:00:00 +0900',                   format : '%d/%B/%Y:%H:%M:%S %Z' },
	 { string: 'Sat, 05 May 2012 09:00:00 +0900',              format : '%A, %d %B %Y %H:%M:%S %Z' },
	 { string: 'Sat May 05 2012 09:00:00 GMT+0900 (JST)',      format : '%A %B %d %Y %H:%M:%S GMT%Z' },
	 { string: 'Saturday May 05 2012 09:00:00 GMT+0900 (JST)', format : '%A %B %d %Y %H:%M:%S GMT%Z' }
], new Date(1336176000000));
