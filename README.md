micro-strptime.js
=================

Micro strptime implementation on JavaScript.

SYNOPSYS
========

    var strptime = require('micro-strptime.js').strptime;
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
 * %H : hour
 * %M : minute
 * %S : second
 * %s : milli second
 * %Z : timezone string like '+09:00', '-03:00', 'Z' or 'UTC'.
 * %I : hour (12-hour colock)
 * %p : AM or PM




