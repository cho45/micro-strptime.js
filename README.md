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
 * %m : two digits month
 * %d : two digits date
 * %H : two digits hours
 * %M : two digits minutes
 * %S : two digits seconds
 * %Z : timezone string like '+09:00', '-03:00', 'Z' or 'UTC'.



