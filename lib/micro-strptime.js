/**
 * https://github.com/cho45/micro-strptime.js
 * (c) cho45 http://cho45.github.com/mit-license
 */
export function strptime (str, format) {
	if (!format) throw Error("Missing format");
	const ff = [];
	const re = new RegExp(
		format.replace(/%(?:([a-zA-Z%])|('[^']+')|("[^"]+"))/g, (_, a, b, c) => {
			const fd = a || b || c;
			const d = strptime.fd[fd];
			if (!d) throw Error(`Unknown format descriptor: ${fd}`);
			ff.push(d[1]);
			return `(${d[0]})`;
		}),
		'i'
	);
	const matched = str.match(re);
	if (!matched) throw Error('Failed to parse');

	let date = new Date(0);
	ff.forEach((fun, i) => fun && fun.call(date, matched[i + 1]));
	if (date.utcDay) date.setUTCDate(date.utcDay);
	if (date.timezone) date = new Date(date.getTime() - date.timezone * 1000);
	if (date.AMPM) {
		if (date.getUTCHours() == 12) date.setUTCHours(date.getUTCHours() - 12);
		if (date.AMPM == 'PM') date.setUTCHours(date.getUTCHours() + 12);
	}
	return date;
}
// strptime.fd is intentionally defined as a mutable and accessible property
// so that users can override or extend the format descriptors at runtime.
strptime.fd = {
	'%' : [ '%', function () {} ],
	'a' : [ '[a-z]+', function(matched) {} ],
	'A' : [ '[a-z]+', function (matched) {} ],
	'b' : [ '[a-z]+', function (matched) { this.setUTCMonth(strptime.B[matched]) } ],
	'B' : [ '[a-z]+', function (matched) { this.setUTCMonth(strptime.B[matched.slice(0, 3)]) } ],
	'Y' : [ '[0-9]{4}', function (matched) { this.setUTCFullYear(+matched) } ],
	'm' : [ '[0-9]{0,2}', function (matched) { this.setUTCMonth(+matched - 1) } ],
	'd' : [ '[0-9]{0,2}', function (matched) { this.utcDay = +matched; } ],
	'H' : [ '[0-9]{0,2}', function (matched) { this.setUTCHours(+matched) } ],
	'M' : [ '[0-9]{0,2}', function (matched) { this.setUTCMinutes(+matched) } ],
	'S' : [ '[0-9]{0,2}', function (matched) { this.setUTCSeconds(+matched) } ],
	's' : [ '[0-9]+', function (matched) { this.setUTCMilliseconds(+matched) } ],
	'z' : [ '[+-][0-9]{4}', function(matched) {
		this.timezone = (+matched.slice(0, 3) * (60 * 60)) + (+matched.slice(3, 5) * 60);
	} ],
	'Z' : [ 'UTC|Z|[+-][0-9][0-9]:?[0-9][0-9]', function (matched) {
		if (matched == 'Z') return;
		if (matched == 'UTC') return;
		// '+09:00' or '+0900'
		matched = matched.replace(/:/, '');
		this.timezone = (+matched.slice(0, 3) * (60 * 60)) + (+matched.slice(3, 5) * 60);
	} ],
	'I' : [ '[0-9]{0,2}', function (matched) { this.setUTCHours(+matched) } ],
	'p' : [ 'AM|PM', function (matched) { this.AMPM = matched } ]
};
strptime.B = { "Jan": 0, "Feb": 1, "Mar": 2, "Apr": 3, "May": 4, "Jun": 5, "Jul": 6, "Aug": 7, "Sep": 8, "Oct": 9, "Nov": 10, "Dec": 11 };
