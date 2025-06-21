micro-strptime.js
=================

https://github.com/cho45/micro-strptime.js

Micro strptime implementation on JavaScript.

[![CI](https://github.com/cho45/micro-strptime.js/actions/workflows/ci.yml/badge.svg)](https://github.com/cho45/micro-strptime.js/actions)

SYNOPSIS
========

ESM (Node.js >= 14, type: module):

```js
import { strptime } from 'micro-strptime';
const date = strptime('05/May/2012:09:00:00 +0900', '%d/%B/%Y:%H:%M:%S %Z');
```

TypeScript:

```ts
import { strptime } from 'micro-strptime';
const d: Date = strptime('2020-01-01', '%Y-%m-%d');
```

FORMAT DESCRIPTORS
==================

Current supported format descriptors:

 * %% : %
 * %a : abbreviated name of day of week (just ignored)
 * %A : name of day of week (just ignored)
 * %b : abbreviated name of month
 * %B : name of month
 * %Y : four digits full year
 * %m : month
 * %d : date
 * %H : hour
 * %M : minute
 * %S : second
 * %s : milli second
 * %z : timezone string like +0900 or -0300
 * %Z : timezone string like '+09:00', '-03:00', 'Z' or 'UTC'.
 * %I : hour (12-hour clock)
 * %p : AM or PM

EXTENDABILITY
=============

`strptime.fd` is intentionally defined as a mutable and accessible property so that users can override or extend the format descriptors at runtime.

LICENSE
=======

MIT: http://cho45.github.com/mit-license
