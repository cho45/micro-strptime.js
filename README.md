micro-strptime.js
=================

micro strptime implementation on JavaScript

SYNOPSYS
========

    var strptime = require('../lib/micro-strptime.js').strptime;
    strptime('05/May/2012:09:00:00 +0900', '%d/%B/%Y:%H:%M:%S %Z');

FORMAT DESCRIPTERS
==================

Current supported format descripters:

 * %% : %
 * %A : name of day of week (just ignored)
 * %B : name of month
 * %Y : four digits full year
 * %m : month
 * %d : date
 * %H : hours
 * %M : minutes
 * %S : seconds
 * %s : milli seconds
 * %Z : timezone string like '+09:00', '-03:00', 'Z' or 'UTC'.



