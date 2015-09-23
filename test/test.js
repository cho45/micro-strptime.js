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
		try {
			assert.equal(strptime(i.string, i.format).toString(), new Date(date).toString(), i.string);
		} catch (e) {
			console.log("FAIL: %s: %s", i.format, i.string);
			console.log(e);
		}
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
	{ string: '05/5/2012:09:00:00 +0900',                     format : '%d/%m/%Y:%H:%M:%S %Z' },
	{ string: 'Sat, 05 May 2012 09:00:00 +0900',              format : '%A, %d %B %Y %H:%M:%S %Z' },
	{ string: 'Sat, 05 May 2012 09:00:00 +0900',              format : '%a, %d %b %Y %H:%M:%S %z' },
	{ string: 'Sat May 05 2012 09:00:00 GMT+0900 (JST)',      format : '%A %B %d %Y %H:%M:%S GMT%Z' },
	{ string: 'Saturday May 05 2012 09:00:00 GMT+0900 (JST)', format : '%A %B %d %Y %H:%M:%S GMT%Z' }
], Date.UTC(2012, 4, 5, 0, 0, 0));

// 12-hour digital clocks format
test([{ string: '2012-05-05 12:00:00 AM', format : '%Y-%m-%d %I:%M:%S %p' } ], Date.UTC(2012, 4, 5, 0, 0, 0) );
test([{ string: '2012-05-05 12:01:00 AM', format : '%Y-%m-%d %I:%M:%S %p' } ], Date.UTC(2012, 4, 5, 0, 1, 0) );
test([{ string: '2012-05-05 01:00:00 AM', format : '%Y-%m-%d %I:%M:%S %p' } ], Date.UTC(2012, 4, 5, 1, 0, 0) );
test([{ string: '2012-05-05 12:00:00 PM', format : '%Y-%m-%d %I:%M:%S %p' } ], Date.UTC(2012, 4, 5, 12, 0, 0) );
test([{ string: '2012-05-05 12:01:00 PM', format : '%Y-%m-%d %I:%M:%S %p' } ], Date.UTC(2012, 4, 5, 12, 1, 0) );
test([{ string: '2012-05-05 01:00:00 PM', format : '%Y-%m-%d %I:%M:%S %p' } ], Date.UTC(2012, 4, 5, 13, 0, 0) );

test([{ string: '2012-05-05 AM 12:00:00', format : '%Y-%m-%d %p %I:%M:%S' } ], Date.UTC(2012, 4, 5, 0, 0, 0) );
test([{ string: '2012-05-05 AM 12:01:00', format : '%Y-%m-%d %p %I:%M:%S' } ], Date.UTC(2012, 4, 5, 0, 1, 0) );
test([{ string: '2012-05-05 AM 01:00:00', format : '%Y-%m-%d %p %I:%M:%S' } ], Date.UTC(2012, 4, 5, 1, 0, 0) );
test([{ string: '2012-05-05 PM 12:00:00', format : '%Y-%m-%d %p %I:%M:%S' } ], Date.UTC(2012, 4, 5, 12, 0, 0) );
test([{ string: '2012-05-05 PM 12:01:00', format : '%Y-%m-%d %p %I:%M:%S' } ], Date.UTC(2012, 4, 5, 12, 1, 0) );
test([{ string: '2012-05-05 PM 01:00:00', format : '%Y-%m-%d %p %I:%M:%S' } ], Date.UTC(2012, 4, 5, 13, 0, 0) );
